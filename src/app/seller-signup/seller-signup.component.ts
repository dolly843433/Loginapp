import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { SellerModel } from '../model/seller';
import { SellerloginserviceService } from '../sellerloginservice.service';


@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css']
})
export class SellerSignupComponent {
  model:SellerModel =new SellerModel();
  
  
  constructor(private service:SellerloginserviceService , private router:Router){}

  registration(){
    const reg = new RegExp("^[a-zA-Z+_.-]+[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]+$");
    const reg2=new RegExp("^[0-9]+$");
    // const reg3=new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&:;<>,.?/~_+-=|\])+$");
    const email=this.model.email_id;
    const phone=this.model.phone_number;
    console.log(phone);

  if(!reg.test(email)) {
    alert("Check your email");
  }
  else if(phone.length!=10 || !reg2.test(phone)){
    alert("Check your phone number");
  }
  else  if(this.model.password.length<8 ){
      alert("Password must be length of 8 or more");
  }
  else{

   this.service.signup(this.model).subscribe(
    (resp:any)=>{
      if(resp=="duplicate"){
        alert("User already exists");
          }
          else if(resp=="error"){
        alert("there is an error")
          }
          else{
      alert("Seller Registered Successfully");
      this.router.navigateByUrl("/Seller_login");
          }
    }
   )
  }
  }
}
