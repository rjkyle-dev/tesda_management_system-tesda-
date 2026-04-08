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
exports.TraineesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let TraineesService = class TraineesService {
    constructor(i_repository, dataSource) {
        this.i_repository = i_repository;
        this.dataSource = dataSource;
    }
    async getAll() {
        return await this.i_repository.createQueryBuilder("trainees")
            .orderBy('trainees.datetime_added', 'DESC')
            .getMany();
    }
    async getCount() {
        const total_cnt = await this.i_repository.createQueryBuilder("trainees")
            .select("COUNT(trainees.id)", "cnt")
            .getRawOne();
        return {
            total_cnt: total_cnt.cnt,
        };
    }
    async findItem(id) {
        return await this.i_repository.createQueryBuilder("trainees")
            .leftJoinAndMapOne('trainees.ctrl_num', entities_1.BillingRecordsEntity, 'br', 'trainees.ctrl_num = br.ctrl_num')
            .where("trainees.id = :id", { id: id })
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
            fname: data.fname,
            mname: data.mname,
            lname: data.lname,
            extension: data.extension,
            sg_number: data.sg_number,
            training_cost: data.training_cost,
            ctrl_num: data.ctrl_num,
            bt_id: data.bt_id,
            status: data.status,
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
        return await this.i_repository.createQueryBuilder("trainees")
            .where("trainees.fname LIKE :name OR trainees.mname LIKE :name OR trainees.lname LIKE :name", { name: `%${name}%` })
            .getMany();
    }
    async getAllByPage(page, limit) {
        var start_from = (page - 1) * limit;
        const query = this.i_repository.createQueryBuilder('trainees');
        query.leftJoinAndMapOne('trainees.ctrl_num', entities_1.BillingRecordsEntity, 'br', 'trainees.ctrl_num = br.ctrl_num');
        const results = await query
            .orderBy('trainees.lname', 'DESC')
            .skip(start_from)
            .take(limit)
            .getManyAndCount();
        return results;
    }
    async findTraineesByCtrlNum(ctrl_num, bt_id) {
        return await this.i_repository.createQueryBuilder("trainees")
            .leftJoinAndMapOne('trainees.ctrl_num', entities_1.BillingRecordsEntity, 'br', 'trainees.ctrl_num = br.ctrl_num')
            .where("trainees.ctrl_num = :ctrl_num AND trainees.bt_id = :bt_id", { ctrl_num: ctrl_num, bt_id: bt_id })
            .getMany();
    }
    async addMany(trainees) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const res = await queryRunner.manager.save(entities_1.TraineesEntity, trainees);
            await queryRunner.commitTransaction();
            return res;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateMany(trainees) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            for (const t of trainees) {
                await this.i_repository.update({ id: t.id, ctrl_num: t.ctrl_num }, {
                    fname: t.fname,
                    mname: t.mname,
                    lname: t.lname,
                    extension: t.extension,
                    sg_number: t.sg_number,
                    training_cost: t.training_cost,
                    status: t.status,
                });
                await this.i_repository
                    .createQueryBuilder()
                    .update(entities_1.TraineesEntity)
                    .set({ status: t.status, training_cost: t.training_cost })
                    .where('sg_number = :sg_number', { sg_number: t.sg_number })
                    .andWhere('ctrl_num = :ctrl_num', { ctrl_num: t.ctrl_num })
                    .andWhere('id > :id', { id: t.id })
                    .execute();
            }
            await queryRunner.commitTransaction();
            return { message: 'Trainees updated successfully' };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getTraineesSummary(ctrl_num) {
        const trainees = await this.i_repository
            .createQueryBuilder('trainees')
            .leftJoin('billing_records', 'br', 'trainees.ctrl_num = br.ctrl_num')
            .leftJoin('billing_types', 'bt', 'trainees.bt_id = bt.id')
            .where('trainees.ctrl_num = :ctrl_num', { ctrl_num })
            .select([
            'trainees.fname AS trainees_fname',
            'trainees.mname AS trainees_mname',
            'trainees.lname AS trainees_lname',
            'trainees.extension AS trainees_extension',
            'trainees.status AS trainees_status',
            'trainees.bt_id AS bt_id',
            'trainees.training_cost AS trainees_training_cost',
            'MAX(trainees.date_dropped) AS trainees_date_dropped',
            'bt.id AS bt_id',
            'bt.abbre AS bt_abbre',
        ])
            .groupBy(`
            trainees.fname,
            trainees.mname,
            trainees.lname,
            trainees.extension,
            trainees.status,
            trainees.bt_id,
            trainees.training_cost,
            bt.id,
            bt.abbre
        `)
            .getRawMany();
        const traineeBtIds = [...new Set(trainees.map(t => t.bt_id))];
        const billingTypes = await this.i_repository.manager
            .createQueryBuilder()
            .select(['bt.id AS id', 'bt.abbre AS abbre'])
            .from('billing_types', 'bt')
            .where('bt.id IN (:...ids)', { ids: traineeBtIds })
            .getRawMany();
        const grouped = {};
        trainees.forEach(t => {
            const fullName = `${t.trainees_fname} ${t.trainees_mname || ''} ${t.trainees_lname} ${t.trainees_extension || ''}`
                .replace(/\s+/g, ' ')
                .trim();
            if (!grouped[fullName]) {
                grouped[fullName] = {
                    fullName,
                    bt_costs: {},
                    status: t.trainees_status,
                    date_dropped: t.trainees_date_dropped,
                };
            }
            if (!grouped[fullName].date_dropped && t.trainees_date_dropped) {
                grouped[fullName].date_dropped = t.trainees_date_dropped;
            }
            if (t.bt_id) {
                grouped[fullName].bt_costs[`bt_${t.bt_id}`] = t.trainees_training_cost;
            }
        });
        const headers = billingTypes.map(bt => ({
            id: `bt_${bt.id}`,
            description: bt.abbre,
        }));
        const data = Object.values(grouped).map((t) => {
            const result = {
                fullName: t.fullName,
                status: t.status,
                date_dropped: t.date_dropped,
            };
            let hasZeroCost = false;
            headers.forEach(h => {
                const cost = t.bt_costs[h.id] ?? 0;
                result[h.id] = cost;
                if (cost === 0) {
                    hasZeroCost = true;
                }
            });
            if (hasZeroCost) {
                result.status = 'dropped';
                result.date_dropped = t.date_dropped;
            }
            return result;
        });
        return { headers, data };
    }
};
exports.TraineesService = TraineesService;
exports.TraineesService = TraineesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.TraineesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], TraineesService);
//# sourceMappingURL=trainees.service.js.map