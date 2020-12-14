import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculationService } from './calculation.service';
import { Order } from 'src/database/models/order.model';
import { IListOrders } from 'src/interfaces/list-order.interface';
import { CreateOrderDto } from 'src/dtos/create-order-dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async listOrders(): Promise<IListOrders> {
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { isAvaible: true }
    });

    return {
      orders,
      total,
    };
  }

  async getOneOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id
      },
      relations: ['products'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    
    return order;
  }

  async deleteOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id, isAvaible: true },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await this.orderRepository.update({ id }, { isAvaible: false });

    return;
  }

  async createOrder(body: CreateOrderDto): Promise<Order> {
    return await getConnection().transaction(
      async (transactionalEntityManager) => {
        const orderRepository = transactionalEntityManager.getRepository(Order);

        const calcService = (product) =>
          parseFloat(
            CalculationService.calcTotalPercent(
              product.totalPrice,
              product.profitPercentage,
            ),
          );
        const sum = (p, aux) => (aux += p);

        const inputsPrices = body.products.map(calcService).reduce(sum);

        const totalPrice = body.products
          .map((p) => parseFloat(p.totalPrice))
          .reduce(sum);


        return await orderRepository.save({
          inputsPrice: inputsPrices.toString(),
          totalPrice: totalPrice.toString(),
          isAvaible: true,
          userId: body.userId,
          createdAt: new Date()
        });
      },
    );
  }
}
