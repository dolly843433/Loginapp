import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
 
  total:number=0;

  name:string;
  cardnumber:number;
  expire_date:Date;
  cvv:number;

 constructor(private router:Router){}

  ngOnInit(): void {
    const cartitem=JSON.parse(<string>localStorage.getItem("cartitem"));
   if(cartitem!=null){
   for(let i=0;i<cartitem.length;i++){
    this.total=this.total+cartitem[i]["price"];
   }
  }else{
    this.total=0;
  }
   if(localStorage.getItem("user_token")==null || localStorage.getItem("k")==null){
    this.router.navigateByUrl("/error");
  }
  
  }

  payNow(){
    if(this.name==null || this.cardnumber==null || this.expire_date==null || this.cvv==null){
      alert("Please Fill Card Details Poperly");
    }
    else{
      if(this.numberLength(this.cardnumber)!=12){
        alert("please enter correct card number")
      }else if(this.numberLength(this.cvv)!=3){
        alert("please enter correct cvv")
      }else{
      localStorage.removeItem("cartitem");
      localStorage.removeItem("k");
      alert("Payment Done");
      this.router.navigateByUrl("/cart");
      
      }
    }
  }

  numberLength(a:number){
    var length = 0;
    for(let i = a; i > 1; ++i){
         ++length;
         i = Math.floor(i/10);
    }  
    return length;
  }


}
