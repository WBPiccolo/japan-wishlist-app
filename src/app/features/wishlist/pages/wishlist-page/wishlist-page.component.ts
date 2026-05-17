import { Component, inject } from '@angular/core';
import { WishlistStore } from '../../store/wishlist.store';
import { WishlistItem } from '../../../../shared/models/wishlist-item.model';

@Component({
  selector: 'app-wishlist-page',
  imports: [],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent {
  wishlistStore = inject(WishlistStore);

  addMockItemToWishlist() {
    console.log('aggiungo un item mock alla wishlist')
    const mockItem: WishlistItem = {
      name: Math.random()*100 +'',
      description: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      status: undefined
    }
    this.wishlistStore.addItemToWishlist(mockItem)
  }
}
