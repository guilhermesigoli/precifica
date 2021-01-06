import { CreateProductInputDto } from 'src/dtos/create-product-input.dto';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Product } from 'src/database/models/product.model';
import { IListProducts } from 'src/interfaces/list-products.interface';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  listProducts(
    @Param('user') userId: string
  ): Promise<IListProducts> {
    return this.productService.listProducts(userId);
  }

  @Post()
  @HttpCode(201)
  createProduct(@Body() body: CreateProductInputDto): Promise<Product> {
    return this.productService.createProduct(body);
  }

  @Post('/delete/:id')
  @HttpCode(200)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getOneProduct(id);
  }
}
