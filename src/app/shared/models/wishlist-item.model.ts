export interface WishlistItem {
    id: string
    name: string,
    imageURL?: string,
    description?: string,
    location?: string,
    minPrice?: string,
    maxPrice?: string,
    price?: number | null
    status: 'BOUGHT' | 'NOT_BOUGHT',
}