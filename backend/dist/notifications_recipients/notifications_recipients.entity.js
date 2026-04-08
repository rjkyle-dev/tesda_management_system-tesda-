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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsRecipientsEntity = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("typeorm");
let NotificationsRecipientsEntity = class NotificationsRecipientsEntity {
};
exports.NotificationsRecipientsEntity = NotificationsRecipientsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationsRecipientsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationsRecipientsEntity.prototype, "notification_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationsRecipientsEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationsRecipientsEntity.prototype, "is_read", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationsRecipientsEntity.prototype, "datetime_read", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.NotificationsEntity, notif => notif.id),
    (0, typeorm_1.JoinColumn)({ name: 'notification_id' }),
    __metadata("design:type", entities_1.NotificationsEntity)
], NotificationsRecipientsEntity.prototype, "notification", void 0);
exports.NotificationsRecipientsEntity = NotificationsRecipientsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "notifications_recipients" })
], NotificationsRecipientsEntity);
//# sourceMappingURL=notifications_recipients.entity.js.map