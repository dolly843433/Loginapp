import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { SellerDetailComponent } from './seller-detail/seller-detail.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"product",component:ProductComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"Seller_signup",component:SellerSignupComponent},
  {path:"Seller_login",component:SellerLoginComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"seller_detail",component:SellerDetailComponent},
  {path:"product_catalogue",component:ProductCatalogueComponent},
  {path:"product_detail/:id",component:ProductDetailComponent},
  {path:"cart",component:CartComponent},
  {path:"search",component:SearchComponent},
  {path:"payment",component:PaymentComponent},
  {path:"order",component:OrderComponent},
  {path:"error",component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
