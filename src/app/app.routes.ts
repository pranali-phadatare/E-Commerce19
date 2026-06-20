import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  {
    path: 'product',
    loadComponent: () =>
      import('./feature/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./feature/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'contactus',
    loadComponent: () =>
      import('./feature/contactus/contactus.component').then(m => m.ContactusComponent)
  }
];
