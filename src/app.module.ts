import { migrations } from 'src/database/migrations/index';
import { entities } from 'src/database/models/index';
import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
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
  controllers: [AppController, UserController, ProductController ],
  providers: [AppService, UserService, ProductService ],
})
export class AppModule {}
