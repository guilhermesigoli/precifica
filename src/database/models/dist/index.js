"use strict";
exports.__esModule = true;
exports.entities = void 0;
var product_model_1 = require("src/database/models/product.model");
var order_model_1 = require("src/database/models/order.model");
var input_model_1 = require("src/database/models/input.model");
var user_model_1 = require("src/database/models/user.model");
exports.entities = [
    user_model_1.User,
    input_model_1.Input,
    order_model_1.Order,
    product_model_1.Product
];
