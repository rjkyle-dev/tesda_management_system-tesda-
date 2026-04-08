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
exports.NotificationsRecipientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let NotificationsRecipientsService = class NotificationsRecipientsService {
    constructor(i_repository) {
        this.i_repository = i_repository;
    }
    async getAll() {
        return await this.i_repository.find({
            order: { datetime_read: "DESC" },
        });
    }
    async getCount() {
        const total = await this.i_repository.count();
        return { total_cnt: total };
    }
    async findItem(id) {
        return await this.i_repository.findOne({ where: { id } });
    }
    async addItem(data) {
        return await this.i_repository.save(data);
    }
    async deleteItem(data) {
        return await this.i_repository.delete(data.id);
    }
    async getAllByPage(page, limit) {
        return await this.i_repository.findAndCount({
            order: { datetime_read: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async markAsRead(data) {
        const recipient = await this.i_repository.findOne({
            where: {
                user_id: data.user_id,
                notification_id: data.notification_id,
            },
        });
        if (!recipient) {
            throw new Error('Recipient row not found');
        }
        recipient.is_read = 1;
        return await this.i_repository.save(recipient);
    }
};
exports.NotificationsRecipientsService = NotificationsRecipientsService;
exports.NotificationsRecipientsService = NotificationsRecipientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.NotificationsRecipientsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationsRecipientsService);
//# sourceMappingURL=notifications_recipients.service.js.map