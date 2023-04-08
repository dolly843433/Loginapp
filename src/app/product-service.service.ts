import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8002"

  onProductAdded(model:ProductModel){
    const token=localStorage.getItem("seller_token");
    const head=new HttpHeaders({"Authorization":"Bearer "+token})
    return this.http.post(`${this.url}/product/${token}`,model,{headers:head,responseType:"text"})
  }

  onGetAllclothing(){
    return this.http.get(`${this.url}/getAllClothing`);
  }

  onGetAllfootwear(){
    return this.http.get(`${this.url}/getAllfootwear`);
  }

  onGetAllelectronics(){
    return this.http.get(`${this.url}/getAllelectronics`);
  }

  onGetAllother(){
    return this.http.get(`${this.url}/getAlljewellery`);
  }
  getallproduct(){
    return this.http.get(`http://localhost:8002/getproduct`);
  }

  getproductbyid(id:String){
    return this.http.get(`http://localhost:8002/getproduct/${id}`);
  }

  findProductByName(name:String){
    return this.http.get(`http://localhost:8002/getAllByName/${name}`);
  }

}

