import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product.service';
import { productProviders } from './product.providers';
import { databaseProviders } from './database.providers';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ...productProviders,
    ...databaseProviders,
    ProductService
  ]
})
export class AppModule { }
