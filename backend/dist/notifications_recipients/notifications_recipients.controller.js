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
exports.NotificationsRecipientsController = void 0;
const common_1 = require("@nestjs/common");
const notifications_recipients_service_1 = require("./notifications_recipients.service");
const notifications_recipients_entity_1 = require("./notifications_recipients.entity");
let NotificationsRecipientsController = class NotificationsRecipientsController {
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
    async deleteItem(data) {
        const response = await this.i_service.deleteItem(data);
        return response;
    }
    async getAllByPage(page, limit) {
        const response = await this.i_service.getAllByPage(page, limit);
        return response;
    }
    async markAsRead(data) {
        const response = await this.i_service.markAsRead(data);
        return response;
    }
};
exports.NotificationsRecipientsController = NotificationsRecipientsController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsRecipientsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsRecipientsController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationsRecipientsController.prototype, "findItem", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notifications_recipients_entity_1.NotificationsRecipientsEntity]),
    __metadata("design:returntype", Promise)
], NotificationsRecipientsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsRecipientsController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("get_all_by_page/:page/:limit"),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationsRecipientsController.prototype, "getAllByPage", null);
__decorate([
    (0, common_1.Post)("mark_as_read"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsRecipientsController.prototype, "markAsRead", null);
exports.NotificationsRecipientsController = NotificationsRecipientsController = __decorate([
    (0, common_1.Controller)('notifications_recipients'),
    __metadata("design:paramtypes", [notifications_recipients_service_1.NotificationsRecipientsService])
], NotificationsRecipientsController);
//# sourceMappingURL=notifications_recipients.controller.js.map