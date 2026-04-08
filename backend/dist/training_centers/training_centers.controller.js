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
exports.TrainingCentersController = void 0;
const common_1 = require("@nestjs/common");
const training_centers_service_1 = require("./training_centers.service");
const training_centers_entity_1 = require("./training_centers.entity");
const fs_1 = require("fs");
const path = require("path");
const mime = require("mime-types");
let TrainingCentersController = class TrainingCentersController {
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
    async getAllByPageTypeUser(page, limit, search_value, search_type) {
        const response = await this.i_service.getAllByPage(page, limit, { value: search_value, type: search_type });
        return response;
    }
    async generateSummaryTrainingCenters(file_data) {
        const response = await this.i_service.generateSummaryTrainingCenters(file_data);
        return response;
    }
    getSummaryFile(filename, res) {
        const filePath = path.join(process.cwd(), '../summary_training_centers', filename);
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_1.BadRequestException('File not found');
        }
        const fileStream = (0, fs_1.createReadStream)(filePath);
        const mimeType = mime.lookup(filename) || 'application/pdf';
        const encodedFilename = encodeURIComponent(filename);
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename*=UTF-8''${encodedFilename}`,
        });
        return new common_1.StreamableFile(fileStream);
    }
};
exports.TrainingCentersController = TrainingCentersController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "findItem", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [training_centers_entity_1.TrainingCentersEntity]),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)("edit"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "editItem", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("search/:name"),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "searchName", null);
__decorate([
    (0, common_1.Get)("get_all_by_page/:page/:limit"),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __param(2, (0, common_1.Query)('value')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "getAllByPageTypeUser", null);
__decorate([
    (0, common_1.Post)('generate_summary'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainingCentersController.prototype, "generateSummaryTrainingCenters", null);
__decorate([
    (0, common_1.Get)('get_summary/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", common_1.StreamableFile)
], TrainingCentersController.prototype, "getSummaryFile", null);
exports.TrainingCentersController = TrainingCentersController = __decorate([
    (0, common_1.Controller)('training_centers'),
    __metadata("design:paramtypes", [training_centers_service_1.TrainingCentersService])
], TrainingCentersController);
//# sourceMappingURL=training_centers.controller.js.map