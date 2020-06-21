import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search-product')
  searchProducts(@Query('q') q: string) {
    return this.appService.searchProducts(q);
  }

}
