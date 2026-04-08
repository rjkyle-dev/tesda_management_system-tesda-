"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const billing_records_entity_1 = require("./billing_records.entity");
const billing_records_controller_1 = require("./billing_records.controller");
const billing_records_service_1 = require("./billing_records.service");
let BillingRecordsModule = class BillingRecordsModule {
};
exports.BillingRecordsModule = BillingRecordsModule;
exports.BillingRecordsModule = BillingRecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([billing_records_entity_1.BillingRecordsEntity])],
        controllers: [billing_records_controller_1.BillingRecordsController],
        providers: [billing_records_service_1.BillingRecordsService],
    })
], BillingRecordsModule);
//# sourceMappingURL=billing_records.module.js.map