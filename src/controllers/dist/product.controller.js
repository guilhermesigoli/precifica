"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ProductController = void 0;
var common_1 = require("@nestjs/common");
var ProductController = /** @class */ (function () {
    function ProductController(productService) {
        this.productService = productService;
    }
    ProductController.prototype.listProducts = function (userId) {
        return this.productService.listProducts(userId);
    };
    ProductController.prototype.createProduct = function (body) {
        return this.productService.createProduct(body);
    };
    ProductController.prototype.deleteProduct = function (id) {
        return this.productService.deleteProduct(id);
    };
    ProductController.prototype.getOneProduct = function (id) {
        return this.productService.getOneProduct(id);
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Param('user'))
    ], ProductController.prototype, "listProducts");
    __decorate([
        common_1.Post(),
        common_1.HttpCode(201),
        __param(0, common_1.Body())
    ], ProductController.prototype, "createProduct");
    __decorate([
        common_1.Post('/delete/:id'),
        common_1.HttpCode(200),
        __param(0, common_1.Param('id'))
    ], ProductController.prototype, "deleteProduct");
    __decorate([
        common_1.Get('/:id'),
        __param(0, common_1.Param('id'))
    ], ProductController.prototype, "getOneProduct");
    ProductController = __decorate([
        common_1.Controller('products')
    ], ProductController);
    return ProductController;
}());
exports.ProductController = ProductController;
