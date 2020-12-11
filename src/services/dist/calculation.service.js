"use strict";
exports.__esModule = true;
exports.CalculationService = void 0;
var big_js_1 = require("big.js");
var CalculationService = /** @class */ (function () {
    function CalculationService() {
    }
    CalculationService.round = function (amount, decimalPlaces) {
        return amount.round(decimalPlaces, big_js_1.RoundingMode.RoundDown).toFixed(decimalPlaces);
    };
    CalculationService.calcTotalPercent = function (amount, percent, decimalPlace) {
        if (decimalPlace === void 0) { decimalPlace = 2; }
        var bAmount = big_js_1.Big(amount);
        var bPercent = big_js_1.Big(percent).div(100);
        var r = bAmount.times(bPercent);
        return CalculationService.round(r, decimalPlace);
    };
    CalculationService.sum = function (value1, value2, decimalPlace) {
        if (decimalPlace === void 0) { decimalPlace = 2; }
        var result = big_js_1.Big(value1).plus(big_js_1.Big(value2));
        return CalculationService.round(result, decimalPlace);
    };
    return CalculationService;
}());
exports.CalculationService = CalculationService;
