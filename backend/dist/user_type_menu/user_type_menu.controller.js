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
exports.UserTypeMenuController = void 0;
const common_1 = require("@nestjs/common");
const user_type_menu_service_1 = require("./user_type_menu.service");
const user_type_menu_entity_1 = require("./user_type_menu.entity");
let UserTypeMenuController = class UserTypeMenuController {
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
    async getMenu(id) {
        const response = await this.i_service.getMenu(id);
        return response;
    }
    async checkPrivilege(data) {
        const response = await this.i_service.checkPrivilege(data);
        return response;
    }
    async assignChild(data) {
        const response = await this.i_service.assignChild(data);
        return response;
    }
    async searchNameNav(name, ut_id) {
        const response = await this.i_service.searchNameNav(name, ut_id);
        return response;
    }
    async getListDataClick(ut_id) {
        const response = await this.i_service.getListDataClick(ut_id);
        return response;
    }
};
exports.UserTypeMenuController = UserTypeMenuController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "findItem", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_type_menu_entity_1.UserTypeMenuEntity]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)("edit"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "editItem", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("search/:name"),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "searchName", null);
__decorate([
    (0, common_1.Get)("get_menu/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "getMenu", null);
__decorate([
    (0, common_1.Post)("check"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "checkPrivilege", null);
__decorate([
    (0, common_1.Post)("assign_item"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "assignChild", null);
__decorate([
    (0, common_1.Get)("search_nav/:name/:ut_id"),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('ut_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "searchNameNav", null);
__decorate([
    (0, common_1.Get)("get_list_click/:ut_id"),
    __param(0, (0, common_1.Param)('ut_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserTypeMenuController.prototype, "getListDataClick", null);
exports.UserTypeMenuController = UserTypeMenuController = __decorate([
    (0, common_1.Controller)('user_type_menu'),
    __metadata("design:paramtypes", [user_type_menu_service_1.UserTypeMenuService])
], UserTypeMenuController);
//# sourceMappingURL=user_type_menu.controller.js.map