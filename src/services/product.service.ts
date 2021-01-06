import { Input } from './../database/models/input.model';
import { CalculationService } from './calculation.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async listProducts(id: string): Promise<IListProducts> {
    const [products, total] = await this.productRepository.findAndCount({
      where: { id, isAvaible: true },
      select: ['id', 'name', 'totalPrice', 'isAvaible'],
    });

    return {
      products,
      total,
    };
  }

  async getOneProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['inputs'],
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOne({
      where: { id, isAvaible: true },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.update({ id }, { isAvaible: false });

    return;
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
          isAvaible: true,
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
