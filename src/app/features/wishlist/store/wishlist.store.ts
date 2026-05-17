import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { WishlistItem } from '../../../shared/models/wishlist-item.model'
import { inject } from '@angular/core'
import { HttpWishlistService } from '../services/http-wishlist-service'
import { pipe, switchMap, tap } from 'rxjs'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { tapResponse } from '@ngrx/operators'

interface WishlistState {
    items: WishlistItem[],
    loading: boolean,
    error: any
}

const initialState: WishlistState = {
    items: [],
    loading: false,
    error: null
}

export const WishlistStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, httpWishlistService = inject(HttpWishlistService)) => ({
        addItemToWishlist: rxMethod<WishlistItem>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((newItem: WishlistItem) =>
                    httpWishlistService.addWishlistItem(newItem).pipe(
                        tapResponse({
                            next: (response: WishlistItem) => {
                                patchState(store, {items: [...store.items(), response]})
                             },
                            error: (err: any) => { 
                                patchState(store, {error: err?.error })
                            },
                            finalize: () => { 
                                patchState(store, {loading: false})
                            }
                        })
                    )
                )
            )
        )
    }))
)