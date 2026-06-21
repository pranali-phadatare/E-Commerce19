import { Component, Signal, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);

  readonly items: Signal<CartItem[]> = this.cartService.cartItems;
  readonly grandTotal: Signal<number> = this.cartService.totalPrice;

  increase(productId: number): void {
    const item = this.items().find(cartItem => cartItem.product.id === productId);
    if (!item) {
      return;
    }
    this.cartService.updateQuantity(productId, item.quantity + 1);
  }

  decrease(productId: number): void {
    const item = this.items().find(cartItem => cartItem.product.id === productId);
    if (!item) {
      return;
    }

    if (item.quantity <= 1) {
      this.cartService.removeFromCart(productId);
      return;
    }
    this.cartService.updateQuantity(productId, item.quantity - 1);
  }

  remove(productId: number, productName: string): void {
    this.cartService.removeFromCart(productId);
    this.snackBar.open(`Removed ${productName} from cart`, 'Dismiss', { duration: 3000 });
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
