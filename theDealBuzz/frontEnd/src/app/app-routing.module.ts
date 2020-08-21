import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
// import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BlogComponent } from './blog/blog.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import{ProductListsComponent} from './product-lists/product-lists.component';





const routes: Routes = [
  //whenever the page loads it redirects to the homepage component
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path:'productlist', component:ProductlistComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'admin', component:UserhomeComponent},
  {path:'create',component:CreateComponent},
  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent},
  {path:'home',component:HomeComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'services',component:ServicesComponent},
  {path:'product-details',component:ProductDetailsComponent},
  {path:'blog',component:BlogComponent},
  {path: 'create-product', component:ProductCreateComponent},
  {path: 'edit-product/:id', component:ProductEditComponent},
  {path:'product-lists',component:ProductListsComponent}
  // {path:'/edit/:userID/:productID',component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
