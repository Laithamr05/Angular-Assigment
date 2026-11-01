import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DatePipe, NgClass, KENDO_BUTTON],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  product = input.required<Product>();
  edit = output<Product>();
  delete = output<Product>();
}
