import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { Connection, createConnection } from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product_image.entity';

const databaseProvider = {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
        return await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'bitnami_opencart',
            entities: [
                __dirname + '/../dist/*.entity.js'
            ],
            logging: false
        });
    }
}

const productProvider = {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Product),
    inject: ['DATABASE_CONNECTION'],
}

const productImageProvider = {
    provide: 'PRODUCT_IMAGE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ProductImage),
    inject: ['DATABASE_CONNECTION'],
}

@Module({
    imports: [],
    controllers: [],
    providers: [
        databaseProvider,
        productProvider,
        productImageProvider,
        ProductService
    ],
    exports: [
        ProductService
    ]
})
export class DatabaseModule { }
