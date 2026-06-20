import { Component, input, output, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../core/models/product.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, MatCardModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly addToCart = output<Product>();
  private readonly toastService = inject(ToastService);

  onAddToCart(): void {
    this.addToCart.emit(this.product());
    this.toastService.success(`${this.product().name} added to cart`);
  }
}
