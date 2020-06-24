import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductInfo } from './product_info.entity';

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
        @Inject('PRODUCT_INFO_REPOSITORY')
        private productInfoRepository: Repository<ProductInfo>
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

    async getProductExtraInfo(productId: number) {
        let product = await this.productInfoRepository.findOne(productId);

        if (!product) return {
            imageUrl: "",
            price: 0    
        }

        return {
            image: product.imageUrl? "https://pet4you.cf/image/" + product.imageUrl: "",
            price: product.price
        }
    }
}