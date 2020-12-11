"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Order = void 0;
var typeorm_1 = require("typeorm");
var product_model_1 = require("src/database/models/product.model");
var user_model_1 = require("src/database/models/user.model");
var Order = /** @class */ (function () {
    function Order() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    ], Order.prototype, "id");
    __decorate([
        typeorm_1.CreateDateColumn({ name: 'created_at', precision: 3 })
    ], Order.prototype, "createdAt");
    __decorate([
        typeorm_1.Column({
            name: 'total_price',
            type: 'decimal',
            "default": '0.00',
            precision: 11,
            scale: 2
        })
    ], Order.prototype, "totalPrice");
    __decorate([
        typeorm_1.Column({
            name: 'inputs_price',
            type: 'decimal',
            "default": '0.00',
            precision: 11,
            scale: 2
        })
    ], Order.prototype, "inputsPrice");
    __decorate([
        typeorm_1.ManyToMany(function () { return product_model_1.Product; }, function (product) { return product.orders; }),
        typeorm_1.JoinTable({
            name: 'order_product_order',
            joinColumn: { name: 'order_id' },
            inverseJoinColumn: { name: 'product_id' }
        })
    ], Order.prototype, "products");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_model_1.User; }, function (user) { return user.products; })
    ], Order.prototype, "user");
    Order = __decorate([
        typeorm_1.Entity('order')
    ], Order);
    return Order;
}());
exports.Order = Order;
