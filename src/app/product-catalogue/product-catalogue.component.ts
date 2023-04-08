import { Component, OnInit } from '@angular/core';
import { CartModel } from '../model/Cart';
import { ProductModel } from '../model/product';
import { ProductServiceService } from '../product-service.service';
@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.css']
})
export class ProductCatalogueComponent implements OnInit {

  product: ProductModel[];
  clothing: ProductModel[];
  footwear: ProductModel[];
  electronics: ProductModel[];
  jewellery: ProductModel[];
  check: number=0;
  cartmodel = {
    "product_id": "",
    "seller_id": "",
    "quantity": 1,
    "price": 0,
  }
  cart: any = [];
  LoginChecker:Boolean=false;

  constructor(private service: ProductServiceService) { }
  ngOnInit(): void {
    this.getallproduct();
    // this.dogetAllclothing();
    // this.dogetAllfootwear()
    // this.dogetAllelectronics();
    // this.dogetAlljewellery();
    if(localStorage.getItem('user_token')!=null){
      this.LoginChecker=true;
    }
  }



  dogetAllclothing() {
    this.check=1;
    this.service.onGetAllclothing().subscribe(
      (resp: any) => {
        this.clothing = resp;
      }
    );
   
  }


  dogetAllfootwear() {
    this.check=2;
    this.service.onGetAllfootwear().subscribe(
      (resp: any) => {
        this.footwear = resp;
      }
    );
  }

  dogetAllelectronics() {
    this.check=3;
    this.service.onGetAllelectronics().subscribe(
      (resp: any) => {
        this.electronics = resp;
      }
    );
  }

  dogetAlljewellery() {
    this.check=4
    this.service.onGetAllother().subscribe(
      (resp: any) => {
        this.jewellery = resp;
      }
    );
  }

  getallproduct() {
   
    this.service.getallproduct().subscribe(
      (resp: any) => {
        this.product = resp;
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
