import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Product } from 'src/database/models/product.model';
import { IListProducts } from 'src/interfaces/list-products.interface';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  listProducts(): Promise<IListProducts> {
    return this.productService.listProducts();
  }

  @Post()
  createProduct(): string {
    return 'in production';
  }

  @Post('/delete/:id')
  @HttpCode(200)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getOneProduct(id);
  }
}
