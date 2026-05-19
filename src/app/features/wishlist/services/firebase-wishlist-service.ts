import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore'; // ← tutto da @angular/fire
import { Observable, of } from 'rxjs';
import { WishlistItem } from '../../../shared/models/wishlist-item.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseWishlistService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'wishlist');

  addWishlistItem(item: WishlistItem): Observable<WishlistItem> {
    return of({} as WishlistItem)
  }

  test() {
    return collectionData(this.col)
  }
}
