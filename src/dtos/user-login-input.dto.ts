import { IsString, IsNotEmpty } from 'class-validator';

export class UserLoginInputDto {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
