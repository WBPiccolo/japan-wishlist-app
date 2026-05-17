import { TestBed } from '@angular/core/testing';

import { HttpWishlistService } from './http-wishlist-service';

describe('HttpWishlistService', () => {
  let service: HttpWishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpWishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
