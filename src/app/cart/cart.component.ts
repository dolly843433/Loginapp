import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../model/Order';
import { OrderServiceService } from '../order-service.service';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  model:OrderModel=new OrderModel();
  cartmodel:any=[];
  productName:any=[];
  cartModel2:any=[];
  total:number;

  name:string;
  phone_no:string;
  landmark:string;
  pin:string;
  full_address:string;

  a:number=0;

 constructor(private service:ProductServiceService,private router:Router,private orderservice:OrderServiceService){}

  ngOnInit(){
    this.cartItem();
    if(localStorage.getItem("user_token")==null){
      this.router.navigateByUrl("/error");
    }
  }
  
  cartItem(){
    this.total=0;
   const cartitem=JSON.parse(<string>localStorage.getItem("cartitem"));
   this.cartmodel=cartitem
   console.log(cartitem);
    
   if(cartitem!=null){
   for(let i=0;i<cartitem.length;i++){
    this.total=this.total+cartitem[i]["price"];
   }
   for(let i=0;i<cartitem.length;i++){
    this.service.getproductbyid(cartitem[i]["product_id"]).subscribe(
    (res:any)=>{
      this.productName[i]=res["name"];
    }
    );
   }
  }
  else{
    this.total=0;
  }

   
  }

  onDelete(id:string){
    const cartitem=JSON.parse(<string>localStorage.getItem("cartitem"));
    console.log(cartitem);
    for(let i=0;i<cartitem.length;i++){
      if(id==cartitem[i]["product_id"]){
       if(cartitem[i]["quantity"]==1 ){
        cartitem.forEach((value,index)=>{
          if(value.product_id==cartitem[i]["product_id"]) cartitem.splice(index,1);
      });
       localStorage.setItem("cartitem", JSON.stringify(cartitem));
       }
       else{
        const m=cartitem[i]["quantity"];
        cartitem[i]["quantity"]=cartitem[i]["quantity"]-1;
        cartitem[i]["price"]=(cartitem[i]["price"]/m)*cartitem[i]["quantity"];
        localStorage.setItem("cartitem", JSON.stringify(cartitem));
       }

      }
    }
    this.ngOnInit();
  
  }

  RemoveElementFromObjectArray(product_id: string) {
    
} 

  onPay(){
   
    if(this.a==0){
      alert("Please Save Your Address First")
    }else{
      if(this.total==0){
       alert("please add something into cart");
      }
      else{
      const cartitem=JSON.parse(<string>localStorage.getItem("cartitem"));

      for(let i=0;i<cartitem.length;i++){
    
      this.model.product_id=cartitem[i]["product_id"];
      this.model.seller_id=cartitem[i]["seller_id"];
      this.model.quantity=cartitem[i]["quantity"]
      this.model.price=cartitem[i]["price"];

      this.orderservice.addonorder(this.model).subscribe(
        (res:any)=>{
          localStorage.setItem("k","pay");
          this.router.navigateByUrl("/payment");
        }
      );
      }
    }
  }

    
  }

  onSaveAddress(){
    if( this.model.name==null || this.model.phone_number==null || this.model.land_mark==null || this.model.pin==null || this.model.full_address==null)
    {
      alert("Please Fill the Form Poperly");

    }else{
      alert("Your Address Saved Successfully");
      this.a=1;
    }
  }

}
