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
exports.TraineesEntity = void 0;
const typeorm_1 = require("typeorm");
let TraineesEntity = class TraineesEntity {
};
exports.TraineesEntity = TraineesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TraineesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TraineesEntity.prototype, "fname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TraineesEntity.prototype, "mname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TraineesEntity.prototype, "lname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TraineesEntity.prototype, "extension", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TraineesEntity.prototype, "sg_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TraineesEntity.prototype, "training_cost", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TraineesEntity.prototype, "ctrl_num", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TraineesEntity.prototype, "bt_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TraineesEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TraineesEntity.prototype, "date_dropped", void 0);
exports.TraineesEntity = TraineesEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "trainees" })
], TraineesEntity);
//# sourceMappingURL=trainees.entity.js.map