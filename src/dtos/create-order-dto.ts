import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, ValidateNested } from 'class-validator';
import { CreateProductInputDto } from '../dtos/create-product-input.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductInputDto)
  products!: CreateProductInputDto[];
}
