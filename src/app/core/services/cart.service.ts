import { Injectable, Signal, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

// localStorage key under which the cart snapshot is persisted across page refreshes/browser restarts
const CART_STORAGE_KEY = 'shopease.cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal holding the cart state, seeded from localStorage so a saved cart survives a reload
  private readonly cartItemsSignal = signal<CartItem[]>(this.readCartFromLocalStorage());

  readonly cartItems: Signal<CartItem[]> = this.cartItemsSignal.asReadonly();

  readonly totalItems: Signal<number> = computed(() =>
    this.cartItemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice: Signal<number> = computed(() =>
    this.cartItemsSignal().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product, quantity: number = 1): void {
    const items = this.cartItemsSignal();
    const existingItem = items.find(item => item.product.id === product.id);

    const updatedItems: CartItem[] = existingItem
      ? items.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      : [...items, { product, quantity }];

    this.updateCart(updatedItems);
  }

  removeFromCart(productId: number): void {
    this.updateCart(this.cartItemsSignal().filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    this.updateCart(
      this.cartItemsSignal().map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart(): void {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItemsSignal.set(items);
    // localStorage USAGE: save the latest cart snapshot every time it changes
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  private readCartFromLocalStorage(): CartItem[] {
    // localStorage USAGE: restore the cart saved on a previous visit when the service is first created
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
  }
}
