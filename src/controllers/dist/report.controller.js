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
exports.ReportController = void 0;
var common_1 = require("@nestjs/common");
var ReportController = /** @class */ (function () {
    function ReportController(reportService) {
        this.reportService = reportService;
    }
    ReportController.prototype.generateReport = function (params) {
        console.log(params);
        return this.reportService.generateReport(params);
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query())
    ], ReportController.prototype, "generateReport");
    ReportController = __decorate([
        common_1.Controller('reports')
    ], ReportController);
    return ReportController;
}());
exports.ReportController = ReportController;
