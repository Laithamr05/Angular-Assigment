import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KENDO_TEXTBOX, KENDO_NUMERICTEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { ProductService } from '../product.service';

@Component({
  imports: [
    FormsModule,
    RouterLink,
    KENDO_TEXTBOX,
    KENDO_NUMERICTEXTBOX,
    KENDO_DROPDOWNLIST,
    KENDO_BUTTON,
  ],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm {
  product = {
    name: '',
    price: 0,
    category: '',
  };

  constructor(
    public productService: ProductService,
    private router: Router,
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid || this.product.price <= 0) {
      return;
    }

    this.productService.addProduct({
      id: 0,
      name: this.product.name,
      price: this.product.price,
      category: this.product.category,
      createdAt: '',
    });
    this.router.navigate(['/products']);
  }
}
