import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'filterByCategory',
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: Product[], category: string): Product[] {
    if (!category || category === 'All') {
      return products;
    }
    return products.filter((p) => p.category === category);
  }
}
