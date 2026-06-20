import { Component, Signal, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from '../../shared/component/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  loading:boolean = false;
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toastService = inject(ToastService);

  readonly products: Signal<Product[]> = toSignal(this.productService.getProducts(), {

    initialValue: []
  });

  readonly searchTerm = signal('');
  readonly selectedCategory = signal('');

  readonly categories: Signal<string[]> = computed(() =>
    Array.from(new Set(this.products().map(product => product.category)))
  );

  readonly filteredProducts: Signal<Product[]> = computed(() => {
    this.loading = true;
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();
    this.loading = false;

    return this.products().filter(product => {
      const matchesTerm = !term || product.name.toLowerCase().includes(term);
      const matchesCategory = !category || product.category === category;
      return matchesTerm && matchesCategory;
    });
  });

  onSearchChange(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
    this.loading = false;
  }

  onCategoryChange(change: MatSelectChange): void {
    this.selectedCategory.set(change.value as string);
    this.loading = false;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.loading = false;
  }
}
