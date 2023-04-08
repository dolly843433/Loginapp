import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from '../loginservice.service';
import { LoginModel } from '../model/login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  model:LoginModel =new LoginModel();


constructor(private service:LoginserviceService,private router:Router){}

  registration(data:NgForm){
    
    const reg = new RegExp("^[a-zA-Z+_.-]+[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]+$");
    const reg2=new RegExp("^[0-9]+$");
    // const reg3=new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&:;<>,.?/~_+-=|\])+$");
    const email=data.value["email_id"];
    const phone=data.value["phone_number"]
    console.log(phone);

  if(!reg.test(email)) {
    alert("Check your email");
  }
  else if(phone.length!=10 || !reg2.test(phone)){
    alert("Check your phone number");
  }
  else if(data.value["password"].length<8 ){
      alert("Password must be length of 8 or more");
  }
  else{
    this.service.signup(data.value).subscribe(
      (resp:any)=>{
        if(resp=="duplicate"){
      alert("User already exists");
        }
        else if(resp=="error"){
      alert("there is an error")
        }
        else{
          alert("User Added");
          this.router.navigateByUrl("/login");
        }
      }
     )
  }
  }

}
