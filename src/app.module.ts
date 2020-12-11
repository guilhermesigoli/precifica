import { migrations } from 'src/database/migrations/index';
import { entities } from 'src/database/models/index';
import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'precifica',
      synchronize: true,
      entities: entities,
      migrations: migrations,
      cli: {
        migrationsDir: '/src/database/migrations',
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
