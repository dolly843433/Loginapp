import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginserviceService } from './loginservice.service';
import { LoginModel } from './model/login';

describe('LoginserviceService', () => {
  let httpclientspy:jasmine.SpyObj<HttpClient>
  let service: LoginserviceService;
  let model={
    email_id:'akashpaul523@gmail.com',
    full_name:'Akash',
    phone_number:'9679297493',
    adress:'guma',
     pin:'743704',
    password:'123',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // beforeEach(()=>{
  //   httpclientspy=jasmine.createSpyObj('HttpClient',['post']);
  //   service=new  LoginserviceService(httpclientspy);
  // });

  // describe('signup()',()=>{
  //   it('should return Added',()=>{
  //     httpclientspy.post.and.returnValue(of('Added'));
  //     service.signup(model).subscribe({
  //       next:(posts)=>{
  //         expect(posts).toEqual('Added');
  //       }
  //     });
  //     expect(httpclientspy.get).toHaveBeenCalledTimes(1);
  //   });
  // });
});
