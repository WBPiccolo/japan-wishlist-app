import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WishlistItem } from '../../../shared/models/wishlist-item.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpWishlistService {
  private readonly ENDPOINTS = {
    getAllItems: '',
    addItem: '',
  }

  httpClient = inject(HttpClient)

  addWishlistItem(item: WishlistItem): Observable<WishlistItem> {
    //return this.httpClient.put<WishlistItem>(this.ENDPOINTS.addItem, item)
    return of(item)
  }

  getAllItems(): Observable<WishlistItem[]> {
    return of([])
  }
}
