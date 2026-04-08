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
exports.InsightsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const insights_entity_1 = require("./insights.entity");
let InsightsService = class InsightsService {
    constructor(i_repository, dataSource) {
        this.i_repository = i_repository;
        this.dataSource = dataSource;
    }
    async getAll() {
        const rows = await this.dataSource.query('SELECT id, from_score, to_score, description, report_name FROM insights ORDER BY id ASC');
        return rows.map((row) => ({
            id: Number(row.id),
            from_score: row.from_score != null ? Number(row.from_score) : 0,
            to_score: row.to_score != null ? Number(row.to_score) : 0,
            description: row.description ?? '',
            report_name: row.report_name ?? '',
        }));
    }
    async getCount() {
        const total_cnt = await this.i_repository.createQueryBuilder("insights")
            .select("COUNT(insights.id)", "cnt")
            .getRawOne();
        return {
            total_cnt: total_cnt.cnt,
        };
    }
    async findItem(id) {
        return await this.i_repository.createQueryBuilder("insights")
            .where("insights.id = :id", { id: id })
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
        return await this.i_repository.update(data.id, {
            from_score: data.from_score,
            to_score: data.to_score,
            description: data.description,
            report_name: data.report_name,
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
        return await this.i_repository.createQueryBuilder("insights")
            .where("insights.fname LIKE :name OR insights.mname LIKE :name OR insights.lname LIKE :name", { name: `%${name}%` })
            .getMany();
    }
    async getDescription(score, report_name) {
        let result = await this.i_repository
            .createQueryBuilder('insights')
            .where('insights.report_name = :report_name', { report_name })
            .andWhere('insights.from_score <= :score AND insights.to_score >= :score', { score })
            .getOne();
        if (!result) {
            result = await this.i_repository
                .createQueryBuilder('insights')
                .where('insights.report_name = :report_name', { report_name })
                .orderBy('insights.from_score', 'ASC')
                .getOne();
        }
        return result;
    }
};
exports.InsightsService = InsightsService;
exports.InsightsService = InsightsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(insights_entity_1.InsightsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], InsightsService);
//# sourceMappingURL=insights.service.js.map