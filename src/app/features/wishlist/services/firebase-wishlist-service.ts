import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore'; // ← tutto da @angular/fire
import { Observable, of } from 'rxjs';
import { WishlistItem } from '../../../shared/models/wishlist-item.model';
import { doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseWishlistService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'wishlist');

  getWishlistItems() {
    return collectionData(this.col, { idField: 'id' }) as Observable<WishlistItem[]>;  }

  addWishlistItem(item: WishlistItem): Observable<WishlistItem> {
    return of({} as WishlistItem)
  }

  async updateItem(item: WishlistItem): Promise<void> {
    const { id, ...data } = item;
    console.log('updateItem', id, data)
    const ref = doc(this.firestore, 'wishlist', id);
    await updateDoc(ref, data);
  }

}
