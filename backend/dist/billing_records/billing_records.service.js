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
exports.BillingRecordsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const billing_records_entity_1 = require("./billing_records.entity");
const entities_1 = require("../entities");
let BillingRecordsService = class BillingRecordsService {
    constructor(i_repository, dataSource) {
        this.i_repository = i_repository;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.i_repository.createQueryBuilder("billing_records")
            .orderBy('billing_records.datetime_added', 'DESC')
            .getMany();
    }
    async getCount() {
        const total_cnt = await this.i_repository.createQueryBuilder("billing_records")
            .select("COUNT(billing_records.id)", "cnt")
            .getRawOne();
        return {
            total_cnt: total_cnt.cnt,
        };
    }
    async findItem(id) {
        return await this.i_repository.createQueryBuilder("billing_records")
            .leftJoinAndMapOne('billing_records.tc_id', entities_1.TrainingCentersEntity, 'training_center', 'billing_records.tc_id = training_center.id')
            .leftJoinAndMapOne('billing_records.sc_id', entities_1.ScholarshipsEntity, 'scholarship', 'billing_records.sc_id = scholarship.id')
            .leftJoinAndMapOne('billing_records.q_id', entities_1.QualificationsEntity, 'qualification', 'billing_records.q_id = qualification.id')
            .where("billing_records.id = :id", { id: id })
            .getOne();
    }
    async addItem(user) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const savedRecord = await queryRunner.manager.save(billing_records_entity_1.BillingRecordsEntity, user);
            const notification = queryRunner.manager.create(entities_1.NotificationsEntity, {
                title: 'New Billing Submission',
                message: `A new billing record has been submitted: ${savedRecord.ctrl_num}`,
                type: 'billing_submission',
                reference_id: savedRecord.id,
                reference_type: 'billing',
                created_by: user.uploaded_by,
                datetime_created: new Date(),
            });
            await queryRunner.manager.save(notification);
            await queryRunner.commitTransaction();
            return savedRecord;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async editItem(data) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(billing_records_entity_1.BillingRecordsEntity, data.id, {
                ctrl_num: data.ctrl_num,
                tc_id: data.tc_id,
                sc_id: data.sc_id,
                q_id: data.q_id,
                batch_name: data.batch_name,
                num_pax: data.num_pax,
                billed_amount: data.billed_amount,
                remarks: data.remarks,
                status_id: data.status_id,
                datetime_received: data.datetime_received,
                datetime_billed: data.datetime_billed,
                date_end: data.date_end,
                date_start: data.date_start,
                fiscal_yr: data.fiscal_yr,
            });
            const updatedRecord = await queryRunner.manager.findOne(billing_records_entity_1.BillingRecordsEntity, { where: { id: data.id } });
            const notification = queryRunner.manager.create(entities_1.NotificationsEntity, {
                title: 'Billing Record Updated',
                message: `Billing record ${updatedRecord.ctrl_num} has been updated.`,
                type: 'billing_update',
                reference_id: updatedRecord.id,
                reference_type: 'billing',
                created_by: updatedRecord.uploaded_by,
                datetime_added: new Date().toISOString(),
            });
            await queryRunner.manager.save(notification);
            await queryRunner.commitTransaction();
            return updatedRecord;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
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
        return await this.i_repository.createQueryBuilder("billing_records")
            .where("billing_records.name LIKE :name OR billing_records.abbre LIKE :name", { name: `%${name}%` })
            .getMany();
    }
    async getAllByPage(page, limit, status, search_data) {
        const start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('billing_records')
            .leftJoinAndMapOne('billing_records.tc_id', entities_1.TrainingCentersEntity, 'training_center', 'billing_records.tc_id = training_center.id')
            .leftJoinAndMapOne('billing_records.q_id', entities_1.QualificationsEntity, 'qualification', 'billing_records.q_id = qualification.id')
            .leftJoinAndMapOne('billing_records.current_billing', entities_1.BillingPeriodsEntity, 'billing_period', `billing_period.id = (
                        SELECT bp.id
                        FROM billing_periods bp
                        WHERE bp.ctrl_num = billing_records.ctrl_num
                        AND (bp.status IS NULL OR bp.status = 0)
                        ORDER BY bp.id ASC
                        LIMIT 1
                    )`)
            .orderBy('billing_records.datetime_added', 'DESC')
            .where('billing_records.isWorkback = 0')
            .andWhere('billing_records.status_id = :status', { status: status })
            .skip(start_from)
            .take(limit);
        if (status === 1) {
            query.andWhere('billing_period.id IS NOT NULL');
        }
        if (status === 3) {
            query.andWhere('billing_period.id IS NULL');
        }
        if (search_data?.value && search_data?.type === 'search') {
            query.andWhere('(billing_records.ctrl_num LIKE :value OR billing_records.batch_name LIKE :value)', {
                value: `%${search_data.value}%`,
            });
        }
        return await query.getManyAndCount();
    }
    async getAllByPageType(isWorkback, page, limit) {
        const start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('billing_records')
            .leftJoinAndMapOne('billing_records.tc_id', entities_1.TrainingCentersEntity, 'training_center', 'billing_records.tc_id = training_center.id')
            .leftJoinAndMapOne('billing_records.q_id', entities_1.QualificationsEntity, 'qualification', 'billing_records.q_id = qualification.id')
            .leftJoinAndMapOne('billing_records.current_billing', entities_1.BillingPeriodsEntity, 'billing_period', `billing_period.id = (
                    SELECT bp.id
                    FROM billing_periods bp
                    WHERE bp.ctrl_num = billing_records.ctrl_num
                    AND (bp.status IS NULL OR bp.status = 0)
                    ORDER BY bp.id ASC
                    LIMIT 1
                )`)
            .where('billing_records.isWorkback = :isWorkback', { isWorkback })
            .orderBy('billing_records.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit);
        const results = await query.getManyAndCount();
        return results;
    }
    async getAllByPageTypeUser(tc_id, isWorkback, page, limit, status, search_data) {
        const start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('billing_records')
            .leftJoinAndMapOne('billing_records.tc_id', entities_1.TrainingCentersEntity, 'training_center', 'billing_records.tc_id = training_center.id')
            .leftJoinAndMapOne('billing_records.q_id', entities_1.QualificationsEntity, 'qualification', 'billing_records.q_id = qualification.id')
            .leftJoinAndMapOne('billing_records.current_billing', entities_1.BillingPeriodsEntity, 'billing_period', `billing_period.id = (
                    SELECT bp.id
                    FROM billing_periods bp
                    WHERE bp.ctrl_num = billing_records.ctrl_num
                    AND (bp.status IS NULL OR bp.status = 0)
                    ORDER BY bp.id ASC
                    LIMIT 1
                )`)
            .where('billing_records.isWorkback = :isWorkback', { isWorkback })
            .andWhere('billing_records.tc_id = :tc_id', { tc_id })
            .andWhere('billing_records.status_id = :status', { status })
            .orderBy('billing_records.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit);
        if (search_data?.value && search_data?.type === 'search') {
            query.andWhere('(billing_records.ctrl_num LIKE :value OR billing_records.batch_name LIKE :value)', {
                value: `%${search_data.value}%`
            });
        }
        return await query.getManyAndCount();
    }
    async updateStatus(data) {
        if (data.status_id === 1) {
            return await this.i_repository.update(data.id, {
                status_id: data.status_id,
                remarks: data.remarks,
            });
        }
        else {
            return await this.i_repository.update(data.id, {
                status_id: data.status_id,
                remarks: data.remarks,
            });
        }
    }
};
exports.BillingRecordsService = BillingRecordsService;
exports.BillingRecordsService = BillingRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(billing_records_entity_1.BillingRecordsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], BillingRecordsService);
//# sourceMappingURL=billing_records.service.js.map