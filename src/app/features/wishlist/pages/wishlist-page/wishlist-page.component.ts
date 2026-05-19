import { Component, inject, OnInit } from '@angular/core';
import { WishlistItem } from '../../../../shared/models/wishlist-item.model';
import { WishlistItemComponent } from '../../components/wishlist-item/wishlist-item.component';
import { FirebaseWishlistService } from '../../services/firebase-wishlist-service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UpdateItemDialogComponent } from '../../components/update-item-dialog/update-item-dialog.component';

@Component({
  selector: 'app-wishlist-page',
  imports: [WishlistItemComponent, AsyncPipe, UpdateItemDialogComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent implements OnInit {
  wishlistService = inject(FirebaseWishlistService)
  wishlistObs$: Observable<WishlistItem[]> = new Observable();

  itemToUpdate: WishlistItem | null = null
  showUpdateItemDialog: boolean = false;

  ngOnInit(): void {
    this.wishlistObs$ = this.wishlistService.getWishlistItems();
  }

  addMockItemToWishlist() {
    console.log('aggiungo un item mock alla wishlist')
    //this.wishlistStore.addItemToWishlist(mockWishlist[Math.floor(Math.random()*3)])
  }

  handleItemClick(item: WishlistItem) {
    console.log('clicked item', item);
    this.itemToUpdate = item;
    this.showUpdateItemDialog = true;
  }

  handleItemBought(price: number) {
    const updatedItem: WishlistItem = {...this.itemToUpdate!, status: 'BOUGHT', price: price}
    this.wishlistService.updateItem(updatedItem);
    this.itemToUpdate = null;
    this.handleCloseUpdateItemDialog();
  }

  handleResetItemStatus() {
    const resettedItem: WishlistItem = {...this.itemToUpdate!, status: 'NOT_BOUGHT', price: null}
    this.wishlistService.updateItem(resettedItem);
    this.itemToUpdate = null;
    this.handleCloseUpdateItemDialog();

  }

  handleCloseUpdateItemDialog() {
    this.showUpdateItemDialog = false;
  }

}