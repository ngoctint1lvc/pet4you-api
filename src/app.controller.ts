import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search-product')
  searchProducts(@Param('q') q: string) {
    return this.appService.searchProducts(q);
  }

}
