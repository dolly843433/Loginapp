import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel } from './model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http:HttpClient) {
   }

   addonorder(model:OrderModel){
    const token=localStorage.getItem("user_token");
    const head=new HttpHeaders({"Authorization":"Bearer "+token})
    return  this.http.post(`http://localhost:8009/addproduct/${token}`,model,{headers:head,responseType:"text"})
   }

   dogetAllByUserId(){
    const token=localStorage.getItem("user_token");
    const head=new HttpHeaders({"Authorization":"Bearer "+token});
    return  this.http.get(`http://localhost:8009/getAll/${token}`,{headers:head})

   }
}
