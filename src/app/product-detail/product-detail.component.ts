import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../model/product';
import { ProductServiceService } from '../product-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product:ProductModel=new ProductModel();
  id:String;
  cartmodel = {
    "product_id": "",
    "seller_id": "",
    "quantity": 1,
    "price": 0,
  }
  cart: any = [];
  LoginChecker:Boolean=false;

  constructor(private service:ProductServiceService,private aroute:ActivatedRoute){}
  ngOnInit(): void {
    this.aroute.params.subscribe(params=>{
      this.id=params["id"]
    })


    let resp=this.service.getproductbyid(this.id);
    resp.subscribe(data=>this.product=<ProductModel>data)
    if(localStorage.getItem('user_token')!=null){
      this.LoginChecker=true;
    }
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
