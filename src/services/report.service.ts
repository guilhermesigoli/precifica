import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenerateReportInputDto } from 'src/dtos/generate-report-input.dto';
import { Order } from 'src/database/models/order.model';
import { CalculationService } from 'src/services/calculation.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async generateReport(params: GenerateReportInputDto) {
    const query = this.orderRepository
      .createQueryBuilder('order')
      .select([
        'order.id',
        'order.totalPrice',
        'order.inputsPrice',
        'order.createdAt',
      ])
      .where('order.createdAt >= :initialDate', {
        initialDate: params.initialDate,
      })
      .andWhere('order.createdAt <= :finalDate', {
        finalDate: params.finalDate,
      })
      .andWhere('order.userId = :userId', {
        userId: params.user
      });

    const orders = await query.getMany();

    if (orders.length < 1) {
      throw new HttpException('Orders not found', HttpStatus.NOT_FOUND);
    }

    let ordersTotalPrice = '0';
    let inputsTotalPrice = '0';
    orders.forEach((order) => {
      ordersTotalPrice = CalculationService.sum(
        ordersTotalPrice,
        order.totalPrice,
      );

      inputsTotalPrice = CalculationService.sum(
        inputsTotalPrice,
        order.inputsPrice,
      );
    });

    const profit = CalculationService.sub(ordersTotalPrice, inputsTotalPrice);

    return {
      inputsTotal: inputsTotalPrice,
      total: ordersTotalPrice,
      profit,
    };
  }
}
