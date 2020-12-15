import { IsString, IsNotEmpty, IsDate, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: string;

  @IsArray()
  @IsString({ each: true })
  productsIds!: string[];
}
