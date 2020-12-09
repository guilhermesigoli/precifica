import { jwtConstants } from 'src/jwt-auth/jwt-constants';
import { IUserLoginResponse } from 'src/interfaces/user-login-response.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { User } from 'src/database/models/user.model';
import { UserRegistrationInputDto } from 'src/dtos/user-registration-input.dto';
import { IUserRegistrationResponse } from 'src/interfaces/user-registration-response.interface';
import { UserLoginInputDto } from 'src/dtos/user-login-input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async userRegistration(
    body: UserRegistrationInputDto,
  ): Promise<IUserRegistrationResponse> {
    const user = await this.userRepository.findOne({ email: body.email });

    if (user) {
      throw new HttpException(
        'Email already registred',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hash(body.password, 10);

    const newUser = await this.userRepository.save({
      ...body,
      password: hashedPassword,
    });

    return {
      name: newUser.name,
      token: this.jwtService.sign({email: newUser.email}, { 
        expiresIn: jwtConstants.EXPIRES_IN,
        secret: jwtConstants.JWT_SECRET
      }),
    };
  }

  async userLogin(body: UserLoginInputDto): Promise<IUserLoginResponse> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
      select: ['id', 'password', 'name', 'email'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (!compareSync(body.password, user.password)) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    return {
      token: this.jwtService.sign(user.email, { 
        expiresIn: jwtConstants.EXPIRES_IN,
        secret: jwtConstants.JWT_SECRET
      }),
    };
  }
}
