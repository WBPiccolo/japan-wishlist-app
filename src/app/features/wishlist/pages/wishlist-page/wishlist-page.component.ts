import { Component, inject, OnInit } from '@angular/core'
import { WishlistItem } from '../../../../shared/models/wishlist-item.model'
import { WishlistItemComponent } from '../../components/wishlist-item/wishlist-item.component'
import { FirebaseWishlistService } from '../../services/firebase-wishlist-service'
import { map, Observable, switchMap } from 'rxjs'
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common'
import { UpdateItemDialogComponent } from '../../components/update-item-dialog/update-item-dialog.component'
import { ToggleSwitchModule } from 'primeng/toggleswitch'
import { FormsModule } from '@angular/forms'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api'
import { AddItemDialogComponent } from '../../components/add-item-dialog/add-item-dialog.component'
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox'

@Component({
   selector: 'app-wishlist-page',
   imports: [
      WishlistItemComponent,
      AsyncPipe,
      UpdateItemDialogComponent,
      ToggleSwitchModule,
      FormsModule,
      ButtonModule,
      ConfirmDialogModule,
      ToastModule,
      AddItemDialogComponent,
      CheckboxModule,
      CurrencyPipe,
   ],
   templateUrl: './wishlist-page.component.html',
   styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent implements OnInit {
   wishlistService = inject(FirebaseWishlistService)
   wishlistObs$: Observable<WishlistItem[]> = new Observable()
   wishlistTotalSpent$: Observable<number> = new Observable()

   itemToUpdate: WishlistItem | null = null
   showUpdateItemDialog: boolean = false
   isAdminMode: boolean = false
   hideDeleted: boolean = true
   reciveNotifications: boolean = Notification.permission === 'granted'

   showAddItemDialog: boolean = false

   private confirmationService = inject(ConfirmationService)
   private messageService = inject(MessageService)

   ngOnInit(): void {
      this.wishlistObs$ = this.wishlistService.getWishlistItems()
      this.wishlistTotalSpent$ = this.wishlistObs$.pipe(map((items) => items.reduce((acc, item) => acc + (item.price || 0), 0)))
   }

   handleNotificationsPermissions(event: CheckboxChangeEvent) {
      if (!this.reciveNotifications) {
         Notification.requestPermission().then((result) => {
            console.log('notifications', result)
            this.reciveNotifications = result === 'granted'
         })
      }
   }

   handleItemClick(item: WishlistItem) {
      console.log('clicked item', item)
      this.itemToUpdate = item
      this.showUpdateItemDialog = true
   }

   async handleItemBought(price: number) {
      const updatedItem: WishlistItem = { ...this.itemToUpdate!, status: 'BOUGHT', price: price }
      try {
         await this.wishlistService.updateItem(updatedItem)

         this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Articolo aggiornato correttamente',
         })

         this.itemToUpdate = null
         this.handleCloseUpdateItemDialog()
         if (Notification.permission === 'granted') {
            console.log('mostro notifica')
            new Notification('Oggetto comprato!', {
               body: `${updatedItem.name} comprato per ${updatedItem.price}€`,
               icon: updatedItem.imageURL,
            })
         }
      } catch (error) {
         console.error(error)

         this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: "Impossibile aggiornare l'articolo",
         })
      }
   }

   async handleResetItemStatus() {
      const resettedItem: WishlistItem = { ...this.itemToUpdate!, status: 'NOT_BOUGHT', price: null }

      try {
         await this.wishlistService.updateItem(resettedItem)
         this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Articolo resettato correttamente',
         })
         this.itemToUpdate = null
         this.handleCloseUpdateItemDialog()
      } catch (error) {
         console.error(error)

         this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: "Impossibile resettare l'articolo",
         })
      }
   }

   handleCloseUpdateItemDialog() {
      this.showUpdateItemDialog = false
   }

   handleDeleteItem(item: WishlistItem) {
      console.log('handleDeleteItem', item)
      this.confirmationService.confirm({
         message: `Do you want to delete ${item.name}?`,
         header: 'Delete Item',
         icon: 'pi pi-info-circle',
         rejectLabel: 'No',
         rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
         },
         acceptButtonProps: {
            label: 'Yes',
            severity: 'danger',
         },

         accept: () => {
            console.log('deleting item')
            this.deleteItem(item)
            this.messageService.add({
               severity: 'info',
               summary: 'Confirmed',
               detail: 'Item deleted',
            })
         },
         reject: () => {},
      })
   }

   private deleteItem(item: WishlistItem) {
      console.log('deleting', item)
      this.wishlistService.updateItem({ ...item, isDeleted: true })
   }

   handleRestoreItem(item: WishlistItem) {
      this.wishlistService.updateItem({ ...item, isDeleted: false })
      this.messageService.add({
         severity: 'success',
         summary: 'Confirmed',
         detail: 'Item restored',
      })
   }

   openAddItemDialog() {
      this.showAddItemDialog = true
   }

   handleCloseAddItemDialog() {
      this.showAddItemDialog = false
   }

   async saveNewItem(item: WishlistItem) {
      console.log('aggiunta di', item)
      try {
         await this.wishlistService.addItem(item)
         this.handleCloseAddItemDialog()
         this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Articolo aggiunti correttamente',
         })
      } catch (error) {
         this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: "Impossibile aggiungere l'articolo",
         })
      }
   }
}
