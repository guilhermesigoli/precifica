import { Input } from './../database/models/input.model';
import { CalculationService } from './calculation.service';
import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/models/product.model';
import { IListProducts } from 'src/interfaces/list-products.interface';
import { CreateProductInputDto } from 'src/dtos/create-product-input.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly calculationService: CalculationService,
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
      relations: ['inputs'],
    });
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }

  async createProduct(body: CreateProductInputDto): Promise<Product> {
    return await getConnection().transaction(
      async (transactionalEntityManager) => {
        const productRepository = transactionalEntityManager.getRepository(
          Product,
        );
        const inputRepository = transactionalEntityManager.getRepository(Input);

        const inputsPrices = body.inputs.map((input) =>
          CalculationService.calcTotalPercent(
            input.totalPrice,
            input.usedPercentage,
          ),
        );

        let inputsTotalPrice = '0';

        inputsPrices.forEach((price) => {
          inputsTotalPrice = CalculationService.sum(inputsTotalPrice, price);
        });

        const productTotalPrice = CalculationService.sum(
          inputsTotalPrice,
          CalculationService.calcTotalPercent(
            inputsTotalPrice,
            body.profitPercentage,
          ),
        );

        const newProduct = await productRepository.save({
          name: body.name,
          profitPercentage: body.profitPercentage,
          totalPrice: productTotalPrice,
          inputsPrice: inputsTotalPrice,
          userId: body.userId,
        });

        for (const input of body.inputs) {
          await inputRepository.save({
            ...input,
            productId: newProduct.id,
          });
        }
        return newProduct;
      },
    );
  }
}
