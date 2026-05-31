import { inject, Injectable } from '@angular/core'
import { Firestore, collection, collectionData } from '@angular/fire/firestore' // ← tutto da @angular/fire
import { map, Observable, of } from 'rxjs'
import { WishlistItem } from '../../../shared/models/wishlist-item.model'
import { addDoc, doc, updateDoc } from 'firebase/firestore'

@Injectable({
   providedIn: 'root',
})
export class FirebaseWishlistService {
   private firestore = inject(Firestore)
   private col = collection(this.firestore, 'wishlist')

   getWishlistItems(): Observable<WishlistItem[]> {
      return (collectionData(this.col, { idField: 'id' }) as Observable<WishlistItem[]>).pipe(
         map((collection) =>
            collection.sort((a, b) => {
               if (a.status === b.status) return 0
               return a.status === 'NOT_BOUGHT' ? -1 : 1
            })
         )
      )
   }

   async updateItem(item: WishlistItem): Promise<void> {
      const { id, ...data } = item
      console.log('updateItem', id, data)
      const ref = doc(this.firestore, 'wishlist', id)
      await updateDoc(ref, data)
   }

   async addItem(item: WishlistItem): Promise<void> {
      await addDoc(this.col, { ...item, isDeleted: false, status: 'NOT_BOUGHT' })
   }
}
