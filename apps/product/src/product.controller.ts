import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getHello() {
    return {
      message: this.productService.getHello(),
    };
  }

  @ApiOperation({ summary: 'Get product active', description: 'Get all product active' })
  @Get('active')
  async getAll() {
    const products = await this.productService.getAll()
    return {
      data: products,
      message: "get all product active",
    };
  }
}
