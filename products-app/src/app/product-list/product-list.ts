import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ProductDetail } from '../product-detail/product-detail';
import { FilterByCategoryPipe } from '../filter-by-category-pipe';
import { HighlightExpensive } from '../highlight-expensive';

@Component({
  selector: 'app-product-list',
  imports: [
    CurrencyPipe,
    DatePipe,
    RouterLink,
    KENDO_GRID,
    KENDO_DROPDOWNLIST,
    KENDO_BUTTON,
    ProductDetail,
    FilterByCategoryPipe,
    HighlightExpensive,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  selectedProduct = signal<Product | null>(null);
  selectedCategory = 'All';
  categoryOptions: string[] = [];

  constructor(
    public productService: ProductService,
    private router: Router,
  ) {
    this.categoryOptions = ['All', ...this.productService.categories];
  }

  ngOnInit() {
    if (this.productService.products().length === 0) {
      this.productService.addProduct({
        id: 0,
        name: 'Laptop',
        price: 1500,
        category: 'Electronics',
        createdAt: '',
      });
      this.productService.addProduct({
        id: 0,
        name: 'T-Shirt',
        price: 20,
        category: 'Clothes',
        createdAt: '',
      });
      this.productService.addProduct({
        id: 0,
        name: 'Angular Book',
        price: 45,
        category: 'Books',
        createdAt: '',
      });
    }
  }

  onEdit(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  onDelete(product: Product) {
    if (confirm('Are you sure you want to delete ' + product.name + '?')) {
      this.productService.deleteProduct(product.id);
      this.selectedProduct.set(null);
    }
  }
}
