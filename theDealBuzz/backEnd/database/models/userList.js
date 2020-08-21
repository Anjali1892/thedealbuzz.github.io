const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//Creating a Schema
const userSchema = new Schema({
    name : {
        type : String,
        //atleast three characters long
        minlength : 3,
        //if the name is added with the spaces at the beginning and at the end it will be trimmed out.
        trim : true,
        required : true
    },
    email : { 
        type : String,
        minlength : 3,
        required : true
    },
    password : {
        type : String,
        minlength : 3,
        required : true
    },
    address : {
        type : String,
        minlength : 3,
        required : true
    },
    phoneNumber : {
        type : Number,
        minlength : 10,
        required : true
    },
});

//password is encrypted
userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

//validating the user input with the database value
userSchema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword,this.password);
}
const User = mongoose.model('users',userSchema);
module.exports = User; 