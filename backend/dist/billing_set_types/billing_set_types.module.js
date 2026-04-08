"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingSetTypesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const billing_set_types_entity_1 = require("./billing_set_types.entity");
const billing_set_types_controller_1 = require("./billing_set_types.controller");
const billing_set_types_service_1 = require("./billing_set_types.service");
let BillingSetTypesModule = class BillingSetTypesModule {
};
exports.BillingSetTypesModule = BillingSetTypesModule;
exports.BillingSetTypesModule = BillingSetTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([billing_set_types_entity_1.BillingSetTypesEntity])],
        controllers: [billing_set_types_controller_1.BillingSetTypesController],
        providers: [billing_set_types_service_1.BillingSetTypesService],
    })
], BillingSetTypesModule);
//# sourceMappingURL=billing_set_types.module.js.map