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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./user.entity");
const helper_1 = require("../helper");
const multer_1 = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const path_1 = require("path");
const mime_types_1 = require("mime-types");
let UserController = class UserController {
    constructor(i_service) {
        this.i_service = i_service;
    }
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }
    async getAllByType(isActive) {
        const response = await this.i_service.getAllByType(isActive);
        return response;
    }
    async getCount() {
        const response = await this.i_service.getCount();
        return response;
    }
    async getAllByPageTypeUser(type, page, limit, search_value, search_type) {
        const response = await this.i_service.getAllByPage(type, page, limit, { value: search_value, type: search_type });
        return response;
    }
    async getAllByPageType(ut_id, page, limit) {
        const response = await this.i_service.getAllByPageType(ut_id, page, limit);
        return response;
    }
    async findUser(user_id) {
        const response = await this.i_service.findUser(user_id);
        return response;
    }
    async searchNameByPage(page, limit, name) {
        const response = await this.i_service.searchNameByPage(page, limit, name);
        return response;
    }
    async searchName(name) {
        const response = await this.i_service.searchName(name);
        return response;
    }
    async findTypeofUser(name) {
        const response = await this.i_service.findTypeofUser(name);
        return response;
    }
    async registerUser(createUserOto) {
        return await this.i_service.registerUser(createUserOto);
    }
    async uploadEsign(file, id, req) {
        return this.i_service.saveEsign(id, file.filename);
    }
    async uploadPic(file, id, req) {
        return this.i_service.saveProfPic(id, file.filename);
    }
    async updateProfilePic(createUserOto) {
        const response = await this.i_service.updateProfilePic(createUserOto);
        return response;
    }
    getFile(filename, filetype, res) {
        let filePath;
        if (filetype === "esign") {
            filePath = (0, path_1.join)(process.cwd(), '../e_signatures/', filename);
        }
        else {
            filePath = (0, path_1.join)(process.cwd(), '../images/', filename);
        }
        const mimeType = (0, mime_types_1.lookup)(filePath) || 'application/octet-stream';
        const file = (0, fs_1.createReadStream)(filePath);
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': 'inline; filename="' + filename + '"',
        });
        file.on('error', (err) => { console.error(err); });
        return new common_1.StreamableFile(file);
    }
    async editUser(createUserOto) {
        const response = await this.i_service.editUser(createUserOto);
        return response;
    }
    async editEmail(createUserOto) {
        const response = await this.i_service.editEmail(createUserOto);
        return response;
    }
    async editPassword(createUserOto) {
        const response = await this.i_service.editPassword(createUserOto);
        return response;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("get_users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_users_by_type/:isActive"),
    __param(0, (0, common_1.Param)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllByType", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("get_users_by_page/:type/:page/:limit"),
    __param(0, (0, common_1.Param)('type')),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __param(3, (0, common_1.Query)('value')),
    __param(4, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllByPageTypeUser", null);
__decorate([
    (0, common_1.Get)("get_users_by_page_type/:ut_id/:page/:limit"),
    __param(0, (0, common_1.Param)('ut_id')),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllByPageType", null);
__decorate([
    (0, common_1.Get)("find_user/:user_id"),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)("search_page/:page/:limit/:name"),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __param(2, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchNameByPage", null);
__decorate([
    (0, common_1.Get)("search/:name"),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchName", null);
__decorate([
    (0, common_1.Get)("find_type_of_user/:name"),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findTypeofUser", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('upload_esign/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: '../e_signatures',
            filename: helper_1.FilesHelper.customFileName,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadEsign", null);
__decorate([
    (0, common_1.Post)('upload_pic/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: '../images',
            filename: helper_1.FilesHelper.customFileName,
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadPic", null);
__decorate([
    (0, common_1.Post)('update_profile_pic'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfilePic", null);
__decorate([
    (0, common_1.Get)("get_img/:filename/:filetype"),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Param)('filetype')),
    __param(2, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", common_1.StreamableFile)
], UserController.prototype, "getFile", null);
__decorate([
    (0, common_1.Post)('edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.Post)('edit_email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editEmail", null);
__decorate([
    (0, common_1.Post)('edit_password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editPassword", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map