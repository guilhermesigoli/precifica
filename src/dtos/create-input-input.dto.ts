import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInputDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  totalPrice!: string;

  @IsString()
  @IsNotEmpty()
  usedPercentage!: string;
}
