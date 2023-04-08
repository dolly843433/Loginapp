import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './model/login';
import { SellerModel } from './model/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerloginserviceService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8001";
  signup(model:SellerModel){
    return this.http.post(`${this.url}/registration`,model,{responseType:"text"});
  }

  login(model:SellerModel){
    return this.http.post(`${this.url}/login`,model,{responseType:"text"});
  }
}
