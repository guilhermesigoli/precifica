import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculationService } from './calculation.service';
import { Order } from 'src/database/models/order.model';
import { Product } from 'src/database/models/product.model';
import { IListOrders } from 'src/interfaces/list-order.interface';
import { CreateOrderDto } from 'src/dtos/create-order-dto';
import { setupMaster } from 'cluster';

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
        
        var aux
        const calcService = (product) => parseFloat(CalculationService.calcTotalPercent( product.totalPrice,  product.profitPercentage ))
        const sum = (p, aux) => aux += p

        console.log(body.products.map(calcService))
        const inputsPrices = body.products.map(calcService).reduce(sum);

        aux = 0
        const totalPrice = body.products.map(p => parseFloat(p.totalPrice)).reduce(sum)
        console.log(inputsPrices, totalPrice)

        
        const data = new Date()
        const dia  = data.getDate().toString().padStart(2, '0')
        const mes  = (data.getMonth()+1).toString().padStart(2,'0')
        const ano = data.getFullYear();
        const createdAt = dia + "/" + mes + "/" + ano;

        const newOrder = await orderRepository.save({
          inputsPrice: inputsPrices.toString(),
          totalPrice: totalPrice.toString(),
          isAvaible: true,
          userId: body.userId,
        });
        return newOrder;
      }
    );
  }
}
