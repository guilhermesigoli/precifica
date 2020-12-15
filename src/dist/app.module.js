"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var app_controller_1 = require("src/app.controller");
var app_service_1 = require("src/app.service");
var user_controller_1 = require("src/controllers/user.controller");
var user_service_1 = require("src/services/user.service");
var product_controller_1 = require("src/controllers/product.controller");
var product_service_1 = require("src/services/product.service");
var order_controller_1 = require("src/controllers/order.controller");
var order_service_1 = require("src/services/order.service");
var report_controller_1 = require("src/controllers/report.controller");
var report_service_1 = require("src/services/report.service");
var calculation_service_1 = require("src/services/calculation.service");
var index_1 = require("src/database/migrations/index");
var index_2 = require("src/database/models/index");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: 'root',
                    database: 'precifica',
                    synchronize: true,
                    entities: index_2.entities,
                    migrations: index_1.migrations,
                    cli: {
                        migrationsDir: '/src/database/migrations'
                    }
                }),
                typeorm_1.TypeOrmModule.forFeature(index_2.entities),
            ],
            controllers: [
                app_controller_1.AppController,
                user_controller_1.UserController,
                product_controller_1.ProductController,
                order_controller_1.OrderController,
                report_controller_1.ReportController
            ],
            providers: [
                app_service_1.AppService,
                user_service_1.UserService,
                product_service_1.ProductService,
                order_service_1.OrderService,
                calculation_service_1.CalculationService,
                report_service_1.ReportService
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
