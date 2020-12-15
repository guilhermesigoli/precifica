import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from 'src/services/product.service';
import { OrderController } from 'src/controllers/order.controller';
import { OrderService } from 'src/services/order.service';
import { ReportController } from 'src/controllers/report.controller';
import { ReportService } from 'src/services/report.service';
import { CalculationService } from 'src/services/calculation.service';
import { migrations } from 'src/database/migrations/index';
import { entities } from 'src/database/models/index';

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
      logging: true,
      entities: entities,
      migrations: migrations,
      cli: {
        migrationsDir: '/src/database/migrations',
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [
    AppController,
    UserController,
    ProductController,
    OrderController,
    ReportController,
  ],
  providers: [
    AppService,
    UserService,
    ProductService,
    OrderService,
    CalculationService,
    ReportService,
  ],
})
export class AppModule {}
