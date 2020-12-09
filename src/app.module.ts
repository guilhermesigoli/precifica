import { migrations } from 'src/database/migrations/index';
import { entities } from 'src/database/models/index';
import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/jwt-auth/jwt-constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "root",
      password: "root",
      database: "precifica",
      synchronize: true,
      logging: true,
      entities: entities,
      migrations: migrations,
      cli: {
        migrationsDir: "/src/database/migrations"
      }
    }),
    TypeOrmModule.forFeature(entities),
    JwtModule.register({
      secret: jwtConstants.JWT_SECRET,
      signOptions: { expiresIn: jwtConstants.EXPIRES_IN },
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
