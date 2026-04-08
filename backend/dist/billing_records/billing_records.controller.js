"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingRecordsController = void 0;
const common_1 = require("@nestjs/common");
const billing_records_service_1 = require("./billing_records.service");
const billing_records_entity_1 = require("./billing_records.entity");
let BillingRecordsController = class BillingRecordsController {
    constructor(i_service) {
        this.i_service = i_service;
    }
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }
    async getCount() {
        const response = await this.i_service.getCount();
        return response;
    }
    async findItem(id) {
        const response = await this.i_service.findItem(id);
        return response;
    }
    async addItem(createUserOto) {
        const response = await this.i_service.addItem(createUserOto);
        return response;
    }
    async editItem(data) {
        const response = await this.i_service.editItem(data);
        return response;
    }
    async deleteItem(data) {
        const response = await this.i_service.deleteItem(data);
        return response;
    }
    async searchName(name) {
        const response = await this.i_service.searchName(name);
        return response;
    }
    async getAllByPage(page, limit, status, search_type, search_value) {
        return await this.i_service.getAllByPage(page, limit, status, { type: search_type, value: search_value });
    }
    async getAllByPageType(isWorkback, page, limit) {
        const response = await this.i_service.getAllByPageType(isWorkback, page, limit);
        return response;
    }
    async getAllByPageTypeUser(tc_id, isWorkback, page, limit, status, search_value, search_type) {
        const response = await this.i_service.getAllByPageTypeUser(tc_id, isWorkback, page, limit, status, { value: search_value, type: search_type });
        return response;
    }
    async updateStatus(data) {
        const response = await this.i_service.updateStatus(data);
        return response;
    }
};
exports.BillingRecordsController = BillingRecordsController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "findItem", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [billing_records_entity_1.BillingRecordsEntity]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)("edit"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "editItem", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("search/:name"),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "searchName", null);
__decorate([
    (0, common_1.Get)("get_all_by_page/:page/:limit/:status"),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __param(2, (0, common_1.Param)('status')),
    __param(3, (0, common_1.Query)('type')),
    __param(4, (0, common_1.Query)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "getAllByPage", null);
__decorate([
    (0, common_1.Get)("get_all_by_page_type/:isWorkback/:page/:limit"),
    __param(0, (0, common_1.Param)('isWorkback')),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "getAllByPageType", null);
__decorate([
    (0, common_1.Get)("get_all_by_page_type_user/:tc_id/:isWorkback/:page/:limit/:status"),
    __param(0, (0, common_1.Param)('tc_id')),
    __param(1, (0, common_1.Param)('isWorkback')),
    __param(2, (0, common_1.Param)('page')),
    __param(3, (0, common_1.Param)('limit')),
    __param(4, (0, common_1.Param)('status')),
    __param(5, (0, common_1.Query)('value')),
    __param(6, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "getAllByPageTypeUser", null);
__decorate([
    (0, common_1.Post)("update_status"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingRecordsController.prototype, "updateStatus", null);
exports.BillingRecordsController = BillingRecordsController = __decorate([
    (0, common_1.Controller)('billing_records'),
    __metadata("design:paramtypes", [billing_records_service_1.BillingRecordsService])
], BillingRecordsController);
//# sourceMappingURL=billing_records.controller.js.map