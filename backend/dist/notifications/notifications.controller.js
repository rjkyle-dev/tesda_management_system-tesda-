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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("./notifications.service");
const notifications_entity_1 = require("./notifications.entity");
let NotificationsController = class NotificationsController {
    constructor(i_service) {
        this.i_service = i_service;
    }
    async getAll() {
        return await this.i_service.getAll();
    }
    async getCount() {
        return await this.i_service.getCount();
    }
    async findItem(id) {
        return await this.i_service.findItem(id);
    }
    async addItem(data) {
        return await this.i_service.addItem(data);
    }
    async editItem(data) {
        return await this.i_service.editItem(data);
    }
    async deleteItem(data) {
        return await this.i_service.deleteItem(data);
    }
    async searchName(name) {
        return await this.i_service.searchName(name);
    }
    async getAllByPage(page, limit) {
        return await this.i_service.getAllByPage(page, limit);
    }
    async getDataList(page, limit, userId) {
        return await this.i_service.getUserNotifications(page, limit, userId);
    }
    async markAsRead(data) {
        return await this.i_service.markAsRead(data.user_id, data.notification_id);
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findItem", null);
__decorate([
    (0, common_1.Post)("add"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notifications_entity_1.NotificationsEntity]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)("edit"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "editItem", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("search/:name"),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "searchName", null);
__decorate([
    (0, common_1.Get)("get_all_by_page/:page/:limit"),
    __param(0, (0, common_1.Param)("page", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)("limit", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getAllByPage", null);
__decorate([
    (0, common_1.Get)("get_data/:page/:limit/:user_id"),
    __param(0, (0, common_1.Param)("page", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)("limit", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)("user_id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getDataList", null);
__decorate([
    (0, common_1.Post)("mark_as_read"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)("notifications"),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map