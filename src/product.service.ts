import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

    private readonly fullTextSearchColumns = [
        'name',
        'meta_title',
        'meta_description',
        'meta_keyword',
        'description'
    ];

    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: Repository<Product>,
    ) { }

    async fullTextSearch(keyword: string): Promise<Product[]> {
        console.log(this.fullTextSearchColumns.join(","));

        return this.productRepository
            .createQueryBuilder()
            .select()
            .where(`MATCH(${this.fullTextSearchColumns.join(" ,")}) AGAINST ("${keyword}" IN NATURAL LANGUAGE MODE)`)
            .limit(20)
            .getMany();

        // return this.productRepository.find();
    }
}