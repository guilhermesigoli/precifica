import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateReportInputDto {
  @IsString()
  @IsNotEmpty()
  initialDate!: string;

  @IsString()
  @IsNotEmpty()
  finalDate!: string;

  @IsString()
  @IsNotEmpty()
  user!:string;
}
