import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  LoginChecker:Boolean=false;

  ngOnInit(): void {

    if(localStorage.getItem('user_token')!=null){
      this.LoginChecker=true;
    }
  }

}
