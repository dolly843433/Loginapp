import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../model/product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  isLoginChecker: Boolean = false;

  product: ProductModel = new ProductModel();

  blobimage:String;

  constructor(private service: ProductServiceService, private router: Router) { }
  ngOnInit(): void {
    if (localStorage.getItem("seller_token") != null) {
      this.isLoginChecker = true;
    }
    if (localStorage.getItem("seller_token") == null) {
      this.router.navigateByUrl("/error");
    }
  }

  onSubmit() {
    console.log(this.blobimage)
    if (this.product.name == null || this.product.product_category == null || this.product.quantity == null || this.product.price == null || this.product.description == null || this.product.image==null) {
      alert("please  fill form properly")
    }
    else {
      // this.product.image=this.blobimage
      this.service.onProductAdded(this.product).subscribe(
        (res: any) => {
          alert(res);
        }
      );
    }
  }

  // readUrl(event:any){
  //   // console.log(event)
  // if (event.target.files && event.target.files[0]) {
  //   var reader = new FileReader();

  //   reader.onload = (event: ProgressEvent) => {
  //    this.blobimage=((<FileReader>event.target).result as String);
  //   }

  //   reader.readAsDataURL(event.target.files[0]);
  // }
  // }
  
}
