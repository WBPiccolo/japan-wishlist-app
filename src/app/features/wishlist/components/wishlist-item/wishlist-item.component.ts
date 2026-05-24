import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core'
import { WishlistItem } from '../../../../shared/models/wishlist-item.model'
import { CommonModule } from '@angular/common'
import { ContextMenuModule } from 'primeng/contextmenu'
import { MenuItem, MenuItemCommandEvent } from 'primeng/api'
@Component({
   selector: 'app-wishlist-item',
   imports: [CommonModule, ContextMenuModule],
   templateUrl: './wishlist-item.component.html',
   styleUrl: './wishlist-item.component.scss',
})
export class WishlistItemComponent implements OnChanges {
   @Input() canDelete: boolean = false
   @Input() item: WishlistItem | null = null

   @Output() itemClicked = new EventEmitter<void>()
   @Output() deleteItemClicked = new EventEmitter<void>()
   @Output() restoreItemClicked = new EventEmitter<void>()

   items: MenuItem[] = []

   ngOnChanges(): void {
      this.items = [
         { label: 'Delete', icon: 'pi-delete', command: (event) => this.deleteItem(event), visible: !this.item?.isDeleted },
         { label: 'Restore', icon: 'pi restore', command: (event) => this.restoreItem(event), visible: this.item?.isDeleted },
      ]
   }

   deleteItem(event: MenuItemCommandEvent) {
      event.originalEvent?.preventDefault()
      this.deleteItemClicked.emit()
   }

   restoreItem(event: MenuItemCommandEvent) {
      event.originalEvent?.preventDefault()
      this.restoreItemClicked.emit()
   }
}
