import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product = input.required<Product>();
  delete = output<Product>();
}
