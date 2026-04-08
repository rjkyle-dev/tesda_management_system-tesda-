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
exports.BillingSetTypesController = void 0;
const common_1 = require("@nestjs/common");
const billing_set_types_service_1 = require("./billing_set_types.service");
const billing_set_types_entity_1 = require("./billing_set_types.entity");
let BillingSetTypesController = class BillingSetTypesController {
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
    async getAllByPage(page, limit) {
        const response = await this.i_service.getAllByPage(page, limit);
        return response;
    }
    async findBySCId(sc_id) {
        const response = await this.i_service.findBySCId(sc_id);
        return response;
    }
};
exports.BillingSetTypesController = BillingSetTypesController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "findItem", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [billing_set_types_entity_1.BillingSetTypesEntity]),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)("edit"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "editItem", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("search/:name"),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "searchName", null);
__decorate([
    (0, common_1.Get)("get_all_by_page/:page/:limit"),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "getAllByPage", null);
__decorate([
    (0, common_1.Get)("find_by_sc_id/:sc_id"),
    __param(0, (0, common_1.Param)('sc_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BillingSetTypesController.prototype, "findBySCId", null);
exports.BillingSetTypesController = BillingSetTypesController = __decorate([
    (0, common_1.Controller)('billing_set_types'),
    __metadata("design:paramtypes", [billing_set_types_service_1.BillingSetTypesService])
], BillingSetTypesController);
//# sourceMappingURL=billing_set_types.controller.js.map