import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsArray()
  @IsString({ each: true })
  productsIds!: string[];
}
