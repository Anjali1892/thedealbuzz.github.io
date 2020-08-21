const createError = require('http-errors');
const express = require('express');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser'); 
const cors=require('cors'); 
const passport = require('passport');
//express-session to provide persistent functionality that will create a cookie 
const session = require('express-session');
const logger = require('morgan');

//Connecting to database
const mongoose = require('./database/db');
//importing schemas
const Products = require('./database/models/productList');
const User = require('./database/models/userList');
// const { use } = require('passport');

/* CORS - Cross Origin Request Security.*/
app.use(cors({
    //cross origin. Some brwosers do not add cookies 
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));

//Same as body-parser library
app.use(express.json());


//creating a session
app.use(session({
    name:'cookie.sid',
    resave:false, //not saving the object for every request
    saveUninitialized:false, //not saving a session until a successful login is done
    secret:'secret', //encrypting cookie
    cookie:{
        maxAge:36000000, //age of the cookie is one day
        httpOnly:false,
        secure:false 
    }
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());



/* RestFul API for Products :  Creating, Updating, ReadOne, ReadAll, Deleting */

//to get the values from the database 
app.get('/products', (req,res) => {
    Products.find({})
    .then(products => res.send(products))
    .catch((error) => console.log(error))
}); 

//to post the values to the database 
app.post('/products',(req,res)=>{
    (new Products({
        'price' : req.body.price,
        'locality' : req.body.locality,
        'city' : req.body.city,
        'province' : req.body.province,
        'postalCode' : req.body.postalCode,
        'buildingType' : req.body.buildingType,
        'description' : req.body.description
    }))
    .save()
    .then((product) => res.send(product))
    .catch((error) => console.log(error));
});

//to get one value from database
app.get('/products/:_id', (req,res) => {
    Products.findById({_id: req.params._id})
    .then((product) => res.send(product)) 
    .catch((error) => console.log(error));
});

//updating data and storing it into the database 
app.patch('/products/:_id', (req , res) => {
    Products.findOneAndUpdate({'_id' : req.params._id},{
        $set : {
          'price' : req.body.price,
          'locality' : req.body.locality,
          'city' : req.body.city,
          'province' : req.body.province,
          'postalCode' : req.body.postalCode,
          'buildingType' : req.body.buildingType,
          'description' : req.body.description
        }
    }, {new : true}, function(err,product){
        if(err){
            console.log(err);
        }
        else{
            res.send(product);
        }
    });
}); 

//deleting the data
app.delete('/products/:_id',(req,res) =>{
    Products.findByIdAndDelete({'_id' : req.params._id})
    .then((product) => res.send({message:'Deleted Successfully'}))
    .catch((error) => console.log(error));
});
/* RestFul API for Users :  Creating, Updating, ReadOne, ReadAll, Deleting */
//GET functionality for users
app.get('/users',(req,res)=>{
    User.find({})
    .then((users)=> res.send(users))
    .catch((error)=>console.log(error));
});

//to create a new user (POST functionality for users)
app.post('/register', function(req,res,next){
    addToDB(req,res);
});
async function addToDB(req,res){
    const users= new User({
        name : req.body.name,
        email : req.body.email,
        password : User.hashPassword(req.body.password),
        address : req.body.address,
        phoneNumber : req.body.phoneNumber
    });
    try{
        doc = await users.save();
        return res.status(201).json(doc);
    }
    catch(err){
        return res.status(501).json(err);
    }
}
//READONE functionality for users 
app.get('/users/:userID', (req,res)=>{
    User.findOne({_id:req.params.userID})
    .then((user) => res.send(user))
    .catch((error)=>console.log(error));
});
//UPDATE functionality for users
app.patch('/users/:userID', (req,res)=>{
    User.findByIdAndUpdate({ _id: req.params.userID }, {
        $set : {
            'name' : req.body.name,
            'email' : req.body.email,
            'password' : req.body.password,
            'address' : req.body.address,
            'phoneNumber' : req.body.phoneNumber
        }
    },{new : true}, function(err,user){
        if(err){
            console.log(err);
        }
        else{
            res.send({message:'Successfully Updated'});
        }
    });
});
//DELETE functionality for users 
//to be worked on (Broken Code)
app.delete('/users/:userID', (req,res) => {
    const deleteProducts = (product) => {
        Products.deleteMany({_userID: user._id})
        .then(() => user)
        .catch((error) => console.log(error));
    }
    const user = User.findByIdAndDelete(req.params.userID)
                    .then((user)=>deleteProducts(user))
                    .catch((error)=>console.log(error));
    res.send(user);
});

//http://127.0.0.1:3000/users/:userID/products/:productID

// //GET functionality for products of certain user
// app.get('/users/:userID/products',(req,res)=>{
//     Products.find({_userID: req.params.userID})
//     .then((product) => res.send(product))
//     .catch((error) => console.log(error))
// });

// //POST functionality for products of certain user
// app.post('/users/:userID/products',(req,res)=>{
//     (new Products({
//         'name' : req.body.name,
//         'category' : req.body.category,
//         'description' : req.body.description,
//         'price' : req.body.price,
//         '_userID' : req.params.userID
//     }))
//     .save()
//     .then((product) => res.send(product))
//     .catch((error) => console.log(error));
// });
// //READONE functionality for the products of a certain user
// app.get('/users/:userID/products/:productID', (req,res) => {
//     Products.findOne({_userID:req.params.userID, _id:req.params.productID})
//     .then((product)=>res.send(product))
//     .catch((error)=>console.log(error));
// });

// //UPDATE functionality for the products of a certain user
// app.patch('/users/:userID/products/:productID', (req,res) => {
//     Products.findOneAndUpdate({_userID:req.params.userID, _id:req.params.productID}, {
//         $set: {
//             'name' : req.body.name,
//             'category' : req.body.category,
//             'description' : req.body.description,
//             'price' : req.body.price,
//         }
//     })
//     .then(res.send({message:'Successfully Updated'}))
//     .catch((error)=>console.log(error))
// });

// //DELETE functionality for the products of a certain user
// app.delete('/users/:userID/products/:productID', (req,res)=>{
//     Products.findOneAndDelete({_userID:req.params.userID, _id:req.params.productID})
//     .then(res.send({message:"Successfully Deleted"}))
//     .catch((error)=>console.log(error))
// });

//login route
app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.status(501).json(err); }
      if (!user) { return res.status(501).json(info); }
      req.logIn(user, function(err) {
        if (err) { return res.status(501).json(err); }
        return res.status(200).json({message:'Login Success'});
      });
    })(req, res, next);
});

app.get('/admin', isValidUser ,function(req,res,next){
  return res.status(200).json(req.user);
});
 
app.get('/logout', isValidUser, function(req,res, next){
  req.logOut();
  return res.status(200).json({message:'Logout Success'});
})

//middleware authentication
function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized request'});
}

module.exports = Products;
module.exports = User;
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));