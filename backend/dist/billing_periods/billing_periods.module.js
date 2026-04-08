"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingPeriodsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const billing_periods_entity_1 = require("./billing_periods.entity");
const billing_periods_controller_1 = require("./billing_periods.controller");
const billing_periods_service_1 = require("./billing_periods.service");
const notifications_service_1 = require("../notifications/notifications.service");
const entities_1 = require("../entities");
const notifications_recipients_service_1 = require("../notifications_recipients/notifications_recipients.service");
let BillingPeriodsModule = class BillingPeriodsModule {
};
exports.BillingPeriodsModule = BillingPeriodsModule;
exports.BillingPeriodsModule = BillingPeriodsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([billing_periods_entity_1.BillingPeriodsEntity, entities_1.NotificationsEntity, entities_1.NotificationsRecipientsEntity])],
        controllers: [billing_periods_controller_1.BillingPeriodsController],
        providers: [billing_periods_service_1.BillingPeriodsService, notifications_service_1.NotificationsService, notifications_recipients_service_1.NotificationsRecipientsService],
    })
], BillingPeriodsModule);
//# sourceMappingURL=billing_periods.module.js.map