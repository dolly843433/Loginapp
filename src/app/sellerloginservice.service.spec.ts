import { TestBed } from '@angular/core/testing';

import { SellerloginserviceService } from './sellerloginservice.service';

describe('SellerloginserviceService', () => {
  let service: SellerloginserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerloginserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
