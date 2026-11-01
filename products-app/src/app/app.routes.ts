import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductForm } from './product-form/product-form';
import { ProductEdit } from './product-edit/product-edit';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductList },
  { path: 'products/add', component: ProductForm, canActivate: [authGuard] },
  { path: 'products/:id', component: ProductEdit },
  { path: '**', redirectTo: 'products' },
];
