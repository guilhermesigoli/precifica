"use strict";
exports.__esModule = true;
exports.CalculationService = void 0;
var big_js_1 = require("big.js");
var CalculationService = /** @class */ (function () {
    function CalculationService() {
    }
    CalculationService.round = function (amount, decimalPlaces) {
        return amount
            .round(decimalPlaces, 0 /* RoundDown */)
            .toFixed(decimalPlaces);
    };
    CalculationService.calcTotalPercent = function (amount, percent, decimalPlace) {
        if (decimalPlace === void 0) { decimalPlace = 2; }
        var bAmount = big_js_1.Big(amount);
        var bPercent = big_js_1.Big(percent).div(100);
        var r = bAmount.times(bPercent);
        return CalculationService.round(r, decimalPlace);
    };
    /**
     * Adds value1 and value2 and rounds the result
     * @param {string} value1
     * @param {string} value2
     * @param {number} decimalPlace - Decimal places to round
     */
    CalculationService.sum = function (value1, value2, decimalPlace) {
        if (decimalPlace === void 0) { decimalPlace = 2; }
        var result = big_js_1.Big(value1).plus(big_js_1.Big(value2));
        return CalculationService.round(result, decimalPlace);
    };
    /**
     * Subtracts value2 from value1 and rounds the result
     * @param {string} value1 - Value to be subtracted from
     * @param {string} value2 - Value to subtract
     * @param {number} decimalPlace - Decimal places to round
     */
    CalculationService.sub = function (value1, value2, decimalPlace) {
        if (decimalPlace === void 0) { decimalPlace = 2; }
        var result = big_js_1.Big(value1).sub(big_js_1.Big(value2));
        return CalculationService.round(result, decimalPlace);
    };
    return CalculationService;
}());
exports.CalculationService = CalculationService;
