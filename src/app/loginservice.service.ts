import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

 

  signup(model:LoginModel){
    return this.http.post(`http://localhost:8108/registration`,model,{responseType:"text"});
  }

  login(model:LoginModel){
    return this.http.post(`http://localhost:8009/login`,model,{responseType:"text"});
  }
}
