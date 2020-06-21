import { Injectable } from '@nestjs/common';
import { ProductService } from './product.service';

@Injectable()
export class AppService {

  constructor(
    private productService: ProductService,
  ) { }

  async searchProducts(keyword: string) {
    let products = await this.productService.fullTextSearch(keyword);

    return await Promise.all(products.map(async product => {
      let imageUrl = await this.productService.getImageUrl(product.product_id);
      return {
        ...product,
        image_url: imageUrl
      }
    }));
  }

}
