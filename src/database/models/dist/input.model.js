"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Input = void 0;
var typeorm_1 = require("typeorm");
var product_model_1 = require("src/database/models/product.model");
var Input = /** @class */ (function () {
    function Input() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
    ], Input.prototype, "id");
    __decorate([
        typeorm_1.Column({ name: 'name', type: 'varchar' })
    ], Input.prototype, "name");
    __decorate([
        typeorm_1.Column({
            name: 'total_price',
            type: 'decimal',
            "default": '0.00',
            precision: 11,
            scale: 2
        })
    ], Input.prototype, "totalPrice");
    __decorate([
        typeorm_1.Column({ name: 'used_percentage', type: 'int' })
    ], Input.prototype, "usedPercentage");
    __decorate([
        typeorm_1.Column({ name: 'product_id', type: 'bigint' })
    ], Input.prototype, "productId");
    __decorate([
        typeorm_1.ManyToOne(function () { return product_model_1.Product; }, function (product) { return product.inputs; }),
        typeorm_1.JoinColumn({ name: 'product_id' })
    ], Input.prototype, "product");
    Input = __decorate([
        typeorm_1.Entity('input')
    ], Input);
    return Input;
}());
exports.Input = Input;
