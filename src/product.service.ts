import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product_image.entity';

@Injectable()
export class ProductService {

    private readonly fullTextSearchColumns = [
        'name',
        'description',
        'meta_title',
        'meta_description',
        'meta_keyword'
    ];

    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
        @Inject('PRODUCT_IMAGE_REPOSITORY')
        private productImageRepository: Repository<ProductImage>
    ) { }

    async fullTextSearch(keyword: string): Promise<Product[]> {
        // console.log(this.fullTextSearchColumns.join(","));

        if (!keyword) {
            return this.productRepository.find();
        }
        else {
            return this.productRepository
                .createQueryBuilder()
                .select()
                .where(`MATCH(${this.fullTextSearchColumns.join(",")}) AGAINST (:keyword IN NATURAL LANGUAGE MODE)`)
                .limit(20)
                .setParameters({
                    keyword
                })
                .getMany();
        }
    }

    async getImageUrl(productId: number): Promise<string> {
        let image = await this.productImageRepository
            .findOne(productId);

        return image.imageUrl || "";
    }
}