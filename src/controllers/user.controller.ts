import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginInputDto } from 'src/dtos/user-login-input.dto';
import { UserRegistrationInputDto } from 'src/dtos/user-registration-input.dto';
import { IUserLoginResponse } from 'src/interfaces/user-login-response.interface';
import { IUserRegistrationResponse } from 'src/interfaces/user-registration-response.interface';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/registration')
  registration(
    @Body() body: UserRegistrationInputDto,
  ): Promise<IUserRegistrationResponse> {
    return this.userService.userRegistration(body);
  }

  @Post('/login')
  login(@Body() body: UserLoginInputDto): Promise<IUserLoginResponse> {
    return this.userService.userLogin(body);
  }
}
