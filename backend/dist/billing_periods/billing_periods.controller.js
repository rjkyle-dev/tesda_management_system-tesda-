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
exports.BillingPeriodsController = void 0;
const common_1 = require("@nestjs/common");
const billing_periods_service_1 = require("./billing_periods.service");
const billing_periods_entity_1 = require("./billing_periods.entity");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const path = require("path");
const path_1 = require("path");
const multer_1 = require("multer");
const mime = require("mime-types");
let BillingPeriodsController = class BillingPeriodsController {
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
    async getAllByPage(page, limit) {
        const response = await this.i_service.getAllByPage(page, limit);
        return response;
    }
    async findCtrlNum(ctrl_num) {
        const response = await this.i_service.findCtrlNum(ctrl_num);
        return response;
    }
    async uploadDocument(file) {
        if (!file) {
            throw new common_1.BadRequestException("No file uploaded");
        }
        return {
            message: "Файл успешно загружен",
            savedFilename: file.filename,
            originalFilename: file.originalname,
        };
    }
    getDocument(filename, res) {
        const filePath = (0, path_1.join)(process.cwd(), '../uploads_billing/', filename);
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_1.BadRequestException('File not found');
        }
        const fileStream = (0, fs_1.createReadStream)(filePath);
        const mimeType = mime.lookup(filename) || 'application/octet-stream';
        const encodedFilename = encodeURIComponent(filename);
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename*=UTF-8''${encodedFilename}`,
        });
        return new common_1.StreamableFile(fileStream);
    }
    async updateStatus(data) {
        const response = await this.i_service.updateStatus(data);
        return response;
    }
    async getStatistics(tc_id, fiscal_yr) {
        const response = await this.i_service.getStatistics(tc_id, fiscal_yr);
        return response;
    }
    async getAllByMonth(month) {
        const response = await this.i_service.getAllByMonth(month);
        return response;
    }
    async getAllByMonthByTC(month, tc_id) {
        const response = await this.i_service.getAllByMonthByTC(month, tc_id);
        return response;
    }
    async chartGetDroppedStudentsMonth(fiscal_yr, tc_id) {
        const response = await this.i_service.chartGetDroppedStudentsMonth(fiscal_yr, tc_id);
        return response;
    }
    async chartGetDroppedStudents(fiscal_yr, tc_id) {
        const response = await this.i_service.chartGetDroppedStudents(fiscal_yr, tc_id);
        return response;
    }
    async chartGetBillingSubmissions(fiscal_yr) {
        const response = await this.i_service.chartGetBillingSubmissions(fiscal_yr);
        return response;
    }
    async computePerformanceScores(fiscal_yr) {
        const response = await this.i_service.computePerformanceScores(fiscal_yr);
        return response;
    }
    async computePerformanceScoresByScholarships(fiscal_yr) {
        const response = await this.i_service.computePerformanceScoresByScholarships(fiscal_yr);
        return response;
    }
    async computePerformanceScoresByTrainingCenters(fiscal_yr) {
        const response = await this.i_service.computePerformanceScoresByTrainingCenters(fiscal_yr);
        return response;
    }
    async computePerformanceScoresByQualifications(fiscal_yr) {
        const response = await this.i_service.computePerformanceScoresByQualifications(fiscal_yr);
        return response;
    }
    async generateReportBilling(file_data) {
        const response = await this.i_service.generateReportBilling(file_data);
        return response;
    }
    getReportFile(filename, res) {
        const filePath = path.join(process.cwd(), '../report_files', filename);
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
    async generateExcelBilling(file_data) {
        const response = await this.i_service.generateExcelBilling(file_data);
        return response;
    }
    getExcelFile(filename, res) {
        const filePath = path.join(process.cwd(), '../report_files', filename);
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_1.BadRequestException('File not found');
        }
        const fileStream = (0, fs_1.createReadStream)(filePath);
        const mimeType = mime.lookup(filename) ||
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const encodedFilename = encodeURIComponent(filename);
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}`,
        });
        return new common_1.StreamableFile(fileStream);
    }
    async getAssessmentRates(fiscal_yr) {
        return this.i_service.getAssessmentRates(fiscal_yr);
    }
    async exportExcel(file_data) {
        const response = await this.i_service.exportExcel(file_data);
        return response;
    }
    getExportedExcelFile(filename, res) {
        const filePath = path.join(process.cwd(), '../exported_billing_periods', filename);
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_1.BadRequestException('File not found');
        }
        const fileStream = (0, fs_1.createReadStream)(filePath);
        const mimeType = mime.lookup(filename) ||
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const encodedFilename = encodeURIComponent(filename);
        const asciiFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
        });
        return new common_1.StreamableFile(fileStream);
    }
};
exports.BillingPeriodsController = BillingPeriodsController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "findItem", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [billing_periods_entity_1.BillingPeriodsEntity]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)("edit"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "editItem", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("search/:name"),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "searchName", null);
__decorate([
    (0, common_1.Get)("get_all_by_page/:page/:limit"),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "getAllByPage", null);
__decorate([
    (0, common_1.Get)("find_by_ctrl_num/:ctrl_num"),
    __param(0, (0, common_1.Param)('ctrl_num')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "findCtrlNum", null);
__decorate([
    (0, common_1.Post)('upload_file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: '../uploads_billing/',
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const rawName = Buffer.from(file.originalname, 'latin1').toString('utf8');
                const originalName = path.basename(rawName, ext);
                const safeBaseName = originalName
                    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '');
                const finalName = `${safeBaseName}${ext}`;
                cb(null, finalName);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowedMimeTypes = [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
                'image/jpeg',
                'image/png',
                'image/gif',
            ];
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return cb(new common_1.BadRequestException('Only PDF, Excel, and image files are allowed'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)('get_file/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", common_1.StreamableFile)
], BillingPeriodsController.prototype, "getDocument", null);
__decorate([
    (0, common_1.Post)("update_status"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)("get_statistics/:tc_id/:fiscal_yr"),
    __param(0, (0, common_1.Param)('tc_id')),
    __param(1, (0, common_1.Param)('fiscal_yr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)("get_all_by_month/:month"),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "getAllByMonth", null);
__decorate([
    (0, common_1.Get)("get_all_by_month_tc/:month/:tc_id"),
    __param(0, (0, common_1.Param)('month')),
    __param(1, (0, common_1.Param)('tc_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "getAllByMonthByTC", null);
__decorate([
    (0, common_1.Get)("chart_get_dropped_by_tc_month/:fiscal_yr/:tc_id"),
    __param(0, (0, common_1.Param)('fiscal_yr')),
    __param(1, (0, common_1.Param)('tc_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "chartGetDroppedStudentsMonth", null);
__decorate([
    (0, common_1.Get)("chart_get_dropped_by_tc/:fiscal_yr/:tc_id"),
    __param(0, (0, common_1.Param)('fiscal_yr')),
    __param(1, (0, common_1.Param)('tc_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "chartGetDroppedStudents", null);
__decorate([
    (0, common_1.Get)("chart_get_billing_submission_by_tc/:fiscal_yr"),
    __param(0, (0, common_1.Param)('fiscal_yr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "chartGetBillingSubmissions", null);
__decorate([
    (0, common_1.Get)("performance_scores/:fiscal_yr"),
    __param(0, (0, common_1.Param)('fiscal_yr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "computePerformanceScores", null);
__decorate([
    (0, common_1.Get)("performance_scores_by_sc/:fiscal_yr"),
    __param(0, (0, common_1.Param)('fiscal_yr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "computePerformanceScoresByScholarships", null);
__decorate([
    (0, common_1.Get)("performance_scores_by_tc/:fiscal_yr"),
    __param(0, (0, common_1.Param)('fiscal_yr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "computePerformanceScoresByTrainingCenters", null);
__decorate([
    (0, common_1.Get)("performance_scores_by_q/:fiscal_yr"),
    __param(0, (0, common_1.Param)('fiscal_yr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "computePerformanceScoresByQualifications", null);
__decorate([
    (0, common_1.Post)('generate_report_billing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "generateReportBilling", null);
__decorate([
    (0, common_1.Get)('get_report_file/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", common_1.StreamableFile)
], BillingPeriodsController.prototype, "getReportFile", null);
__decorate([
    (0, common_1.Post)('generate_excel_billing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "generateExcelBilling", null);
__decorate([
    (0, common_1.Get)('get_excel_file/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", common_1.StreamableFile)
], BillingPeriodsController.prototype, "getExcelFile", null);
__decorate([
    (0, common_1.Get)("assessment_rates/:fiscal_yr"),
    __param(0, (0, common_1.Param)('fiscal_yr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "getAssessmentRates", null);
__decorate([
    (0, common_1.Post)('export_excel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingPeriodsController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.Get)('get_exported_excel_file/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", common_1.StreamableFile)
], BillingPeriodsController.prototype, "getExportedExcelFile", null);
exports.BillingPeriodsController = BillingPeriodsController = __decorate([
    (0, common_1.Controller)('billing_periods'),
    __metadata("design:paramtypes", [billing_periods_service_1.BillingPeriodsService])
], BillingPeriodsController);
//# sourceMappingURL=billing_periods.controller.js.map