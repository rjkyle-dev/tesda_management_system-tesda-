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
exports.TrainingCentersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const training_centers_entity_1 = require("./training_centers.entity");
const entities_1 = require("../entities");
let TrainingCentersService = class TrainingCentersService {
    constructor(i_repository, q_repository, dataSource) {
        this.i_repository = i_repository;
        this.q_repository = q_repository;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.i_repository.createQueryBuilder("training_centers")
            .orderBy('training_centers.datetime_added', 'DESC')
            .getMany();
    }
    async getCount() {
        const total_cnt = await this.i_repository.createQueryBuilder("training_centers")
            .select("COUNT(training_centers.id)", "cnt")
            .getRawOne();
        return {
            total_cnt: total_cnt.cnt,
        };
    }
    async findItem(id) {
        return await this.i_repository.createQueryBuilder("training_centers")
            .leftJoinAndMapOne('training_centers.administrator_id', entities_1.UserEntity, 'admin_id', 'training_centers.administrator_id = admin_id.id')
            .leftJoinAndMapOne('admin_id.user_info', entities_1.UserProfileEntity, 'admin_info', 'admin_id.id = admin_info.user_id')
            .leftJoinAndMapOne('training_centers.sc_focal_id', entities_1.UserEntity, 'focal_id', 'training_centers.sc_focal_id = focal_id.id')
            .leftJoinAndMapOne('focal_id.user_info', entities_1.UserProfileEntity, 'focal_info', 'focal_id.id = focal_info.user_id')
            .where("training_centers.id = :id", { id: id })
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
            description: data.description,
            abbre: data.abbre,
            address: data.address,
            province: data.province,
            region: data.region,
            administrator_id: data.administrator_id,
            sc_focal_id: data.sc_focal_id,
            list_q_id: data.list_q_id,
            list_sc_id: data.list_sc_id
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
        return await this.i_repository.createQueryBuilder("training_centers")
            .where("training_centers.name LIKE :name OR training_centers.abbre LIKE :name", { name: `%${name}%` })
            .getMany();
    }
    async getAllByPage(page, limit, search_data) {
        var start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('training_centers');
        query.leftJoinAndMapOne('training_centers.tc_type_id', entities_1.TrainingCentersTypeEntity, 'tc_type', 'training_centers.tc_type_id = tc_type.id')
            .leftJoinAndMapOne('training_centers.administrator_id', entities_1.UserEntity, 'admin_id', 'training_centers.administrator_id = admin_id.id')
            .leftJoinAndMapOne('admin_id.user_info', entities_1.UserProfileEntity, 'admin_info', 'admin_id.id = admin_info.user_id')
            .leftJoinAndMapOne('training_centers.sc_focal_id', entities_1.UserEntity, 'focal_id', 'training_centers.sc_focal_id = focal_id.id')
            .leftJoinAndMapOne('focal_id.user_info', entities_1.UserProfileEntity, 'focal_info', 'focal_id.id = focal_info.user_id');
        const results = await query
            .orderBy('training_centers.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit);
        if (search_data?.value && search_data?.type === 'search') {
            query.andWhere('(training_centers.abbre LIKE :value OR training_centers.description LIKE :value)', {
                value: `%${search_data.value}%`
            });
        }
        return results.getManyAndCount();
    }
    async generateSummaryTrainingCenters(file_data) {
        const puppeteer = require('puppeteer');
        const fs = require('fs-extra');
        const hbs = require('handlebars');
        const path = require('path');
        let summaryData;
        summaryData = await this.getTrainingCenterSummaryData();
        file_data.summaryData = summaryData;
        const compile = async (templateName, data) => {
            const filePath = path.join(process.cwd(), '../templates', `${templateName}.hbs`);
            const html = await fs.readFile(filePath, 'utf-8');
            hbs.registerHelper('eq', function (a, b, options) {
                return a === b ? options.fn(this) : options.inverse(this);
            });
            return hbs.compile(html)(data);
        };
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const content = await compile('summary_training_centers', file_data);
            await page.setContent(content, { waitUntil: 'networkidle0' });
            const outputFolder = path.join(process.cwd(), '../summary_training_centers');
            await fs.ensureDir(outputFolder);
            const filePath = path.join(outputFolder, file_data.file_name);
            const buffer = await page.pdf({
                path: filePath,
                format: 'letter',
                landscape: false,
                printBackground: true,
                margin: {
                    top: '20mm',
                    bottom: '20mm',
                    left: '15mm',
                    right: '15mm',
                },
            });
            await browser.close();
            return buffer;
        }
        catch (e) {
            console.error('Error generating summary training centers PDF:', e);
            throw new Error('Error generating PDF report');
        }
    }
    async getTrainingCenterSummaryData() {
        const centers = await this.i_repository.find();
        const result = [];
        for (const center of centers) {
            if (!center.list_q_id)
                continue;
            const qIds = center.list_q_id
                .split(',')
                .map(id => parseInt(id.trim()))
                .filter(id => !isNaN(id));
            if (qIds.length === 0)
                continue;
            const qualifications = await this.q_repository
                .createQueryBuilder('q')
                .where('q.id IN (:...ids)', { ids: qIds })
                .getMany();
            const formattedQualifications = qualifications.map(q => ({
                qualification: q.description,
                duration: `${q.hrs}hrs`,
            }));
            result.push({
                trainingCenter: center.description,
                qualifications: formattedQualifications,
            });
        }
        return result;
    }
};
exports.TrainingCentersService = TrainingCentersService;
exports.TrainingCentersService = TrainingCentersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(training_centers_entity_1.TrainingCentersEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.QualificationsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TrainingCentersService);
//# sourceMappingURL=training_centers.service.js.map