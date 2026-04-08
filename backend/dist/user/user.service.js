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
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt_1 = require("../utils/bcrypt");
const user_types_entity_1 = require("../user_types/user_types.entity");
const entities_1 = require("../entities");
let UserService = class UserService {
    constructor(i_repository, dataSource) {
        this.i_repository = i_repository;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.i_repository.createQueryBuilder("user")
            .leftJoinAndMapOne('user.id', entities_1.UserProfileEntity, 'user_profile', 'user.id = user_profile.user_id')
            .orderBy('user_profile.lname', 'ASC')
            .getMany();
    }
    async getAllByType(isActive) {
        return await this.i_repository.createQueryBuilder("user")
            .where('user.isActive = :isActive', { isActive: isActive })
            .orderBy('user.lname', 'ASC')
            .getMany();
    }
    async getCount() {
        const total_cnt = await this.i_repository.createQueryBuilder("user")
            .select("COUNT(user.id)", "cnt")
            .getRawOne();
        return {
            total_cnt: total_cnt.cnt,
        };
    }
    async getAllByPage(type, page, limit, search_data) {
        var start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('user');
        query.leftJoinAndMapOne('user.ut_id', user_types_entity_1.UserTypesEntity, 'user_type', 'user.ut_id = user_type.id')
            .leftJoinAndMapOne('user.user_profile', entities_1.UserProfileEntity, 'up', 'user.id = up.user_id');
        const results = await query
            .where('user.ut_id = :type', { type: type })
            .orderBy('user.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit);
        if (search_data?.value && search_data?.type === 'search') {
            query.andWhere('(up.fname LIKE :value OR up.mname LIKE :value OR up.lname LIKE :value OR user.email LIKE :value OR up.phone_number LIKE :value)', {
                value: `%${search_data.value}%`
            });
        }
        return results.getManyAndCount();
    }
    async getAllByPageType(ut_id, page, limit) {
        var start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('user');
        query.leftJoinAndMapOne('user.ut_id', user_types_entity_1.UserTypesEntity, 'user_type', 'user.ut_id = user_type.id')
            .leftJoinAndMapOne('user.user_profile', entities_1.UserProfileEntity, 'up', 'user.id = up.user_id')
            .where('user.ut_id = :ut_id', { ut_id: ut_id });
        const results = await query
            .orderBy('user.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit)
            .getManyAndCount();
        return results;
    }
    async findUser(id) {
        return await this.i_repository.createQueryBuilder("user")
            .leftJoinAndMapOne('user.ut_id', user_types_entity_1.UserTypesEntity, 'user_type', 'user.ut_id = user_type.id')
            .leftJoinAndMapOne('user.user_profile', entities_1.UserProfileEntity, 'up', 'user.id = up.user_id')
            .where("user.id = :id", { id: id })
            .getOne();
    }
    async searchNameByPage(page, limit, name) {
        var start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('user');
        query.leftJoinAndMapOne('user.ut_id', user_types_entity_1.UserTypesEntity, 'user_type', 'user.ut_id = user_type.id')
            .where("user.lname LIKE :name OR user.fname LIKE :name", { name: `%${name}%` });
        const results = await query
            .orderBy('user.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit)
            .getManyAndCount();
        return results;
    }
    async searchName(name) {
        return await this.i_repository.createQueryBuilder("user")
            .leftJoinAndMapOne('user.ut_id', user_types_entity_1.UserTypesEntity, 'user_type', 'user.ut_id = user_type.id')
            .where("user.lname LIKE :name OR user.fname LIKE :name AND user.isActive = 1", { name: `%${name}%` })
            .getMany();
    }
    async findTypeofUser(name) {
        return await this.i_repository.createQueryBuilder("user")
            .leftJoinAndMapOne('user.ut_id', user_types_entity_1.UserTypesEntity, 'user_type', 'user.ut_id = user_type.id')
            .where("user.isActive = 1 AND user_type.description = :name", { name: name })
            .getOne();
    }
    async registerUser(user) {
        const password = (0, bcrypt_1.encodePassword)(user.password);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const savedUser = await this.i_repository.save({ ...user, password });
            await queryRunner.commitTransaction();
            return savedUser;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    checkEmailExisted(email) {
        return this.i_repository.createQueryBuilder("user")
            .leftJoinAndMapOne('user.ut_id', user_types_entity_1.UserTypesEntity, 'user_type', 'user.ut_id = user_type.id')
            .leftJoinAndMapOne('user.user_info', entities_1.UserProfileEntity, 'user_profile', 'user.id = user_profile.user_id')
            .leftJoinAndMapOne('user.tc_id', entities_1.TrainingCentersEntity, 'training_center', 'user.tc_id = training_center.id')
            .where("user.email  = :email", { email: email })
            .getOne();
    }
    async checkIfApproved(email) {
        return await this.i_repository.createQueryBuilder("user")
            .select(["user"])
            .where("user.email  = :email AND user.isApproved = :isApproved", { email: email, isApproved: 1 })
            .getOne();
    }
    async checkIfActive(email) {
        return await this.i_repository.createQueryBuilder("user")
            .select(["user"])
            .where("user.email  = :email AND user.isActive = :isActive", { email: email, isActive: 1 })
            .getOne();
    }
    async updateProfilePic(data) {
        return await this.i_repository.update(data.id, {
            profile_pic: data.profile_pic,
        });
    }
    async editUser(data) {
        return await this.i_repository.update(data.id, {
            tc_id: data.tc_id,
            email: data.email,
        });
    }
    async saveEsign(userId, filename) {
        const user = await this.i_repository.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException();
        user.e_sign = filename;
        return this.i_repository.save(user);
    }
    async saveProfPic(userId, filename) {
        const user = await this.i_repository.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException();
        user.profile_pic = filename;
        return this.i_repository.save(user);
    }
    async editEmail(data) {
        return await this.i_repository.update(data.id, {
            email: data.email,
        });
    }
    async editPassword(data) {
        const { id, old_pw, new_pw, confirm_pw } = data;
        const user = await this.i_repository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const matched = await (0, bcrypt_1.comparePassword)(old_pw, user.password);
        if (!matched) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        if (new_pw !== confirm_pw) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const hashedPassword = await (0, bcrypt_1.encodePassword)(new_pw);
        await this.i_repository.update(id, {
            password: hashedPassword,
        });
        return {
            message: 'Password updated successfully',
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], UserService);
//# sourceMappingURL=user.service.js.map