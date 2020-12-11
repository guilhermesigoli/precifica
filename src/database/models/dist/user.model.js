"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var order_model_1 = require("src/database/models/order.model");
var product_model_1 = require("src/database/models/product.model");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ name: 'name', type: 'varchar' })
    ], User.prototype, "name");
    __decorate([
        typeorm_1.Column({ name: 'email', type: 'varchar', unique: true })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ name: 'password', type: 'varchar', select: false })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.OneToMany(function () { return product_model_1.Product; }, function (product) { return product.user; })
    ], User.prototype, "products");
    __decorate([
        typeorm_1.OneToMany(function () { return order_model_1.Order; }, function (order) { return order.user; })
    ], User.prototype, "orders");
    User = __decorate([
        typeorm_1.Entity('user')
    ], User);
    return User;
}());
exports.User = User;
