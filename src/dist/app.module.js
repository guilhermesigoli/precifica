"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var calculation_service_1 = require("./services/calculation.service");
var product_service_1 = require("src/services/product.service");
var index_1 = require("src/database/migrations/index");
var index_2 = require("src/database/models/index");
var common_1 = require("@nestjs/common");
var app_controller_1 = require("src/app.controller");
var app_service_1 = require("src/app.service");
var typeorm_1 = require("@nestjs/typeorm");
var user_controller_1 = require("src/controllers/user.controller");
var user_service_1 = require("src/services/user.service");
var product_controller_1 = require("src/controllers/product.controller");
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
                    username: 'root',
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
            controllers: [app_controller_1.AppController, user_controller_1.UserController, product_controller_1.ProductController],
            providers: [app_service_1.AppService, user_service_1.UserService, product_service_1.ProductService, calculation_service_1.CalculationService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
