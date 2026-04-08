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
exports.UserTypeMenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_type_menu_entity_1 = require("./user_type_menu.entity");
const entities_1 = require("../entities");
let UserTypeMenuService = class UserTypeMenuService {
    constructor(i_repository, dataSource) {
        this.i_repository = i_repository;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.i_repository.createQueryBuilder("user_menu_type")
            .orderBy('user_menu_type.datetime_added', 'DESC')
            .getMany();
    }
    async getCount() {
        const total_cnt = await this.i_repository.createQueryBuilder("user_menu_type")
            .select("COUNT(user_menu_type.id)", "cnt")
            .getRawOne();
        return {
            total_cnt: total_cnt.cnt,
        };
    }
    async getAllByPage(page, limit) {
        var start_from = (page - 1) * limit;
        return await this.i_repository.createQueryBuilder("user_menu_type")
            .orderBy('user_menu_type.datetime_added', 'ASC')
            .skip(start_from)
            .take(limit)
            .getMany();
    }
    async findItem(id) {
        return await this.i_repository.createQueryBuilder("user_menu_type")
            .where("user_menu_type.id = :id", { id: id })
            .getOne();
    }
    async addItem(user) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const res = this.i_repository.save(user);
            await queryRunner.commitTransaction();
            return res;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async editItem(data) {
    }
    async assignChild(data) {
        if (data.type == 1) {
            return await this.i_repository.update(data.id, {
                parent_id: data.parent_id,
                position: data.position
            });
        }
        else {
            return await this.i_repository.update(data.id, {
                parent_id: 0,
                position: 1,
            });
        }
    }
    async deleteItem(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const res = this.i_repository.delete(data.id);
            await queryRunner.commitTransaction();
            return res;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    async searchName(name) {
        return await this.i_repository.createQueryBuilder("user_menu_type")
            .where("user_menu_type.name LIKE :name OR user_menu_type.abbre LIKE :name", { name: `%${name}%` })
            .getMany();
    }
    async getMenu(id) {
        return await this.i_repository.createQueryBuilder("user_menu_type")
            .leftJoinAndMapOne('user_menu_type.um_id', entities_1.UserMenuEntity, 'menu', 'user_menu_type.um_id = menu.id')
            .where("user_menu_type.ut_id = :id", { id: id })
            .andWhere("menu.isMenu = 1")
            .getMany();
    }
    async checkPrivilege(data) {
        const check_data = await this.i_repository.createQueryBuilder("user_menu_type")
            .select("COUNT(user_menu_type.id)", "cnt")
            .leftJoinAndMapOne('user_menu_type.um_id', entities_1.UserMenuEntity, 'menu', 'user_menu_type.um_id = menu.id')
            .where("user_menu_type.ut_id = :ut_id AND menu.link = :link", { ut_id: data.ut_id, link: data.link })
            .getRawOne();
        return {
            check_data: check_data.cnt,
        };
    }
    async searchNameNav(name, ut_id) {
        return await this.i_repository.createQueryBuilder("user_menu_type")
            .leftJoinAndMapOne('user_menu_type.um_id', entities_1.UserMenuEntity, 'menu', 'user_menu_type.um_id = menu.id')
            .where("menu.name LIKE :name AND user_menu_type.ut_id = :ut_id", { name: `%${name}%`, ut_id: ut_id })
            .getMany();
    }
    async getListDataClick(ut_id) {
        return await this.i_repository.createQueryBuilder("user_menu_type")
            .leftJoinAndMapOne('user_menu_type.um_id', entities_1.UserMenuEntity, 'menu', 'user_menu_type.um_id = menu.id')
            .where("user_menu_type.ut_id = :ut_id", { ut_id: ut_id })
            .orderBy('menu.name', 'ASC')
            .getMany();
    }
};
exports.UserTypeMenuService = UserTypeMenuService;
exports.UserTypeMenuService = UserTypeMenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_type_menu_entity_1.UserTypeMenuEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UserTypeMenuService);
//# sourceMappingURL=user_type_menu.service.js.map