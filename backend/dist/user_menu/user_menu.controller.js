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
exports.UserMenuController = void 0;
const common_1 = require("@nestjs/common");
const user_menu_service_1 = require("./user_menu.service");
const user_menu_entity_1 = require("./user_menu.entity");
const platform_express_1 = require("@nestjs/platform-express");
const helper_1 = require("../helper");
const multer_1 = require("multer");
const fs_1 = require("fs");
const path_1 = require("path");
let UserMenuController = class UserMenuController {
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
    async uploadPic(file) {
        return file;
    }
    getFile(filename, filetype, res) {
        var content_type;
        if (filetype == "png")
            content_type = 'image/png';
        const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), '../menu_icons/' + filename));
        res.set({
            'Content-Type': content_type,
            'Content-Disposition': 'inline; filename=' + filename,
        });
        file.on('error', (err) => { console.error(err); });
        return new common_1.StreamableFile(file).setErrorHandler(err => {
            err && common_1.Logger.log(err.message);
        });
    }
    async getAllPage(page, limit) {
        const response = await this.i_service.getAllPage(page, limit);
        return response;
    }
};
exports.UserMenuController = UserMenuController;
__decorate([
    (0, common_1.Get)("get_all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("get_count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)("find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "findItem", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_menu_entity_1.UserMenuEntity]),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "addItem", null);
__decorate([
    (0, common_1.Post)("edit"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "editItem", null);
__decorate([
    (0, common_1.Post)("delete"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "deleteItem", null);
__decorate([
    (0, common_1.Get)("search/:name"),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "searchName", null);
__decorate([
    (0, common_1.Post)('upload_icon'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: '../menu_icons/',
            filename: helper_1.FilesHelper.customFileName,
        })
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "uploadPic", null);
__decorate([
    (0, common_1.Get)("get_file/:filename/:filetype"),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Param)('filetype')),
    __param(2, (0, common_1.Response)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", common_1.StreamableFile)
], UserMenuController.prototype, "getFile", null);
__decorate([
    (0, common_1.Get)("get_all_page/:page/:limit"),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserMenuController.prototype, "getAllPage", null);
exports.UserMenuController = UserMenuController = __decorate([
    (0, common_1.Controller)('user_menu'),
    __metadata("design:paramtypes", [user_menu_service_1.UserMenuService])
], UserMenuController);
//# sourceMappingURL=user_menu.controller.js.map