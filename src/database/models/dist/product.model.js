"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var input_model_1 = require("src/database/models/input.model");
var order_model_1 = require("src/database/models/order.model");
var user_model_1 = require("src/database/models/user.model");
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    ], Product.prototype, "id");
    __decorate([
        typeorm_1.Column({ name: 'name', type: 'varchar' })
    ], Product.prototype, "name");
    __decorate([
        typeorm_1.Column({
            name: 'total_price',
            type: 'decimal',
            "default": '0.00',
            precision: 11,
            scale: 2
        })
    ], Product.prototype, "totalPrice");
    __decorate([
        typeorm_1.Column({
            name: 'inputs_price',
            type: 'decimal',
            "default": '0.00',
            precision: 11,
            scale: 2
        })
    ], Product.prototype, "inputsPrice");
    __decorate([
        typeorm_1.Column({ name: 'profit_percentage', type: 'int' })
    ], Product.prototype, "profitPercentage");
    __decorate([
        typeorm_1.OneToMany(function () { return input_model_1.Input; }, function (input) { return input.product; })
    ], Product.prototype, "inputs");
    __decorate([
        typeorm_1.ManyToMany(function () { return order_model_1.Order; }, function (order) { return order.products; }, { cascade: true })
    ], Product.prototype, "orders");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_model_1.User; }, function (user) { return user.products; })
    ], Product.prototype, "user");
    Product = __decorate([
        typeorm_1.Entity('product')
    ], Product);
    return Product;
}());
exports.Product = Product;
