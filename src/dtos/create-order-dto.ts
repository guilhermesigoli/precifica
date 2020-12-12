import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  totalPrice!: string;
}
