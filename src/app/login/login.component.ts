import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../loginservice.service';
import { LoginModel } from '../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model:LoginModel =new LoginModel();


  constructor(private service:LoginserviceService ,private router:Router){}
  
    login(){
     this.service.login(this.model).subscribe(
      (resp:any)=>{
        if(resp=="User or Password does not Matched."){
          alert(resp);
        }
        else if(resp=="User not Authenticated"){
          alert(resp);
        }else{
      localStorage.setItem("user_token",resp);
      this.router.navigate(["/home"])
      console.log(resp);
        }
      }
     )
    }
  
  
  }





