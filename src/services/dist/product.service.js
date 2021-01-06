"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ProductService = void 0;
var input_model_1 = require("./../database/models/input.model");
var calculation_service_1 = require("./calculation.service");
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var typeorm_2 = require("@nestjs/typeorm");
var product_model_1 = require("src/database/models/product.model");
var ProductService = /** @class */ (function () {
    function ProductService(productRepository, calculationService) {
        this.productRepository = productRepository;
        this.calculationService = calculationService;
    }
    ProductService.prototype.listProducts = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, products, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.productRepository.findAndCount({
                            where: { id: id, isAvaible: true },
                            select: ['id', 'name', 'totalPrice']
                        })];
                    case 1:
                        _a = _b.sent(), products = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                products: products,
                                total: total
                            }];
                }
            });
        });
    };
    ProductService.prototype.getOneProduct = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productRepository.findOne({
                            where: {
                                id: id
                            },
                            relations: ['inputs']
                        })];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductService.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productRepository.findOne({
                            where: { id: id, isAvaible: true }
                        })];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.productRepository.update({ id: id }, { isAvaible: false })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.createProduct = function (body) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getConnection().transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var productRepository, inputRepository, inputsPrices, inputsTotalPrice, productTotalPrice, newProduct, _i, _a, input;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        productRepository = transactionalEntityManager.getRepository(product_model_1.Product);
                                        inputRepository = transactionalEntityManager.getRepository(input_model_1.Input);
                                        inputsPrices = body.inputs.map(function (input) {
                                            return calculation_service_1.CalculationService.calcTotalPercent(input.totalPrice, input.usedPercentage);
                                        });
                                        inputsTotalPrice = '0';
                                        inputsPrices.forEach(function (price) {
                                            inputsTotalPrice = calculation_service_1.CalculationService.sum(inputsTotalPrice, price);
                                        });
                                        productTotalPrice = calculation_service_1.CalculationService.sum(inputsTotalPrice, calculation_service_1.CalculationService.calcTotalPercent(inputsTotalPrice, body.profitPercentage));
                                        return [4 /*yield*/, productRepository.save({
                                                name: body.name,
                                                profitPercentage: body.profitPercentage,
                                                totalPrice: productTotalPrice,
                                                inputsPrice: inputsTotalPrice,
                                                userId: body.userId,
                                                isAvaible: true
                                            })];
                                    case 1:
                                        newProduct = _b.sent();
                                        _i = 0, _a = body.inputs;
                                        _b.label = 2;
                                    case 2:
                                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                                        input = _a[_i];
                                        return [4 /*yield*/, inputRepository.save(__assign(__assign({}, input), { productId: newProduct.id }))];
                                    case 3:
                                        _b.sent();
                                        _b.label = 4;
                                    case 4:
                                        _i++;
                                        return [3 /*break*/, 2];
                                    case 5: return [2 /*return*/, newProduct];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_2.InjectRepository(product_model_1.Product))
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
