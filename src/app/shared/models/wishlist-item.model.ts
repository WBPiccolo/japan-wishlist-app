export interface WishlistItem {
   id: string
   name: string
   imageURL?: string
   description?: string
   location?: string
   minPrice?: number
   maxPrice?: number
   price?: number | null
   status: 'BOUGHT' | 'NOT_BOUGHT'
   isDeleted?: boolean
}
