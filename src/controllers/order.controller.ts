import { CreateOrderDto } from 'src/dtos/create-order-dto';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Order } from 'src/database/models/order.model';
import { IListOrders } from 'src/interfaces/list-order.interface';
import { OrderService } from 'src/services/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("/all/:user")
  listOrders(
    @Param('user') userId: string
  ): Promise<IListOrders> {
    return this.orderService.listOrders(userId);
  }

  @Post()
  @HttpCode(201)
  createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(body);
  }

  @Post('/delete/:id')
  @HttpCode(200)
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Get('/:id')
  getOneOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOneOrder(id);
  }
}
