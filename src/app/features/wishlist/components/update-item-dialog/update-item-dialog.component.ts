import { Component, EventEmitter, Input, Output } from '@angular/core'
import { WishlistItem } from '../../../../shared/models/wishlist-item.model'
import { DialogModule } from 'primeng/dialog'
import { ButtonModule } from 'primeng/button'
import { InputNumberModule } from 'primeng/inputnumber'
import { FormsModule } from '@angular/forms'
import { FloatLabelModule } from 'primeng/floatlabel'
@Component({
   selector: 'app-update-item-dialog',
   imports: [DialogModule, InputNumberModule, ButtonModule, FormsModule, FloatLabelModule],
   templateUrl: './update-item-dialog.component.html',
   styleUrl: './update-item-dialog.component.scss',
})
export class UpdateItemDialogComponent {
   @Input() visible: boolean = false
   @Input() itemToUpdate: WishlistItem | null = null
   @Output() closeDialog = new EventEmitter<void>()
   @Output() itemBought = new EventEmitter<number>()
   @Output() undoBought = new EventEmitter<number>()

   price: number = 0
}
