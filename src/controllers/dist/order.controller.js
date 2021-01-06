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
exports.OrderController = void 0;
var common_1 = require("@nestjs/common");
var OrderController = /** @class */ (function () {
    function OrderController(orderService) {
        this.orderService = orderService;
    }
    OrderController.prototype.listOrders = function (userId) {
        return this.orderService.listOrders(userId);
    };
    OrderController.prototype.createOrder = function (body) {
        return this.orderService.createOrder(body);
    };
    OrderController.prototype.deleteOrder = function (id) {
        return this.orderService.deleteOrder(id);
    };
    OrderController.prototype.getOneOrder = function (id) {
        return this.orderService.getOneOrder(id);
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Param('user'))
    ], OrderController.prototype, "listOrders");
    __decorate([
        common_1.Post(),
        common_1.HttpCode(201),
        __param(0, common_1.Body())
    ], OrderController.prototype, "createOrder");
    __decorate([
        common_1.Post('/delete/:id'),
        common_1.HttpCode(200),
        __param(0, common_1.Param('id'))
    ], OrderController.prototype, "deleteOrder");
    __decorate([
        common_1.Get('/:id'),
        __param(0, common_1.Param('id'))
    ], OrderController.prototype, "getOneOrder");
    OrderController = __decorate([
        common_1.Controller('order')
    ], OrderController);
    return OrderController;
}());
exports.OrderController = OrderController;
