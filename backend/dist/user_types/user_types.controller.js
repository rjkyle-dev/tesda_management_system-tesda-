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
exports.UserTypesController = void 0;
const common_1 = require("@nestjs/common");
const user_types_service_1 = require("./user_types.service");
let UserTypesController = class UserTypesController {
    constructor(i_service) {
        this.i_service = i_service;
    }
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }
    async findTypeUser(ut_id) {
        const response = await this.i_service.findTypeUser(ut_id);
        return response;
    }
};
exports.UserTypesController = UserTypesController;
__decorate([
    (0, common_1.Get)("get_user_types"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserTypesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("find_user_types/:ut_id"),
    __param(0, (0, common_1.Param)('ut_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserTypesController.prototype, "findTypeUser", null);
exports.UserTypesController = UserTypesController = __decorate([
    (0, common_1.Controller)('user_types'),
    __metadata("design:paramtypes", [user_types_service_1.UserTypesService])
], UserTypesController);
//# sourceMappingURL=user_types.controller.js.map