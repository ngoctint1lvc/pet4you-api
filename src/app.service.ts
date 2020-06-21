import { Injectable } from '@nestjs/common';
import { ProductService } from './product.service';

@Injectable()
export class AppService {

  constructor(
    private productService: ProductService,
  ) {}

  searchProducts(keyword: string) {
    return this.productService.fullTextSearch(keyword);
  }

}
