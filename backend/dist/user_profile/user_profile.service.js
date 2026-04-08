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
exports.UserProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let UserProfileService = class UserProfileService {
    constructor(i_repository, dataSource) {
        this.i_repository = i_repository;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.i_repository.createQueryBuilder("user_profile")
            .orderBy('user_profile.datetime_added', 'DESC')
            .getMany();
    }
    async getCount() {
        const total_cnt = await this.i_repository.createQueryBuilder("user_profile")
            .select("COUNT(user_profile.id)", "cnt")
            .getRawOne();
        return {
            total_cnt: total_cnt.cnt,
        };
    }
    async findItem(id) {
        return await this.i_repository.createQueryBuilder("user_profile")
            .where("user_profile.id = :id", { id: id })
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
        return await this.i_repository.update({ user_id: data.user_id }, {
            fname: data.fname,
            mname: data.mname,
            lname: data.lname,
            phone_number: data.phone_number,
        });
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
        return await this.i_repository.createQueryBuilder("user_profile")
            .where("user_profile.name LIKE :name OR user_profile.abbre LIKE :name", { name: `%${name}%` })
            .getMany();
    }
    async getAllByPage(page, limit) {
        var start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('user_profile');
        query.leftJoinAndMapOne('user_profile.administrator_id', entities_1.UserEntity, 'admin_id', 'user_profile.administrator_id = admin_id.id')
            .leftJoinAndMapOne('user_profile.sc_focal_id', entities_1.UserEntity, 'focal_id', 'user_profile.sc_focal_id = focal_id.id');
        const results = await query
            .orderBy('user_profile.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit)
            .getManyAndCount();
        return results;
    }
};
exports.UserProfileService = UserProfileService;
exports.UserProfileService = UserProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UserProfileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UserProfileService);
//# sourceMappingURL=user_profile.service.js.map