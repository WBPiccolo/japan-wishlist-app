import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./features/home/home.routes')
  //       .then(m => m.HOME_ROUTES)
  // },

  {
    path: '',
    loadChildren: () =>
      import('./features/wishlist/wishlist.routes')
        .then(m => m.WISHLIST_ROUTES)
  },
  //   {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./features/admin/admin.routes')
  //       .then(m => m.ADMIN_ROUTES)
  // }
];