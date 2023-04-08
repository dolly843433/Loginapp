import { Component,Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input()
  isLoggedin:Boolean;

  @Input()
  isSellerLogin:Boolean;
  ngOnInit(): void {
  }

  constructor(private router: Router){}

  logedout(){
    localStorage.removeItem("user_token");
    localStorage.removeItem("seller_token");
    if(this.router.url == '/home'){
      window.location.reload();
    }else{
      this.router.navigateByUrl("/home");

    }
  }

}
