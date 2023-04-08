import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SellerModel } from '../model/seller';
import { SellerloginserviceService } from '../sellerloginservice.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})

export class SellerLoginComponent {
  model: SellerModel = new SellerModel();

  constructor(private service: SellerloginserviceService, private router: Router) { }

  login() {
    this.service.login(this.model).subscribe(
      (resp: any) => {
        if (resp == "User not Authenticated") {
          alert(resp);
        }
        else if (resp == "User or Password does not Matched.") {
          alert(resp);
        } else {
          localStorage.setItem("seller_token", resp);
          localStorage.setItem("seller_id", this.model.email_id.toString());
          console.log(resp);
          this.router.navigate(['product'])
        }
      }
    )
  }

}
