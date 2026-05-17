import { Component, Input } from '@angular/core';
import { WishlistItem } from '../../../../shared/models/wishlist-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist-item',
  imports: [CommonModule],
  templateUrl: './wishlist-item.component.html',
  styleUrl: './wishlist-item.component.scss',
})
export class WishlistItemComponent {
  @Input() item: WishlistItem| null = null;
}
