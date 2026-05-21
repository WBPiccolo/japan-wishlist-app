import { Component, EventEmitter, Input, Output } from '@angular/core'
import { WishlistItem } from '../../../../shared/models/wishlist-item.model'
import { DialogModule } from 'primeng/dialog'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { TextareaModule } from 'primeng/textarea'
import { ButtonModule } from 'primeng/button'
@Component({
   selector: 'app-add-item-dialog',
   imports: [DialogModule, ReactiveFormsModule, InputNumberModule, InputTextModule, TextareaModule, ButtonModule],
   templateUrl: './add-item-dialog.component.html',
   styleUrl: './add-item-dialog.component.scss',
})
export class AddItemDialogComponent {
   @Input() visible: boolean = false

   @Output() closeDialog = new EventEmitter<void>()
   @Output() saveItem = new EventEmitter<WishlistItem>()

   newItemFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      imageURL: new FormControl(''),
      description: new FormControl(''),
      location: new FormControl(''),
      minPrice: new FormControl(0),
      maxPrice: new FormControl(0),
   })

   initDialog() {
      this.newItemFormGroup.reset()
   }

   handleCloseDialog() {
      this.closeDialog.emit()
   }

   handleSaveItem() {
      const newItem: WishlistItem = this.newItemFormGroup.value as WishlistItem
      this.saveItem.emit(newItem)
   }
}
