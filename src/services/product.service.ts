import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/models/product.model';
import { IListProducts } from 'src/interfaces/list-products.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async listProducts(): Promise<IListProducts> {
    const [products, total] = await this.productRepository.findAndCount({
      select: ['id', 'name', 'totalPrice'],
    });

    return {
      products,
      total,
    };
  }

  async getOneProduct(id: string): Promise<Product> {
    return await this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}
