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
exports.UserMenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_menu_entity_1 = require("./user_menu.entity");
let UserMenuService = class UserMenuService {
    constructor(i_repository, dataSource) {
        this.i_repository = i_repository;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.i_repository.createQueryBuilder("user_menu")
            .orderBy('user_menu.name', 'ASC')
            .getMany();
    }
    async getCount() {
        const total_cnt = await this.i_repository.createQueryBuilder("user_menu")
            .select("COUNT(user_menu.id)", "cnt")
            .getRawOne();
        return {
            total_cnt: total_cnt.cnt,
        };
    }
    async getAllByPage(page, limit) {
        var start_from = (page - 1) * limit;
        return await this.i_repository.createQueryBuilder("user_menu")
            .orderBy('user_menu.name', 'ASC')
            .skip(start_from)
            .take(limit)
            .getMany();
    }
    async findItem(id) {
        return await this.i_repository.createQueryBuilder("user_menu")
            .where("user_menu.id = :id", { id: id })
            .getOne();
    }
    async addItem(user) {
        return await this.i_repository.save(user);
    }
    async editItem(data) {
        return await this.i_repository.update(data.id, {
            name: data.name,
            link: data.link,
            title: data.title,
            profile_pic: data.profile_pic,
            isTitle: data.isTitle,
            description: data.description,
            isMenu: data.isMenu
        });
    }
    async deleteItem(data) {
        return await this.i_repository.delete(data.id);
    }
    async searchName(name) {
        return await this.i_repository.createQueryBuilder("user_menu")
            .where("user_menu.name LIKE :name OR user_menu.abbre LIKE :name", { name: `%${name}%` })
            .getMany();
    }
    async getAllPage(page, limit) {
        var start_from = (page - 1) * limit;
        return await this.i_repository.createQueryBuilder("user_menu")
            .orderBy('user_menu.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit)
            .getMany();
    }
};
exports.UserMenuService = UserMenuService;
exports.UserMenuService = UserMenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_menu_entity_1.UserMenuEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UserMenuService);
//# sourceMappingURL=user_menu.service.js.map