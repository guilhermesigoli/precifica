import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
      where: { isAvaible: true },
      select: ['id', 'createdAt', 'totalPrice', 'inputsPrice', 'products', 'userId', 'user']
    });

    return {
        orders,
        total
    };
  }

  async getOneOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id, isAvaible: true
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

        const data = new Date()
        const dia  = data.getDate().toString().padStart(2, '0')
        const mes  = (data.getMonth()+1).toString().padStart(2,'0')
        const ano = data.getFullYear();
        const createdAt = dia + "/" + mes + "/" + ano;

        const newOrder = await orderRepository.save({
          createdAt: createdAt,
          inputsPrice: '10.00',
          totalPrice: '100.00',
          isAvaible: true,
          userId: body.userId,
        });
        return newOrder;
      }
    );
  }
}
