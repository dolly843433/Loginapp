import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductModel } from '../model/product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit{
  LoginChecker:Boolean=false;
  model:ProductModel[];
  name:String;
  cartmodel = {
    "product_id": "",
    "seller_id": "",
    "quantity": 1,
    "price": 0,

  }
  cart: any = [];
  msg:String;

  constructor(private service:ProductServiceService){}
  ngOnInit(): void {
    if(localStorage.getItem("user_token")!=null){
      this.LoginChecker=true;
    }
  }

  doFindByName(){
    this.msg="";
    this.service.findProductByName(this.name).subscribe(
      (resp:any)=>{
        if(resp!=null){
      this.model=resp;
        }else{
         this.msg="no"
        }
      }
      );
    
  }

  addtocart(p: ProductModel) {
    if (localStorage.getItem('cartitem') == null) {
      this.cartmodel['product_id'] = <string>p.product_id;
      this.cartmodel.price = p.price;
      this.cartmodel.seller_id = <string>localStorage.getItem("seller_id");
      this.cartmodel.quantity = 1;
      this.cart.push(this.cartmodel);
      localStorage.setItem("cartitem", JSON.stringify(this.cart));

    }
    else {
      this.cart = JSON.parse(<string>localStorage.getItem('cartitem'))
      const index = this.isProductExist(p);
      if (index >= 0) {
        this.cart[index].quantity += 1;
        this.cart[index].price += p.price;
        localStorage.setItem("cartitem", JSON.stringify(this.cart));
      } else {
        this.cartmodel['product_id'] = <string>p.product_id;
        this.cartmodel['price'] = p.price;
        this.cartmodel.seller_id = <string>localStorage.getItem("seller_id");
        this.cartmodel.quantity = 1;
        this.cart.push(this.cartmodel);
        localStorage.setItem("cartitem", JSON.stringify(this.cart));
      }

    }
    console.log(localStorage.getItem("cartitem"));
    
    this.cart = JSON.parse(<string>localStorage.getItem('cartitem'))
    
  }

  isProductExist(p: ProductModel): number {
    this.cart = JSON.parse(<string>localStorage.getItem('cartitem'))
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].product_id == p.product_id) {
        return i;
      }
      else {
        continue;
      }
    }
    return -1;
  }

}