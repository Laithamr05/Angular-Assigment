import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '/api/products';

  products = signal<Product[]>([]);
  categories = ['Electronics', 'Clothes', 'Books', 'Food', 'Other'];

  constructor(private http: HttpClient) {}

  loadProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe((products) => this.products.set(products));
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.apiUrl + '/' + id);
  }

  addProduct(product: { name: string; price: number; category: string }) {
    return this.http
      .post<Product>(this.apiUrl, product)
      .pipe(tap((newProduct) => this.products.set([...this.products(), newProduct])));
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(this.apiUrl + '/' + product.id, product).pipe(
      tap((updated) => {
        const newList = this.products().map((p) => (p.id === updated.id ? updated : p));
        this.products.set(newList);
      }),
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(this.apiUrl + '/' + id).pipe(
      tap(() => {
        const newList = this.products().filter((p) => p.id !== id);
        this.products.set(newList);
      }),
    );
  }
}
