import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateInputDto } from 'src/dtos/create-input.dto';

export class CreateProductInputDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  totalPrice!: string;

  @IsString()
  @IsNotEmpty()
  profitPercentage!: string;

  @ValidateNested({ each: true })
  @Type(() => CreateInputDto)
  inputs!: CreateInputDto[];
}
