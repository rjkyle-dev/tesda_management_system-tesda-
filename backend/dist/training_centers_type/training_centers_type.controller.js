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
exports.TrainingCentersTypeController = void 0;
const common_1 = require("@nestjs/common");
const training_centers_type_service_1 = require("./training_centers_type.service");
let TrainingCentersTypeController = class TrainingCentersTypeController {
    constructor(i_service) {
        this.i_service = i_service;
    }
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }
    async findItem(ut_id) {
        const response = await this.i_service.findItem(ut_id);
        return response;
    }
};
exports.TrainingCentersTypeController = TrainingCentersTypeController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingCentersTypeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TrainingCentersTypeController.prototype, "findItem", null);
exports.TrainingCentersTypeController = TrainingCentersTypeController = __decorate([
    (0, common_1.Controller)('training_centers_type'),
    __metadata("design:paramtypes", [training_centers_type_service_1.TrainingCentersTypeService])
], TrainingCentersTypeController);
//# sourceMappingURL=training_centers_type.controller.js.map