import { Component, inject, OnInit } from '@angular/core';
import { WishlistItem } from '../../../../shared/models/wishlist-item.model';
import { WishlistItemComponent } from '../../components/wishlist-item/wishlist-item.component';
import { FirebaseWishlistService } from '../../services/firebase-wishlist-service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist-page',
  imports: [WishlistItemComponent, CommonModule, AsyncPipe],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent implements OnInit{
  firebaseWishlist = inject(FirebaseWishlistService)
  firebaseObs: Observable<any> = new Observable();
  ngOnInit(): void {
    this.firebaseObs = this.firebaseWishlist.test();
  }

  addMockItemToWishlist() {
    console.log('aggiungo un item mock alla wishlist')
    //this.wishlistStore.addItemToWishlist(mockWishlist[Math.floor(Math.random()*3)])
  }
}

 const mockWishlist: WishlistItem[] = [
  {
    name: 'Matcha KitKat Premium Edition',
    imageURL: 'https://m.media-amazon.com/images/I/916mcqXLjHL._AC_UF894,1000_QL80_.jpg',
    description: 'Limited edition KitKat al matcha disponibile solo in Giappone.',
    location: 'Tokyo',
    minPrice: '¥300',
    maxPrice: '¥800',
    status: 'available'
  },
  {
    name: 'Pokémon Center Plush Pikachu',
    imageURL: 'https://wafuu.com/cdn/shop/products/pokemon-center-limited-running-pikachu-plush-doll-from-japan-555386.jpg?v=1695256287',
    description: 'Peluches esclusivi venduti nei Pokémon Center giapponesi.',
    location: 'Osaka Pokémon Center',
    minPrice: '¥1500',
    maxPrice: '¥3500',
    status: 'wishlist'
  },
  {
    name: 'Gundam Model RX-78-2',
    imageURL: 'https://i.ebayimg.com/images/g/XXQAAOSwjilnydJ6/s-l1200.png',
    description: 'Model kit Gunpla High Grade versione RX-78-2.',
    location: 'Akihabara',
    minPrice: '¥1200',
    maxPrice: '¥5000',
    status: 'purchased'
  }
];