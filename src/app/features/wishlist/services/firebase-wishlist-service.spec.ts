import { TestBed } from '@angular/core/testing'

import { FirebaseWishlistService } from './firebase-wishlist-service'

describe('FirebaseWishlistService', () => {
   let service: FirebaseWishlistService

   beforeEach(() => {
      TestBed.configureTestingModule({})
      service = TestBed.inject(FirebaseWishlistService)
   })

   it('should be created', () => {
      expect(service).toBeTruthy()
   })
})
