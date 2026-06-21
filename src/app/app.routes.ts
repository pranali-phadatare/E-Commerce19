import { Routes } from '@angular/router';
import { CartContactComponent } from './feature/cart-contact/cart-contact.component';
import { CartComponent } from './feature/cart/cart.component';
import { ContactusComponent } from './feature/contactus/contactus.component';

export const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  {
    path: 'product',
    loadComponent: () =>
      import('./feature/product-list/product-list.component').then(m => m.ProductListComponent)
  },
 {
    path: 'cart',
    component: CartContactComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./feature/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'contact-us',
        loadComponent: () => import('./feature/contactus/contactus.component').then(m => m.ContactusComponent)
      }
    ]
}
];
