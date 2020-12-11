import { IsString, IsNotEmpty } from 'class-validator';

export class UserRegistrationInputDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
