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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OrderService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var typeorm_2 = require("@nestjs/typeorm");
var calculation_service_1 = require("./calculation.service");
var order_model_1 = require("src/database/models/order.model");
var product_model_1 = require("src/database/models/product.model");
var OrderService = /** @class */ (function () {
    function OrderService(orderRepository) {
        this.orderRepository = orderRepository;
    }
    OrderService.prototype.listOrders = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, orders, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.findAndCount({
                            where: { isAvaible: true }
                        })];
                    case 1:
                        _a = _b.sent(), orders = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                orders: orders,
                                total: total
                            }];
                }
            });
        });
    };
    OrderService.prototype.getOneOrder = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.findOne({
                            where: {
                                id: id
                            },
                            relations: ['products']
                        })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [2 /*return*/, order];
                }
            });
        });
    };
    OrderService.prototype.deleteOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderRepository.findOne({
                            where: { id: id, isAvaible: true }
                        })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.orderRepository.update({ id: id }, { isAvaible: false })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.createOrder = function (body) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getConnection().transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var orderRepository, productRepository, products, productsTotalPrice, inputsTotalPrice;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        orderRepository = transactionalEntityManager.getRepository(order_model_1.Order);
                                        productRepository = transactionalEntityManager.getRepository(product_model_1.Product);
                                        return [4 /*yield*/, productRepository.find({
                                                where: { id: typeorm_1.In(body.productsIds) }
                                            })];
                                    case 1:
                                        products = _a.sent();
                                        productsTotalPrice = '0';
                                        products.forEach(function (product) {
                                            productsTotalPrice = calculation_service_1.CalculationService.sum(productsTotalPrice, product.totalPrice);
                                        });
                                        inputsTotalPrice = '0';
                                        products.forEach(function (product) {
                                            inputsTotalPrice = calculation_service_1.CalculationService.sum(inputsTotalPrice, product.inputsPrice);
                                        });
                                        return [4 /*yield*/, orderRepository.save({
                                                inputsPrice: inputsTotalPrice,
                                                totalPrice: productsTotalPrice,
                                                isAvaible: true,
                                                userId: body.userId,
                                                createdAt: new Date(),
                                                products: products
                                            })];
                                    case 2: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_2.InjectRepository(order_model_1.Order))
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
