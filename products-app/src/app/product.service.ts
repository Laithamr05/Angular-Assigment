import { Injectable, signal } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<Product[]>(this.loadFromStorage());

  loadFromStorage(): Product[] {
    const data = localStorage.getItem('products');
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  saveToStorage(products: Product[]) {
    localStorage.setItem('products', JSON.stringify(products));
    this.products.set(products);
  }

  addProduct(product: Product) {
    const ids = this.products().map((p) => p.id);
    product.id = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    product.createdAt = new Date().toISOString();
    this.saveToStorage([...this.products(), product]);
  }

  deleteProduct(id: number) {
    const newList = this.products().filter((p) => p.id !== id);
    this.saveToStorage(newList);
  }
}
