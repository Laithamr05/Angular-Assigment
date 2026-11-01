import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KENDO_TEXTBOX, KENDO_NUMERICTEXTBOX } from '@progress/kendo-angular-inputs';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    KENDO_TEXTBOX,
    KENDO_NUMERICTEXTBOX,
    KENDO_DROPDOWNLIST,
    KENDO_BUTTON,
  ],
  selector: 'app-product-edit',
  styleUrl: './product-edit.css',
  templateUrl: './product-edit.html',
})
export class ProductEdit implements OnInit {
  product: Product | undefined;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    category: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProduct(id);

    if (!this.product) {
      alert('Product not found');
      this.router.navigate(['/products']);
      return;
    }

    this.productForm.patchValue({
      name: this.product.name,
      price: this.product.price,
      category: this.product.category,
    });
  }

  onSubmit() {
    if (this.productForm.invalid || !this.product) {
      this.productForm.markAllAsTouched();
      return;
    }

    const values = this.productForm.value;
    this.productService.updateProduct({
      ...this.product,
      name: values.name!,
      price: values.price!,
      category: values.category!,
    });
    this.router.navigate(['/products']);
  }
}
