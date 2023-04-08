import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loginapp';


  constructor(private bnIdle:BnNgIdleService){}
  ngOnInit(){

    if(localStorage.getItem("user_token")!=null ){

      //Session Management Implemented -> user will automatically be logged out after 60 seconds of inactivity 

      this.bnIdle.startWatching(1800).subscribe((isTimedOut:boolean) =>{
        if(isTimedOut){
          alert("Session Expired");
          localStorage.removeItem("user_token");
          location.replace("/home");
         
        }
      });
    }
    else if( localStorage.getItem("seller_token")!=null){
      this.bnIdle.startWatching(1800).subscribe((isTimedOut:boolean) =>{
        if(isTimedOut){
          alert("Session Expired");
          localStorage.removeItem("seller_token");
          location.replace("/home");
         
        }
      });
    }
    else{
      this.bnIdle.stopTimer();
    }
  }




}

