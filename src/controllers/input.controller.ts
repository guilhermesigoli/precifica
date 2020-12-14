import { CreateInputDto } from 'src/dtos/create-input.dto'
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Input } from 'src/database/models/input.model';
import { IListInputs } from 'src/interfaces/list-input.interface';
import { InputService } from 'src/services/input.service';

@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Get()
  listOrders(): Promise<IListInputs> {
    return this.inputService.listInputs();
  }

  @Post()
  @HttpCode(201)
  createOrder(@Body() body: CreateInputDto): Promise<Input> {
    return this.inputService.createInput(body);
  }

  @Post('/delete/:id')
  @HttpCode(200)
  deleteOrder(@Param('id') id: string) {
    return this.inputService.deleteOrder(id);
  }

  @Get('/:id')
  getOneOrder(@Param('id') id: string): Promise<Input> {
    return this.inputService.getOneInput(id);
  }
}