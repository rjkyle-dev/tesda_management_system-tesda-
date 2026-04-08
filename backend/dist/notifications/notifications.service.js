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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notifications_entity_1 = require("./notifications.entity");
const entities_1 = require("../entities");
let NotificationsService = class NotificationsService {
    constructor(i_repository, recipientsRepository, dataSource) {
        this.i_repository = i_repository;
        this.recipientsRepository = recipientsRepository;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.i_repository
            .createQueryBuilder("n")
            .orderBy("n.datetime_added", "DESC")
            .getMany();
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
    async editItem(data) {
        return await this.i_repository.update(data.id, data);
    }
    async deleteItem(data) {
        return await this.i_repository.delete(data.id);
    }
    async searchName(name) {
        return await this.i_repository
            .createQueryBuilder("n")
            .where("n.title LIKE :name OR n.message LIKE :name", {
            name: `%${name}%`,
        })
            .getMany();
    }
    async getAllByPage(page, limit) {
        const [data, count] = await this.i_repository.findAndCount({
            order: { datetime_added: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });
        return [data, count];
    }
    async getUserNotifications(page, limit, userId) {
        const qb = this.i_repository
            .createQueryBuilder("n")
            .leftJoinAndMapOne("n.nr", "notifications_recipients", "nr", "nr.notification_id = n.id AND nr.user_id = :userId", { userId })
            .where("nr.user_id IS NOT NULL")
            .orWhere(`(n.reference_type = :refType AND n.type IN (:...types))`, {
            refType: "billing",
            types: ["billing_submission", "billing_status"],
        })
            .orderBy("n.datetime_added", "DESC")
            .skip((page - 1) * limit)
            .take(limit);
        const [results, count] = await qb.getManyAndCount();
        const mappedResults = results.map(n => {
            const recipient = n.nr;
            return {
                ...n,
                is_read: recipient?.is_read ?? 0,
            };
        });
        return [mappedResults, count];
    }
    async markAsRead(userId, notificationId) {
        return await this.recipientsRepository.update({ user_id: userId, notification_id: notificationId }, { is_read: 1 });
    }
    async createNotification(data) {
        return await this.dataSource.transaction(async (manager) => {
            const notification = manager.create(notifications_entity_1.NotificationsEntity, {
                title: data.title,
                message: data.message,
                type: data.type,
                reference_id: data.referenceId,
                reference_type: data.referenceType,
                created_by: data.createdBy,
            });
            const savedNotification = await manager.save(notification);
            const recipients = data.recipientIds.map((userId) => manager.create(entities_1.NotificationsRecipientsEntity, {
                notification_id: savedNotification.id,
                user_id: userId,
            }));
            await manager.save(recipients);
            return savedNotification;
        });
    }
    async getUnreadCount(userId) {
        const count = await this.recipientsRepository.count({
            where: {
                user_id: userId,
                is_read: 0,
            },
        });
        return { unread: count };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notifications_entity_1.NotificationsEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.NotificationsRecipientsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map