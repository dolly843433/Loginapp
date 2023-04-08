import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from '../model/Order';
import { OrderServiceService } from '../order-service.service';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{


  model:OrderModel[];
  total:number=0;
  product_name:any=[];

  constructor(private service:OrderServiceService,private productservice:ProductServiceService
              ,private router:Router){}

  ngOnInit(): void {
  this.getAllByUserId();
  if(localStorage.getItem("user_token")==null){
    this.router.navigateByUrl("/error");
  }
  }

  getAllByUserId(){
  this.service.dogetAllByUserId().subscribe(
    (res:any)=>{
     this.model=res;
     for(let i=0;i<res.length;i++){
      this.total=this.total+res[i]["price"];
    }

    for(let j=0;j<res.length;j++){
      this.productservice.getproductbyid(res[j]["product_id"]).subscribe(
      (resp:any)=>{
        this.product_name[j]=resp["name"];
      }
      );
     }
    
    }
  );
  
  }

}
