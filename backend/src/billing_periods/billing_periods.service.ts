import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { BillingPeriodsEntity } from './billing_periods.entity';
import { BillingRecordsEntity, BillingTypesEntity, NotificationsEntity, QualificationsEntity, ScholarshipsEntity, TraineesEntity, TrainingCentersEntity } from 'src/entities';
import { title } from 'process';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs-extra';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsRecipientsService } from 'src/notifications_recipients/notifications_recipients.service';
import { NotificationsRecipientsEntity } from 'src/notifications_recipients/notifications_recipients.entity';

@Injectable()
export class BillingPeriodsService {
    constructor(
        @InjectRepository(BillingPeriodsEntity)
        private readonly i_repository: Repository<BillingPeriodsEntity>,
        private readonly i_notification: NotificationsService,
        private readonly i_notificationRecipients: NotificationsRecipientsService,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("billing_periods")
        .leftJoinAndMapOne('billing_periods.bt_id',BillingTypesEntity,'billing_type','billing_periods.bt_id = billing_type.id')
        .leftJoinAndMapOne('billing_periods.sc_id',ScholarshipsEntity,'scholar_type','billing_periods.sc_id = scholar_type.id')
        .leftJoinAndMapOne('billing_periods.other_info',BillingRecordsEntity,'billing_record','billing_periods.ctrl_num = billing_record.ctrl_num')
        .leftJoinAndMapOne('billing_record.q_id',QualificationsEntity,'qualification','billing_record.q_id = qualification.id')
        .leftJoinAndMapOne('billing_record.tc_id',TrainingCentersEntity,'training_center','billing_record.tc_id = training_center.id')
        // .orderBy('billing_periods.datetime_added', 'DESC')
        .getMany();
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("billing_periods")
        .select("COUNT(billing_periods.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("billing_periods")
        .where("billing_periods.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: BillingPeriodsEntity) : Promise<BillingPeriodsEntity>{

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try{

        const res = this.i_repository.save(user);
        await queryRunner.commitTransaction();
        return res;
        
        } catch (err) {
        await queryRunner.rollbackTransaction();
        } finally {
        await queryRunner.release();
        }
    
    }

    async editItem(data: any) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // 1️⃣ Update the billing record
        const result = await queryRunner.manager.update(
            BillingPeriodsEntity, // replace with the correct entity if needed
            { id: data.id },
            {
                user_id: data.user_id,
                datetime_submit: data.datetime_submit,
                uploaded_file: data.uploaded_file,
                status: data.status,
                total_utilized: data.total_utilized,
                total_unutilized: data.total_unutilized,
                total_dropped: data.total_dropped,
                datetime_due: data.datetime_due,
            }
        );

        if (!result.affected) {
            throw new NotFoundException('Record not found');
        }

        // 2️⃣ Create notification
        const notification = queryRunner.manager.create(NotificationsEntity, {
            title: 'Billing Record Updated',
            message: `You have updated billing record: ${data.ctrl_num}`,
            type: 'billing_update',
            reference_id: data.id,
            reference_type: 'billing',
            created_by: data.user_id, // whoever performed the update
            datetime_created: data.datetime_submit,
        });

        const savedNotification = await queryRunner.manager.save(notification);

        // 3️⃣ Add recipient(s)
        const recipient = queryRunner.manager.create(NotificationsRecipientsEntity, {
            notification_id: savedNotification.id,
            user_id: data.user_id, // the same user gets notified
        });

        await queryRunner.manager.save(recipient);

        // 4️⃣ Commit transaction
        await queryRunner.commitTransaction();

        return { message: 'Billing record updated successfully' };

    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
}



      async deleteItem(data:any){

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try{

        const res = this.i_repository.delete(data.id);
        await queryRunner.commitTransaction();
        return res;
        
        } catch (err) {
        await queryRunner.rollbackTransaction();
        } finally {
        await queryRunner.release();
        }

        
        }

        async searchName(name : string){

            return await this.i_repository.createQueryBuilder("billing_periods")
            .where("billing_periods.description LIKE :description OR billing_periods.abbre LIKE :name", {name : `%${name}%`})
            .getMany();
        }

        async getAllByPage(page: number, limit : number){
        
            var start_from = (page-1) * limit;
        
            const query = this.i_repository.createQueryBuilder('billing_periods');
        
            const results = await query
            .orderBy('billing_periods.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit) 
            .getManyAndCount();
        
            return results;
        }

        async findCtrlNum(ctrl_num : string){

            return await this.i_repository.createQueryBuilder("billing_periods")
            .leftJoinAndMapOne('billing_periods.bt_id',BillingTypesEntity,'billing_type','billing_periods.bt_id = billing_type.id')
            .leftJoinAndMapMany('billing_periods.list_trainees',TraineesEntity,'trainees','billing_periods.bt_id = trainees.bt_id AND billing_periods.ctrl_num = trainees.ctrl_num')
            .where("billing_periods.ctrl_num = :ctrl_num", {ctrl_num : ctrl_num})
            .getMany();
        }

        private mapStatus(status: number): string {
    switch (status) {
        case 1:
            return 'verified.';
        case 0:
            return 'pending.';
        case 2:
        case 3:
            return 'for revision. Please check remarks.';
        default:
            return 'unknown.';
    }
}

    async updateStatus(data: any) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // 1️⃣ Update the billing/status record
        const result = await queryRunner.manager.update(
            BillingPeriodsEntity,
            { id: data.id },
            {
                status: data.status,
                datetime_actioned: data.datetime_actioned,
                remarks: data.remarks,
            }
        );

        if (!result.affected) {
            throw new NotFoundException('Record not found');
        }

        // 2️⃣ Create notification
        const notification = queryRunner.manager.create(NotificationsEntity, {
            title: 'Billing Update Status',
            message: `Status updated to ${this.mapStatus(data.status)}`,
            type: 'billing_status',
            reference_id: data.id,
            reference_type: 'billing',
            created_by: data.user_id,
            datetime_created: data.datetime_actioned,
        });

        const savedNotification = await queryRunner.manager.save(notification);

        // 3️⃣ Add recipient
        const recipient = queryRunner.manager.create(NotificationsRecipientsEntity, {
            notification_id: savedNotification.id,
            user_id: data.user_id,
        });

        await queryRunner.manager.save(recipient);

        // 4️⃣ Commit transaction
        await queryRunner.commitTransaction();

        return { message: 'Status updated successfully' };

    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
}



        async getStatistics(tc_id : number, fiscal_yr : string){


            const total_payment = await this.i_repository.createQueryBuilder("billing_periods")
            .leftJoinAndMapOne('billing_periods.ctrl_num',BillingRecordsEntity,'billing_record','billing_periods.ctrl_num = billing_record.ctrl_num')
            .select("SUM(billing_periods.total_payment)", "cnt")
            .where("billing_record.tc_id = :tc_id", {tc_id : tc_id})
            .andWhere("billing_periods.status = 1")
            .andWhere("billing_record.fiscal_yr = :fiscal_yr", {fiscal_yr})
            .getRawOne();

            const total_utilized = await this.i_repository.createQueryBuilder("billing_periods")
            .leftJoinAndMapOne('billing_periods.ctrl_num',BillingRecordsEntity,'billing_record','billing_periods.ctrl_num = billing_record.ctrl_num')
            .select("SUM(billing_periods.total_utilized)", "cnt")
            .where("billing_record.tc_id = :tc_id", {tc_id : tc_id})
            .andWhere("billing_periods.status = 1")
            .andWhere("billing_record.fiscal_yr = :fiscal_yr", {fiscal_yr})
            .getRawOne();

            const total_unutilized = await this.i_repository.createQueryBuilder("billing_periods")
            .leftJoinAndMapOne('billing_periods.ctrl_num',BillingRecordsEntity,'billing_record','billing_periods.ctrl_num = billing_record.ctrl_num')
            .select("SUM(billing_periods.total_unutilized)", "cnt")
            .where("billing_record.tc_id = :tc_id", {tc_id : tc_id})
            .andWhere("billing_periods.status = 1")
            .andWhere("billing_record.fiscal_yr = :fiscal_yr", {fiscal_yr})
            .getRawOne();

            const total_pending = await this.i_repository.createQueryBuilder("billing_periods")
            .leftJoinAndMapOne('billing_periods.ctrl_num',BillingRecordsEntity,'billing_record','billing_periods.ctrl_num = billing_record.ctrl_num')
            .select("COUNT(billing_periods.id)", "cnt")
            .where("billing_record.tc_id = :tc_id", {tc_id : tc_id})
            .andWhere("(billing_periods.status = 0 OR billing_periods.status IS NULL)")
            .andWhere("billing_record.fiscal_yr = :fiscal_yr", {fiscal_yr})
            .getRawOne();

            const total_submitted = await this.i_repository.createQueryBuilder("billing_periods")
            .leftJoinAndMapOne('billing_periods.ctrl_num',BillingRecordsEntity,'billing_record','billing_periods.ctrl_num = billing_record.ctrl_num')
            .select("COUNT(billing_periods.id)", "cnt")
            .where("billing_record.tc_id = :tc_id", {tc_id : tc_id})
            .andWhere("billing_periods.status = 1")
            .andWhere("billing_record.fiscal_yr = :fiscal_yr", {fiscal_yr})
            .andWhere("billing_periods.datetime_submit IS NOT NULL")
            .getRawOne();

           const total_implemented = await this.i_repository
            .createQueryBuilder("billing_periods")
            .leftJoinAndMapOne(
                "billing_periods.ctrl_num",
                BillingRecordsEntity,
                "billing_record",
                "billing_periods.ctrl_num = billing_record.ctrl_num"
            )
            .select("COUNT(DISTINCT billing_record.tc_id)", "cnt")
            .where("billing_record.tc_id = :tc_id", { tc_id })
            .andWhere("billing_periods.status = 1")
            .andWhere("billing_record.fiscal_yr = :fiscal_yr", { fiscal_yr })
            .getRawOne();


        
            return {
            total_unutilized : total_unutilized.cnt,
            total_utilized : total_utilized.cnt,
            total_payment : total_payment.cnt,
            total_pending : total_pending.cnt,
            total_submitted : total_submitted.cnt,
            total_implemented : total_implemented.cnt
            };
        }

        async getAllByMonth(month : number){

            const currentYear = new Date().getFullYear();

        return await this.i_repository.createQueryBuilder("billing_periods")
        .leftJoinAndMapOne('billing_periods.bt_id',BillingTypesEntity,'billing_type','billing_periods.bt_id = billing_type.id')
        .leftJoinAndMapOne('billing_periods.sc_id',ScholarshipsEntity,'scholar_type','billing_periods.sc_id = scholar_type.id')
        .leftJoinAndMapOne('billing_periods.other_info',BillingRecordsEntity,'billing_record','billing_periods.ctrl_num = billing_record.ctrl_num')
        .leftJoinAndMapOne('billing_record.q_id',QualificationsEntity,'qualification','billing_record.q_id = qualification.id')
        .leftJoinAndMapOne('billing_record.tc_id',TrainingCentersEntity,'training_center','billing_record.tc_id = training_center.id')
        .where("MONTH(billing_periods.datetime_due) = :month", {month : month})
        .andWhere("YEAR(billing_periods.datetime_due) = :year", { year: currentYear })
        .getMany();
    }

        async getAllByMonthByTC(month : number, tc_id : number){

            const currentYear = new Date().getFullYear();

        return await this.i_repository.createQueryBuilder("billing_periods")
        .leftJoinAndMapOne('billing_periods.bt_id',BillingTypesEntity,'billing_type','billing_periods.bt_id = billing_type.id')
        .leftJoinAndMapOne('billing_periods.sc_id',ScholarshipsEntity,'scholar_type','billing_periods.sc_id = scholar_type.id')
        .leftJoinAndMapOne('billing_periods.other_info',BillingRecordsEntity,'billing_record','billing_periods.ctrl_num = billing_record.ctrl_num')
        .leftJoinAndMapOne('billing_record.q_id',QualificationsEntity,'qualification','billing_record.q_id = qualification.id')
        .leftJoinAndMapOne('billing_record.tc_id',TrainingCentersEntity,'training_center','billing_record.tc_id = training_center.id')
        .where("MONTH(billing_periods.datetime_due) = :month", {month : month})
        .andWhere("YEAR(billing_periods.datetime_due) = :year", { year: currentYear })
        .andWhere("billing_record.tc_id = :tc_id", { tc_id: tc_id })
        .getMany();
    }

        // async chartGetDroppedStudents(fiscal_yr : string) {
        // return await this.i_repository
        //     .createQueryBuilder('billing_periods')
        //     .leftJoinAndMapOne('billing_periods.sc_id',ScholarshipsEntity,'scholar_type','billing_periods.sc_id = scholar_type.id')
        //     .leftJoinAndMapOne('billing_periods.other_info', BillingRecordsEntity, 'billing_record', 'billing_periods.ctrl_num = billing_record.ctrl_num')
        //     .where('billing_periods.status = 1')
        //     .andWhere('billing_record.fiscal_yr = :fiscal_yr', { fiscal_yr : fiscal_yr }) // ✅ filter by fiscal year
        //     .select('scholar_type.abbre', 'scholarship')
        //     .addSelect('SUM(billing_periods.total_dropped)', 'total_dropped')
        //     .groupBy('scholar_type.abbre')
        //     .getRawMany();
        // }


        // async chartGetDroppedStudentsMonth(fiscal_yr : string) {
        // return await this.i_repository
        //     .createQueryBuilder('bp')
        //     .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
        //     .innerJoin('scholarships', 'sc', 'sc.id = br.sc_id')
        //     .select('sc.abbre', 'scholarship')
        //     .addSelect('DATE_FORMAT(bp.datetime_submit, "%M")', 'month') // Format month (e.g., January)
        //     .addSelect('COUNT(*)', 'total_dropped')
        //     .where('bp.status = :status', { status: 1 })
        //     .andWhere('br.fiscal_yr = :fiscal_yr', { fiscal_yr : fiscal_yr }) // ✅ filter by fiscal year
        //     .groupBy('sc.abbre')
        //     .addGroupBy('month')
        //     .orderBy('month', 'ASC')
        //     .getRawMany();
        // }

        async chartGetDroppedStudents(fiscal_yr: string, tc_id: number) {
    const data = await this.i_repository
        .createQueryBuilder('bp')
        .leftJoinAndMapOne('bp.scholarship', ScholarshipsEntity, 'sc', 'bp.sc_id = sc.id')
        .leftJoinAndMapOne('bp.billing_record', BillingRecordsEntity, 'br', 'bp.ctrl_num = br.ctrl_num')
        .leftJoinAndMapOne('bp.qualifications', QualificationsEntity, 'q', 'br.q_id = q.id')

        /* NEW: join trainees */
        .leftJoin(TraineesEntity, 't', 't.ctrl_num = bp.ctrl_num')

        .where('bp.status = 1')
        .andWhere('br.fiscal_yr = :fiscal_yr', { fiscal_yr })
        .andWhere('br.tc_id = :tc_id', { tc_id })
        .andWhere("t.status = 'dropped'") // count only dropped trainees

        .select('sc.abbre', 'scholarship')
        .addSelect('q.description', 'qualification')
        .addSelect('br.ctrl_num', 'ctrl_num')

        /* Count DISTINCT trainees (avoid double-counting if trainee dropped multiple times) */
        .addSelect(
            `COUNT(DISTINCT CONCAT(t.fname, '-', COALESCE(t.mname,''), '-', t.lname, '-', COALESCE(t.extension,'')))`,
            'total_dropped'
        )

        .groupBy('sc.abbre')
        .addGroupBy('q.description')
        .addGroupBy('br.ctrl_num')
        .orderBy('sc.abbre', 'ASC')
        .addOrderBy('q.description', 'ASC')
        .getRawMany();

    // Transform data for frontend display
    const resultMap = new Map<string, any>();

    data.forEach(row => {
        const scholarshipName = row.scholarship;
        const qualificationName = row.qualification;
        const ctrlNum = row.ctrl_num;
        const droppedCount = parseInt(row.total_dropped, 10);

        if (!resultMap.has(scholarshipName)) {
            resultMap.set(scholarshipName, {
                scholarship: scholarshipName,
                total_dropped: 0,
                qualifications: new Map()
            });
        }

        const schEntry = resultMap.get(scholarshipName);
        schEntry.total_dropped += droppedCount;

        if (!schEntry.qualifications.has(qualificationName)) {
            schEntry.qualifications.set(qualificationName, {
                description: qualificationName,
                total_dropped: 0,
                ctrl_nums: []
            });
        }

        const qualEntry = schEntry.qualifications.get(qualificationName);
        qualEntry.total_dropped += droppedCount;
        qualEntry.ctrl_nums.push({ ctrl_num: ctrlNum, count: droppedCount });
    });

    // Convert Map to structured array
    const structuredResult = Array.from(resultMap.values()).map(sch => ({
        scholarship: sch.scholarship,
        total_dropped: sch.total_dropped,
        number_of_qualifications: sch.qualifications.size,
        qualifications: Array.from(sch.qualifications.values())
    }));

    return structuredResult;
}


        async chartGetDroppedStudentsMonth(fiscal_yr: string, tc_id: number) {
        const data = await this.i_repository
            .createQueryBuilder('bp')
            .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
            .innerJoin('scholarships', 'sc', 'sc.id = br.sc_id')
            .innerJoin('qualifications', 'q', 'q.id = br.q_id')
            .select('sc.abbre', 'scholarship')
            .addSelect('q.description', 'qualification')
            .addSelect('br.ctrl_num', 'ctrl_num')
            .addSelect('DATE_FORMAT(bp.datetime_submit, "%M")', 'month') // ✅ month name
            .addSelect('COUNT(*)', 'total_dropped')
            .where('bp.status = :status', { status: 1 })
            .andWhere('br.fiscal_yr = :fiscal_yr', { fiscal_yr })
            .andWhere('br.tc_id = :tc_id', { tc_id })
            .groupBy('sc.abbre')
            .addGroupBy('q.description')
            .addGroupBy('br.ctrl_num')
            .addGroupBy('month')
            .orderBy(
            'FIELD(month, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")'
            )
            .addOrderBy('sc.abbre', 'ASC')
            .addOrderBy('q.description', 'ASC')
            .getRawMany();

        // ✅ Transform data for frontend display (now includes month)
        const scholarshipMap = new Map<string, any>();

        data.forEach((row) => {
            const scholarshipName = row.scholarship;
            const qualificationName = row.qualification;
            const ctrlNum = row.ctrl_num;
            const month = row.month;
            const droppedCount = parseInt(row.total_dropped, 10);

            // Create scholarship entry if missing
            if (!scholarshipMap.has(scholarshipName)) {
            scholarshipMap.set(scholarshipName, {
                scholarship: scholarshipName,
                total_dropped: 0,
                months: new Map<string, any>(), // ✅ track months per scholarship
            });
            }

            const scholarshipEntry = scholarshipMap.get(scholarshipName);
            scholarshipEntry.total_dropped += droppedCount;

            // Create month entry if missing
            if (!scholarshipEntry.months.has(month)) {
            scholarshipEntry.months.set(month, {
                month,
                total_dropped: 0,
                qualifications: new Map<string, any>(),
            });
            }

            const monthEntry = scholarshipEntry.months.get(month);
            monthEntry.total_dropped += droppedCount;

            // Add qualification entry within the month
            if (!monthEntry.qualifications.has(qualificationName)) {
            monthEntry.qualifications.set(qualificationName, {
                description: qualificationName,
                total_dropped: 0,
                ctrl_nums: [],
            });
            }

            const qualEntry = monthEntry.qualifications.get(qualificationName);
            qualEntry.total_dropped += droppedCount;
            qualEntry.ctrl_nums.push({ ctrl_num: ctrlNum, count: droppedCount });
        });

        // ✅ Convert nested Maps to arrays for frontend
        const structuredResult = Array.from(scholarshipMap.values()).map((sch) => ({
        scholarship: sch.scholarship,
        total_dropped: sch.total_dropped,
        months: Array.from(sch.months.values() as Iterable<{
            month: string;
            total_dropped: number;
            qualifications: Map<string, any>;
        }>).map((m) => ({
            month: m.month,
            total_dropped: m.total_dropped,
            number_of_qualifications: m.qualifications.size,
            qualifications: Array.from(m.qualifications.values()),
        })),
        }));

        return structuredResult;
        }


        async chartGetBillingSubmissions(fiscal_yr : string) {
        return await this.i_repository
            .createQueryBuilder('billing_periods')
            .leftJoinAndMapOne('billing_periods.other_info', BillingRecordsEntity, 'billing_record', 'billing_periods.ctrl_num = billing_record.ctrl_num')
            .leftJoinAndMapOne('billing_record.tc_id', TrainingCentersEntity, 'training_center', 'billing_record.tc_id = training_center.id')
            .where('billing_periods.status = 1')
            .andWhere('billing_record.fiscal_yr = :fiscal_yr', { fiscal_yr : fiscal_yr }) // ✅ filter by fiscal year
            .select('training_center.abbre', 'tc_description')
            .addSelect('COUNT(CASE WHEN billing_periods.datetime_submit <= billing_periods.datetime_due THEN 1 END)', 'on_time_count') // On Time count
            .addSelect('COUNT(CASE WHEN billing_periods.datetime_submit > billing_periods.datetime_due THEN 1 END)', 'late_count') // Late count
            .groupBy('training_center.abbre')
            .getRawMany();
        }

        async computePerformanceScores(fiscal_yr: string) {
  const data = await this.i_repository
    .createQueryBuilder('bp')
    .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
    .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
    .select('tc.abbre', 'trainingCenter')
    .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
    .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
    .addSelect('COUNT(bp.id)', 'totalSubmissions')
    .addSelect(`
        SUM(
            CASE 
              WHEN bp.datetime_submit IS NOT NULL 
                AND bp.datetime_due IS NOT NULL 
                AND bp.datetime_submit <= bp.datetime_due 
            THEN 1 ELSE 0 
            END
        )
    `, 'onTimeSubmissions')
    .where('bp.status = :status', { status: 1 })
    .andWhere('br.fiscal_yr = :fiscal_yr', { fiscal_yr })
    .groupBy('tc.abbre')
    .getRawMany();

  const WBUR = 0.6;
  const WBSC = 0.4;

  return data.map(row => {
    const allocated = parseFloat(row.allocatedBudget);
    const utilized = parseFloat(row.utilizedBudget);
    const total = parseInt(row.totalSubmissions, 10);
    const onTime = parseInt(row.onTimeSubmissions, 10);

    const BUR = allocated > 0 ? utilized / allocated : 0;
    const BSC = total > 0 ? onTime / total : 0;
    const WPS = (BUR * WBUR) + (BSC * WBSC);

    return {
      trainingCenter: row.trainingCenter,
      allocatedBudget: +allocated.toFixed(2),
      utilizedBudget: +utilized.toFixed(2),
      totalBillableSubmissions: total,
      onTimeCorrectSubmissions: onTime,
      BUR: +(BUR * 100).toFixed(2),   // ← return BUR as %
      BSC: +(BSC * 100).toFixed(2),   // ← return BSC as %
      WPS: +WPS.toFixed(3),
    };
  });
}



        async computePerformanceScoresByScholarships(fiscal_yr: string) {
        const data = await this.i_repository
            .createQueryBuilder('bp')
            .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
            .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
            .innerJoin('scholarships', 'sc', 'sc.id = br.sc_id')
            .select('sc.abbre', 'scholarshipDescription')
            .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
            .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
            .addSelect('COUNT(bp.id)', 'totalSubmissions')
            .addSelect(`
                SUM(
                    CASE 
                    WHEN bp.datetime_submit IS NOT NULL 
                        AND bp.datetime_due IS NOT NULL 
                        AND bp.datetime_submit <= bp.datetime_due 
                    THEN 1 ELSE 0 
                    END
                )
            `, 'onTimeSubmissions')
            // NEW ADDED FIELDS:
            .addSelect('COUNT(DISTINCT tc.id)', 'trainingCentersCount')
            .addSelect('COUNT(DISTINCT br.tc_id)', 'trainingsImplemented')
            .addSelect('COUNT(DISTINCT br.q_id)', 'qualificationsCount')
            .addSelect('SUM(br.num_pax)', 'approvedSlots')
            .where('bp.status = :status', { status: 1 })
            .andWhere('br.fiscal_yr = :fiscal_yr', { fiscal_yr })
            .groupBy('sc.abbre')
            .getRawMany();

        return data.map(row => ({
            scholarshipDescription: row.scholarshipDescription,
            allocatedBudget: +parseFloat(row.allocatedBudget).toFixed(2),
            numberOfTrainingCenters: parseInt(row.trainingCentersCount, 10),
            numberOfTrainingsImplemented: parseInt(row.trainingsImplemented, 10),
            numberOfQualifications: parseInt(row.qualificationsCount, 10),
            numberOfApprovedSlots: parseInt(row.approvedSlots, 10),
            utilizedBudget: +parseFloat(row.utilizedBudget).toFixed(2),
            unUtilizedBudget: +( (parseFloat(row.allocatedBudget) - parseFloat(row.utilizedBudget)).toFixed(2) ),
            BUR: +(parseFloat(row.utilizedBudget) / parseFloat(row.allocatedBudget)).toFixed(2),
        }));
        }


       async computePerformanceScoresByTrainingCenters(fiscal_yr: string) {

        const data = await this.i_repository
            .createQueryBuilder('bp')
            .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
            .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
            .innerJoin('scholarships', 'sc', 'sc.id = br.sc_id')
            .select('tc.abbre', 'trainingCenter')
            .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
            .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
            .addSelect('COUNT(bp.id)', 'totalSubmissions')
            .addSelect(`
                SUM(
                    CASE 
                    WHEN bp.datetime_submit IS NOT NULL 
                    AND bp.datetime_due IS NOT NULL 
                    AND bp.datetime_submit <= bp.datetime_due 
                    THEN 1 ELSE 0 
                    END
                )
            `, 'onTimeSubmissions')
            // NEW ADDITIONS:
            .addSelect('COUNT(DISTINCT br.tc_id)', 'trainingsImplemented')
            .addSelect('COUNT(DISTINCT br.q_id)', 'qualificationsCount')
            .addSelect('SUM(br.num_pax)', 'approvedSlots')
            .where('bp.status = :status', { status: 1 })
            .andWhere('br.fiscal_yr = :fiscal_yr', { fiscal_yr })
            .groupBy('tc.abbre')
            .getRawMany();

        return data.map(row => ({
            trainingCenter: row.trainingCenter,
            allocatedBudget: +parseFloat(row.allocatedBudget).toFixed(2),
            numberOfTrainingsImplemented: parseInt(row.trainingsImplemented, 10),
            numberOfQualifications: parseInt(row.qualificationsCount, 10),
            numberOfApprovedSlots: parseInt(row.approvedSlots, 10),
            utilizedBudget: +parseFloat(row.utilizedBudget).toFixed(2),
             unUtilizedBudget: +( (parseFloat(row.allocatedBudget) - parseFloat(row.utilizedBudget)).toFixed(2) ),
            BUR: +(parseFloat(row.utilizedBudget) / parseFloat(row.allocatedBudget)).toFixed(2),
        }));
        }


                async computePerformanceScoresByQualifications(fiscal_yr : string) {
                const data = await this.i_repository
                    .createQueryBuilder('bp')
                    .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                    .innerJoin('qualifications', 'q', 'q.id = br.q_id') // ✅ Join qualifications
                    .select('q.description', 'qualification') // ✅ Use qualification name or abbrev
                    .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
                    .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
                    .addSelect('COUNT(bp.id)', 'totalSubmissions')
                    .addSelect(`
                    SUM(
                        CASE 
                        WHEN bp.datetime_submit IS NOT NULL 
                            AND bp.datetime_due IS NOT NULL 
                            AND bp.datetime_submit <= bp.datetime_due 
                        THEN 1 ELSE 0 
                        END
                    )
                    `, 'onTimeSubmissions')
                    .where('bp.status = :status', { status: 1 })
                    .andWhere('br.fiscal_yr = :fiscal_yr', { fiscal_yr : fiscal_yr }) // ✅ filter by fiscal year
                    .groupBy('q.description') // ✅ Group by qualification description
                    .getRawMany();

                const WBUR = 0.6;
                const WBSC = 0.4;

                const results = data.map(row => {
                    const qualification = row.qualification;
                    const allocated = parseFloat(row.allocatedBudget);
                    const utilized = parseFloat(row.utilizedBudget);
                    const total = parseInt(row.totalSubmissions, 10);
                    const onTime = parseInt(row.onTimeSubmissions, 10);

                    const BUR = allocated > 0 ? utilized / allocated : 0;
                    const BSC = total > 0 ? onTime / total : 0;
                    const WPS = (BUR * WBUR) + (BSC * WBSC);

                    return {
                    qualification: qualification,
                    allocatedBudget: +allocated.toFixed(2),
                    utilizedBudget: +utilized.toFixed(2),
                    totalBillableSubmissions: total,
                    onTimeCorrectSubmissions: onTime,
                    BUR: +BUR.toFixed(2),
                    BSC: +BSC.toFixed(2),
                    WPS: +WPS.toFixed(3),
                    };
                });

                return results;
                }

        private formatDate(date: Date | string): string {
            if (!date) return '';

            return new Intl.DateTimeFormat('en-US', {
                month: 'short',   // Jan
                day: '2-digit',   // 31
                year: 'numeric',  // 2025
            }).format(new Date(date));
        }

        private getStatusLabel(status: number): string {
            switch (status) {
            case 0:
                return 'Pending';
            case 1:
                return 'Approved';
            case 2:
                return 'Denied';
            case 3:
                return 'Revised';
            default:
                return 'No Action';
            }
        }

       async getBillingReportData(year: string, tc_id?: number): Promise<any> {
            const query = this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('qualifications', 'q', 'q.id = br.q_id')
                .innerJoin('scholarships', 'sc', 'sc.id = bp.sc_id')
                .innerJoin('billing_types', 'bt', 'bt.id = bp.bt_id')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .select([
                    'tc.abbre AS tc_name',
                    'bp.ctrl_num AS pqm_code',
                    'sc.abbre AS scholarship_type',
                    'q.description AS training_program',
                    'bt.abbre AS billing_type',
                    'bp.status AS status',
                    'bp.total_payment AS total_amount',
                    'bp.datetime_submit AS datetime_submit',
                ])
                // ✅ Compare directly with the fiscal year in billing_records
                .where('br.fiscal_yr = :year', { year })
                .andWhere('bp.status = 1');

            // Optional training center filter           
            if (tc_id !== undefined && tc_id !== null) {
                query.andWhere('br.tc_id = :tc_id', { tc_id });
            }

            const data = await query.getRawMany();

            return data.map((bp) => ({
                trainingCenter: bp.tc_name,
                pqmCode: bp.pqm_code,
                scholarshipType: bp.scholarship_type,
                trainingProgram: bp.training_program,
                billingType: bp.billing_type,
                submissionDate: this.formatDate(bp.datetime_submit),
                status: this.getStatusLabel(bp.status),
                totalAmount: bp.total_amount,
            }));
        }

        async getUtilizationReportData(year: string, tc_id: number | null): Promise<any> {
            const query = this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('scholarships', 's', 's.id = br.sc_id')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .select('tc.abbre', 'trainingCenter')
                .addSelect('s.abbre', 'scholarshipProgram')
                .addSelect('SUM(bp.total_payment)', 'allocatedBudget')  // Sum of allocated budget
                .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')  // Sum of utilized budget
                // ✅ Compare directly with fiscal year
                .where('br.fiscal_yr = :year', { year })
                .andWhere('bp.status = 1');

            // ✅ Optional training center filter
            if (tc_id !== null) {
                query.addSelect('bp.ctrl_num', 'ctrlNum');
                query.andWhere('br.tc_id = :tc_id', { tc_id });
            }

            // ✅ Grouping logic
            if (tc_id !== null) {
                query.groupBy('tc.abbre, bp.ctrl_num');
            } else {
                query.groupBy('tc.abbre');
            }

            const rawData = await query.getRawMany();

            return rawData.map((row) => ({
                trainingCenter: row.trainingCenter,
                scholarshipProgram: row.scholarshipProgram,
                allocatedBudget: parseFloat(row.allocatedBudget),
                utilizedBudget: parseFloat(row.utilizedBudget),
                utilizationRate: this.calculateUtilizationRate(row.allocatedBudget, row.utilizedBudget),
                ctrlNum: row.ctrlNum || null,
            }));
        }


        async getComplianceReportData(year: string, tc_id: number | null): Promise<any> {
            const query = this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .innerJoin('scholarships', 's', 's.id = br.sc_id')
                .select('tc.abbre', 'trainingCenter')
                .addSelect('COUNT(bp.id)', 'totalSubmissions') // Total number of periods (submissions)
                .addSelect('s.abbre', 'scholarshipProgram') // Total number of periods (submissions)
                .addSelect(`SUM(
                    CASE 
                        WHEN bp.datetime_submit IS NOT NULL 
                        AND bp.datetime_due IS NOT NULL 
                        AND bp.datetime_submit <= bp.datetime_due 
                        THEN 1 ELSE 0 
                    END
                )`, 'onTimeSubmissions') // On-time submissions
                // ✅ Filter by fiscal year instead of year extraction
                .where('br.fiscal_yr = :year', { year })
                .andWhere('bp.status = 1'); // Only completed submissions

            // ✅ Optional training center filter
            if (tc_id !== null) {
                query.addSelect('bp.ctrl_num', 'ctrlNum');
                query.andWhere('br.tc_id = :tc_id', { tc_id });
            }

            // ✅ Grouping logic
            if (tc_id !== null) {
                query.groupBy('tc.abbre, bp.ctrl_num');
            } else {
                query.groupBy('tc.abbre');
            }

            const rawData = await query.getRawMany();

            return rawData.map((row) => {
                const total = parseInt(row.totalSubmissions, 10);
                const onTime = parseInt(row.onTimeSubmissions, 10);
                const complianceRate = total > 0 ? (onTime / total) * 100 : 0;

                return {
                    trainingCenter: row.trainingCenter,
                    scholarshipProgram : row.scholarshipProgram,
                    totalSubmissions: total,
                    onTimeSubmissions: onTime,
                    complianceRate: +complianceRate.toFixed(2),
                    ctrlNum: row.ctrlNum || null,
                };
            });
        }


        async getPerformanceEvaluationData(year: string): Promise<any> {
            const data = await this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .select('tc.abbre', 'trainingCenter')
                .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
                .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
                .addSelect('COUNT(bp.id)', 'totalSubmissions')
                .addSelect(`SUM(
                    CASE 
                        WHEN bp.datetime_submit IS NOT NULL 
                        AND bp.datetime_due IS NOT NULL 
                        AND bp.datetime_submit <= bp.datetime_due 
                        THEN 1 ELSE 0 
                    END
                )`, 'onTimeSubmissions')
                .where('br.fiscal_yr = :year', { year })  // ✅ use fiscal year
                .andWhere('bp.status = 1')
                .groupBy('tc.abbre')
                .getRawMany();

            const WBUR = 0.6;
            const WBSC = 0.4;

            const results = data.map(row => {
                const allocated = parseFloat(row.allocatedBudget);
                const utilized = parseFloat(row.utilizedBudget);
                const total = parseInt(row.totalSubmissions, 10);
                const onTime = parseInt(row.onTimeSubmissions, 10);

                const BUR = allocated > 0 ? utilized / allocated : 0;
                const BSC = total > 0 ? onTime / total : 0;
                const WPS = (BUR * WBUR) + (BSC * WBSC);

                return {
                    trainingCenter: row.trainingCenter,
                    BUR: +(BUR * 100).toFixed(0),
                    BSC: +(BSC * 100).toFixed(0),
                    WPS: +WPS.toFixed(3),
                };
            });

            return results
                .sort((a, b) => b.WPS - a.WPS)
                .map((item, index) => ({
                    rank: index + 1,
                    ...item
                }));
        }


        async getScholarshipAllocationReport(year: string): Promise<any> {
            const data = await this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('scholarships', 'sc', 'sc.id = br.sc_id')
                .select('sc.abbre', 'scholarshipDescription')
                .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
                .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
                .where('br.fiscal_yr = :year', { year })  // ✅ use fiscal year
                .andWhere('bp.status = 1')
                .groupBy('sc.abbre')
                .getRawMany();

            return data.map(row => ({
                scholarshipType: row.scholarshipDescription,
                allocatedBudget: +parseFloat(row.allocatedBudget).toFixed(2),
                utilizedBudget: +parseFloat(row.utilizedBudget).toFixed(2),
            }));
        }

        
        // Helper function to calculate the utilization rate
        calculateUtilizationRate(allocated: string, utilized: string): string {
            const allocatedNum = parseFloat(allocated);
            const utilizedNum = parseFloat(utilized);
            const rate = allocatedNum > 0 ? (utilizedNum / allocatedNum) * 100 : 0;
            return `${rate.toFixed(2)}%`;
        }

        async getAssessmentRatesReportData(year: string, tc_id: number | null): Promise<any> {
            const query = this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('qualifications', 'q', 'q.id = br.q_id')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .select([
                    'tc.abbre AS trainingCenter',
                    'bp.ctrl_num AS ctrlNum',
                    'q.description AS qualification',
                    `SUM(CASE WHEN bp.status = 'Competent' THEN 1 ELSE 0 END) AS competent`,
                    `SUM(CASE WHEN bp.status = 'NYC' THEN 1 ELSE 0 END) AS nyc`,
                    `SUM(CASE WHEN bp.status = 'Absent' THEN 1 ELSE 0 END) AS absent`,
                    `COUNT(bp.id) AS total`
                ])
                .where('br.fiscal_yr = :year', { year })

            if (tc_id !== null) {
                query.andWhere('br.tc_id = :tc_id', { tc_id });
            }

            query.groupBy('tc.abbre, bp.ctrl_num, q.description');

            const rawData = await query.getRawMany();

            // Calculate rates
            return rawData.map(row => {
                const total = parseInt(row.total, 10);
                const competent = parseInt(row.competent, 10);
                const nyc = parseInt(row.nyc, 10);
                const absent = parseInt(row.absent, 10);

                return {
                    trainingCenter: row.trainingCenter,
                    ctrlNum: row.ctrlNum,
                    qualification: row.qualification,
                    competent,
                    rateCompetent: total > 0 ? +(competent / total * 100).toFixed(2) : 0,
                    nyc,
                    rateNyc: total > 0 ? +(nyc / total * 100).toFixed(2) : 0,
                    absent,
                    rateAbsent: total > 0 ? +(absent / total * 100).toFixed(2) : 0
                };
            });
        }

        async getDroppedTraineesReport(year: string, tc_id: number | null): Promise<any> {
        const query = this.i_repository
            .createQueryBuilder('bp')
            .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
            .innerJoin('trainees', 't', 't.ctrl_num = br.ctrl_num')  // Join trainees table
            .innerJoin('qualifications', 'q', 'q.id = br.q_id')  // Join qualifications table
            .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')  // Join training centers table
            .select([
                't.fname',       // First name
                't.mname',       // Middle name
                't.lname',       // Last name
                't.extension',   // Extension (if any)
                't.date_dropped as date_dropped',
                'tc.abbre AS trainingCenter',  // Training center abbreviation
                'bp.ctrl_num AS pqmCode',  // RQM Code (ctrl_num)
                'q.description AS qualification',  // Training program description
            ])
            .where('bp.status = :status', { status: 'dropped' })  // Filter by dropped status
            .andWhere('br.fiscal_yr = :year', { year })  // Filter by fiscal year
            .andWhere('t.status = "dropped"')  // Filter by fiscal year
            // If a specific training center ID is provided, filter by tc_id
            if (tc_id !== null) {
                query.andWhere('br.tc_id = :tc_id', { tc_id });
            }
            query.groupBy('t.sg_number')

        // Execute the query
        const rawData = await query.getRawMany();  // Fetch the raw data from the database
        // Map over the raw data and format it for the report
        return rawData.map((row, index) => ({
            no: index + 1,  // Counter, starting from 1
            name: `${row.t_fname} ${row.t_mname} ${row.t_lname} ${row.extension || ''}`,  // Full name
            trainingCenter: row.trainingCenter,
            pqmCode: row.pqmCode,
            qualification: row.qualification,
            date_dropped: row.date_dropped
        }));
    }






        async generateReportBilling(file_data: any): Promise<Buffer> {
            const puppeteer = require('puppeteer');
            const fs = require('fs-extra');
            const hbs = require('handlebars');
            const path = require('path');

            const year = file_data.year;

            let billingData;

            // Determine billing data based on tc_id
            if (file_data.type === 'billing_report') {

                file_data.hasTC = file_data.params.tc_id ? false : true; 

                if (file_data.params.tc_id) {
                    billingData = await this.getBillingReportData(year, file_data.params.tc_id);
                } else {
                    billingData = await this.getBillingReportData(year, null);
                }
            }
            else if(file_data.type === 'utilization_report') {

                file_data.hasTC = file_data.params.tc_id ? false : true; 

                if(file_data.params.tc_id !== 'all') {
                    billingData = await this.getUtilizationReportData(year, file_data.params.tc_id);
                } else {
                    billingData = await this.getUtilizationReportData(year, null);
                }
            }
            else if(file_data.type === 'compliance_report') {

                file_data.hasTC = file_data.params.tc_id ? false : true; 

                if(file_data.params.tc_id !== 'all') {
                    billingData = await this.getComplianceReportData(year, file_data.params.tc_id);
                } else {
                    billingData = await this.getComplianceReportData(year, null);
                }
            }
            else if(file_data.type === 'assessment_report') {

                file_data.hasTC = file_data.params.tc_id ? false : true; 

                if(file_data.params.tc_id !== 'all') {
                    billingData = await this.getAssessmentRatesReportData(year, file_data.params.tc_id);
                } else {
                    billingData = await this.getAssessmentRatesReportData(year, null);
                }
            }
            else if(file_data.type === 'dropped_report') {

                file_data.hasTC = file_data.params.tc_id ? false : true; 

                if(file_data.params.tc_id !== 'all') {
                    billingData = await this.getDroppedTraineesReport(year, file_data.params.tc_id);
                } else {
                    billingData = await this.getDroppedTraineesReport(year, null);
                }
            }
            else if(file_data.type === 'performance_report') {

                billingData = await this.getPerformanceEvaluationData(year);
            }
            else if(file_data.type === 'scholarship_report') {

                billingData = await this.getScholarshipAllocationReport(year);
            }

            // Add billing data to the file_data object for template rendering
            file_data.billingReportData = billingData;
            

            // Helper function to compile Handlebars template
            const compile = async (templateName: string, data: any): Promise<string> => {
                const filePath = path.join(process.cwd(), '../templates', `${templateName}.hbs`);
                const html = await fs.readFile(filePath, 'utf-8');

                // Register custom Handlebars helpers
                hbs.registerHelper('ifCheckTitle', function (v1, options) {
                    return v1 !== '' ? options.fn(this) : options.inverse(this);
                });

                hbs.registerHelper("peso", function (value) {
                    if (value == null || value === "") return "";

                    var num = Number(value);
                    if (isNaN(num)) return value;

                    return "\u20B1" + num.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                });

                hbs.registerHelper("formatDate", function (value) {
                    if (!value) return "";

                    const date = new Date(value);
                    if (isNaN(date.getTime())) return value;

                    return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                    });
                });




                // Register custom `eq` helper to compare two values
                hbs.registerHelper('eq', function (a, b, options) {
                    if (a === b) {
                        return options.fn(this); // If the values match, return the content inside the block
                    } else {
                        return options.inverse(this); // Otherwise, return the inverse block
                    }
                });

                // Additional helpers can be added as needed

                return hbs.compile(html)(data);
            };

            try {
                // Launch puppeteer to generate the PDF
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                // Compile the Handlebars template
                const content = await compile('report_billing', file_data);

                // Set the page content with the compiled HTML
                await page.setContent(content);

                // Generate the PDF buffer
                const buffer = await page.pdf({
                    path: `../report_files/${file_data.file_name}`,
                    format: 'letter',
                    landscape: false,
                    printBackground: true,
                });

                await browser.close();

                return buffer; // Return the generated PDF buffer
            } catch (e) {
                console.error('Error generating record:', e);
                throw new Error('Error generating PDF report');
            }
        }

        
async generateExcelBilling(file_data: any): Promise<{ fileName: string }> {
  const year = file_data.year;
  let billingData: any[] = [];

  /* ================= GET DATA ================= */
  if (file_data.type === 'billing_report') {
    billingData = file_data.params?.tc_id
      ? await this.getBillingReportDataForExcel(year, file_data.params.tc_id)
      : await this.getBillingReportDataForExcel(year, null);
  } else if (file_data.type === 'utilization_report') {
    billingData = file_data.params?.tc_id !== 'all'
      ? await this.getUtilizationReportDataForExcel(year, file_data.params.tc_id)
      : await this.getUtilizationReportDataForExcel(year, null);
  } else if (file_data.type === 'compliance_report') {
    billingData = file_data.params?.tc_id !== 'all'
      ? await this.getComplianceReportDataForExcel(year, file_data.params.tc_id)
      : await this.getComplianceReportDataForExcel(year, null);
  } else if (file_data.type === 'performance_report') {
    billingData = await this.getPerformanceEvaluationDataForExcel(year);
  } else if (file_data.type === 'scholarship_report') {
    billingData = await this.getScholarshipAllocationReportForExcel(year);
  }

  /* ================= WORKBOOK ================= */
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Report');

  if (!billingData || billingData.length === 0) {
    worksheet.addRow(['No data available']);
  } else {
    /* ================= HEADERS ================= */
    const headers = Object.keys(billingData[0]);

    worksheet.columns = headers.map(key => ({
      header: key.replace(/_/g, ' ').toUpperCase(),
      key,
      width: 20
    }));

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    headerRow.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    /* ================= DATA ROWS ================= */
    billingData.forEach(data => {
      const row = worksheet.addRow(data);

      row.eachCell(cell => {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
        cell.border = headerRow.getCell(1).border;
      });
    });

    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
  }

  /* ================= FILE ================= */
  const reportsDir = path.join(process.cwd(), '../report_files');
  await fs.ensureDir(reportsDir);

  const fileName =
    `${file_data.file_name?.replace('.pdf', '') || 'report'}_${Date.now()}.xlsx`;
  const filePath = path.join(reportsDir, fileName);

  await workbook.xlsx.writeFile(filePath);

  return { fileName };
}


        async getBillingReportDataForExcel(year: string, tc_id?: number): Promise<any[]> {
            const query = this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('qualifications', 'q', 'q.id = br.q_id')
                .innerJoin('scholarships', 'sc', 'sc.id = bp.sc_id')
                .innerJoin('billing_types', 'bt', 'bt.id = bp.bt_id')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .select([
                'tc.abbre AS Training_Center',
                'bp.ctrl_num AS PQM_Code',
                'sc.abbre AS Scholarship_Type',
                'q.description AS Training_Program',
                'bt.abbre AS Billing_Type',
                'bp.status AS Status',
                'bp.total_payment AS Total_Amount',
                ])
                .where('br.fiscal_yr = :year', { year })
                .andWhere('bp.status = 1');

            if (tc_id !== undefined && tc_id !== null) {
                query.andWhere('br.tc_id = :tc_id', { tc_id });
            }

            const data = await query.getRawMany();

            // 🧠 Optional: Format the data for Excel-friendly output
            return data.map((bp, index) => ({
                '#': index + 1,
                'Training Center': bp.Training_Center,
                'PQM Code': bp.PQM_Code,
                'Scholarship Type': bp.Scholarship_Type,
                'Training Program': bp.Training_Program,
                'Billing Type': bp.Billing_Type,
                'Status': this.getStatusLabel(bp.Status),
                'Total Amount (₱)': bp.Total_Amount,
            }));
            }

        async getUtilizationReportDataForExcel(year: string, tc_id: number | null): Promise<any[]> {
            const query = this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('scholarships', 's', 's.id = br.sc_id')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .select('tc.abbre', 'trainingCenter')
                .addSelect('s.abbre', 'scholarshipProgram')
                .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
                .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
                .where('br.fiscal_yr = :year', { year })
                .andWhere('bp.status = 1');

            if (tc_id !== null) {
                query.addSelect('bp.ctrl_num', 'ctrlNum');
                query.andWhere('br.tc_id = :tc_id', { tc_id });
                query.groupBy('tc.abbre, bp.ctrl_num');
            } else {
                query.groupBy('tc.abbre');
            }

            const rawData = await query.getRawMany();

            return rawData.map((row, i) => {
                const allocated = parseFloat(row.allocatedBudget);
                const utilized = parseFloat(row.utilizedBudget);
                const utilizationRate = allocated > 0 ? (utilized / allocated) * 100 : 0;

                return {
                '#': i + 1,
                'Training Center': row.trainingCenter,
                'Scholarship': row.scholarshipProgram,
                'Allocated Budget (₱)': allocated,
                'Utilized Budget (₱)': utilized,
                'Utilization Rate (%)': +utilizationRate.toFixed(2),
                'Control Number': row.ctrlNum || '',
                };
            });
            }

        async getComplianceReportDataForExcel(year: string, tc_id: number | null): Promise<any[]> {
            const query = this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .select('tc.abbre', 'trainingCenter')
                .addSelect('COUNT(bp.id)', 'totalSubmissions')
                .addSelect(`SUM(
                    CASE 
                        WHEN bp.datetime_submit IS NOT NULL 
                        AND bp.datetime_due IS NOT NULL 
                        AND bp.datetime_submit <= bp.datetime_due 
                        THEN 1 ELSE 0 
                    END
                )`, 'onTimeSubmissions')
                .where('br.fiscal_yr = :year', { year })
                .andWhere('bp.status = 1');

            if (tc_id !== null) {
                query.addSelect('bp.ctrl_num', 'ctrlNum');
                query.andWhere('br.tc_id = :tc_id', { tc_id });
                query.groupBy('tc.abbre, bp.ctrl_num');
            } else {
                query.groupBy('tc.abbre');
            }

            const rawData = await query.getRawMany();

            return rawData.map((row, i) => {
                const total = parseInt(row.totalSubmissions, 10);
                const onTime = parseInt(row.onTimeSubmissions, 10);
                const complianceRate = total > 0 ? (onTime / total) * 100 : 0;

                return {
                '#': i + 1,
                'Training Center': row.trainingCenter,
                'Total Submissions': total,
                'On-time Submissions': onTime,
                'Compliance Rate (%)': +complianceRate.toFixed(2),
                'Control Number': row.ctrlNum || '',
                };
            });
            }

            async getPerformanceEvaluationDataForExcel(year: string): Promise<any[]> {
            const data = await this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
                .select('tc.abbre', 'trainingCenter')
                .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
                .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
                .addSelect('COUNT(bp.id)', 'totalSubmissions')
                .addSelect(`SUM(
                    CASE 
                        WHEN bp.datetime_submit IS NOT NULL 
                        AND bp.datetime_due IS NOT NULL 
                        AND bp.datetime_submit <= bp.datetime_due 
                        THEN 1 ELSE 0 
                    END
                )`, 'onTimeSubmissions')
                .where('br.fiscal_yr = :year', { year })
                .andWhere('bp.status = 1')
                .groupBy('tc.abbre')
                .getRawMany();

            const WBUR = 0.6;
            const WBSC = 0.4;

            const results = data.map((row, i) => {
                const allocated = parseFloat(row.allocatedBudget);
                const utilized = parseFloat(row.utilizedBudget);
                const total = parseInt(row.totalSubmissions, 10);
                const onTime = parseInt(row.onTimeSubmissions, 10);

                const BUR = allocated > 0 ? utilized / allocated : 0;
                const BSC = total > 0 ? onTime / total : 0;
                const WPS = (BUR * WBUR) + (BSC * WBSC);

                return {
                '#': i + 1,
                'Training Center': row.trainingCenter,
                'Budget Utilization Rate (%)': +(BUR * 100).toFixed(2),
                'Billing Submission Compliance (%)': +(BSC * 100).toFixed(2),
                'Weighted Performance Score': +WPS.toFixed(3),
                };
            });

            return results.sort((a, b) => b['Weighted Performance Score'] - a['Weighted Performance Score']);
            }

            async getScholarshipAllocationReportForExcel(year: string): Promise<any[]> {
            const data = await this.i_repository
                .createQueryBuilder('bp')
                .innerJoin('billing_records', 'br', 'br.ctrl_num = bp.ctrl_num')
                .innerJoin('scholarships', 'sc', 'sc.id = br.sc_id')
                .select('sc.abbre', 'scholarshipType')
                .addSelect('SUM(bp.total_payment)', 'allocatedBudget')
                .addSelect('SUM(bp.total_utilized)', 'utilizedBudget')
                .where('br.fiscal_yr = :year', { year })
                .andWhere('bp.status = 1')
                .groupBy('sc.abbre')
                .getRawMany();

            return data.map((row, i) => ({
                '#': i + 1,
                'Scholarship Type': row.scholarshipType,
                'Allocated Budget (₱)': +parseFloat(row.allocatedBudget).toFixed(2),
                'Utilized Budget (₱)': +parseFloat(row.utilizedBudget).toFixed(2),
                'Utilization Rate (%)': +(
                (parseFloat(row.utilizedBudget) / parseFloat(row.allocatedBudget)) *
                100
                ).toFixed(2),
            }));
            }

           async getAssessmentRates(fiscal_yr: string) {
        const data = await this.i_repository
            .createQueryBuilder('t') // trainees alias
            .innerJoin('billing_records', 'br', 'br.ctrl_num = t.ctrl_num')
            .innerJoin('training_centers', 'tc', 'tc.id = br.tc_id')
            .select('tc.abbre', 'trainingCenter')
            .addSelect(`SUM(CASE WHEN t.status = 'competent' THEN 1 ELSE 0 END)`, 'competent')
            .addSelect(`SUM(CASE WHEN t.status = 'nyc' THEN 1 ELSE 0 END)`, 'nyc')
            .addSelect(`SUM(CASE WHEN t.status = 'absent' THEN 1 ELSE 0 END)`, 'absent')
            .addSelect(`COUNT(t.id)`, 'total')
            .where('br.fiscal_yr = :fiscal_yr', { fiscal_yr })
            .groupBy('tc.abbre')
            .getRawMany();

        return data.map(row => {
            const competent = parseInt(row.competent, 10);
            const nyc = parseInt(row.nyc, 10);
            const absent = parseInt(row.absent, 10);
            const total = parseInt(row.total, 10);

            const rateC = total ? (competent / total) * 100 : 0;
            const rateN = total ? (nyc / total) * 100 : 0;
            const rateA = total ? (absent / total) * 100 : 0;

            return {
            trainingCenter: row.trainingCenter,

            competent,
            rateCompetent: +rateC.toFixed(2),

            nyc,
            rateNyc: +rateN.toFixed(2),

            absent,
            rateAbsent: +rateA.toFixed(2),
            };
        });
        }

async exportExcel(file_data: any): Promise<{ fileName: string }> {

  /* ================= DATA ================= */
  const billingRecord = file_data.data.billing_record[0];
  const billingPeriod = file_data.data.billing_period[0];

  const preparedBy = file_data.data.prepared_by;
  const preparedByPos = file_data.data.prepared_by_pos;
  const approvedBy = file_data.data.approved_by;
  const approvedByPos = file_data.data.approved_by_pos;

  const eSignSF = file_data.data.e_sign_sf;
  const eSignAdmin = file_data.data.e_sign_admin;

  const trainees = billingPeriod.list_trainees || [];

  /* ================= DATES ================= */
  const startDate = new Date(billingRecord.date_start);
  const endDate = new Date(billingRecord.date_end);

  const totalHours = this.diffInHours(startDate, endDate);
  const totalDays = this.diffInBusinessDays(startDate, endDate);

  /* ================= WORKBOOK ================= */
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(
    billingPeriod.bt_id?.description || 'Billing'
  );

  /* ================= HEADER ================= */
  sheet.addRow(['BILLING STATEMENT']).font = { bold: true };
  sheet.addRow([]);

  sheet.addRow([`RQM Code: ${billingRecord.ctrl_num}`]);
  sheet.addRow([`Type of Scholarship: ${billingRecord.sc_id?.description}`]);
  sheet.addRow([`Qualification: ${billingRecord.q_id?.description}`]);
  sheet.addRow([`Number of Slots: ${billingRecord.num_pax}`]);

  sheet.addRow([
    `Number of Hours/Days: ${totalHours} hours / ${totalDays} days`
  ]);

  sheet.addRow([
    `Training Duration: ${this.formatDate(startDate)} - ${this.formatDate(endDate)}`
  ]);

  sheet.addRow([]);

  /* ================= TABLE HEADER ================= */
  const headerRow = sheet.addRow([
    'No.',
    'Last Name',
    'First Name',
    'Extension',
    'Middle Name',
    billingPeriod.bt_id?.description || 'Training Cost'
  ]);

  headerRow.eachCell(cell => {
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

  /* ================= TABLE BODY ================= */
  trainees.forEach((t, i) => {
    const row = sheet.addRow([
      i + 1,
      t.lname,
      t.fname,
      t.extension || '',
      t.mname || '',
      Number(t.training_cost)
    ]);

    row.getCell(6).numFmt = '₱#,##0.00';

    row.eachCell((cell, col) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal:
          col === 1 ? 'center' :
          col === 6 ? 'right' : 'left'
      };
      cell.border = headerRow.getCell(1).border;
    });
  });

  /* ================= TOTAL ROW ================= */
  const total = trainees.reduce(
    (sum, t) => sum + Number(t.training_cost || 0),
    0
  );

  const totalRow = sheet.addRow(['', '', '', '', 'TOTAL', total]);
  totalRow.font = { bold: true };
  totalRow.getCell(6).numFmt = '₱#,##0.00';

  totalRow.eachCell((cell, col) => {
    cell.border = headerRow.getCell(1).border;
    cell.alignment = {
      vertical: 'middle',
      horizontal: col === 6 ? 'right' : 'left'
    };
  });

  /* ================= SIGNATURE SECTION ================= */
  sheet.addRow([]);

  // LABELS
  const labelRow = sheet.addRow([
    'Prepared by:', '', '',
    'Approved by:'
  ]);

  // SIGNATURE ROW
  const signRow = sheet.addRow(['', '', '', '', '', '']);
  signRow.height = 60;

  // NAMES
  const nameRow = sheet.addRow([
    preparedBy, '', '',
    approvedBy
  ]);

  // POSITIONS
  const posRow = sheet.addRow([
    preparedByPos, '', '',
    approvedByPos
  ]);

  /* ================= MERGE CELLS ================= */
  const r = labelRow.number;

  // Prepared by (A–C)
  sheet.mergeCells(`A${r}:C${r}`);
  sheet.mergeCells(`A${r + 1}:C${r + 1}`);
  sheet.mergeCells(`A${r + 2}:C${r + 2}`);
  sheet.mergeCells(`A${r + 3}:C${r + 3}`);

  // Approved by (D–F)
  sheet.mergeCells(`D${r}:F${r}`);
  sheet.mergeCells(`D${r + 1}:F${r + 1}`);
  sheet.mergeCells(`D${r + 2}:F${r + 2}`);
  sheet.mergeCells(`D${r + 3}:F${r + 3}`);

  /* ================= TEXT STYLING ================= */
  [labelRow, nameRow, posRow].forEach(row => {
    row.eachCell(cell => {
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  /* ================= ADD CENTERED SIGNATURE IMAGES ================= */
  const addCenteredImage = (base64: string, colStart: number) => {
    const imageId = workbook.addImage({
      base64: base64.replace(/^data:image\/\w+;base64,/, ''),
      extension: 'png'
    });

    sheet.addImage(imageId, {
      tl: { col: colStart + 0.5, row: signRow.number - 1 + 0.15 },
      ext: { width: 140, height: 45 }
    });
  };

  if (eSignSF) addCenteredImage(eSignSF, 0);
  if (eSignAdmin) addCenteredImage(eSignAdmin, 3);

  /* ================= COLUMN WIDTH ================= */
  sheet.columns = [
    { width: 6 },
    { width: 18 },
    { width: 18 },
    { width: 12 },
    { width: 18 },
    { width: 20 }
  ];

  /* ================= FILE ================= */
  const reportsDir = path.join(process.cwd(), '../exported_billing_periods');
  await fs.ensureDir(reportsDir);

  const rawFileName =
    `${billingRecord.ctrl_num}_${billingPeriod.bt_id.abbre}_${Date.now()}.xlsx`;

  const fileName = this.sanitizeFileName(rawFileName);
  const filePath = path.join(reportsDir, fileName);

  await workbook.xlsx.writeFile(filePath);

  return { fileName };
}

private sanitizeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|%]/g, '_');
}


private diffInHours(start: Date, end: Date, hoursPerDay = 8): number {
  let totalHours = 0;

  const current = new Date(start);
  current.setHours(0, 0, 0, 0);

  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);

  while (current <= endDate) {
    const day = current.getDay(); // 0 = Sunday, 6 = Saturday

    if (day !== 0 && day !== 6) {
      totalHours += hoursPerDay;
    }

    current.setDate(current.getDate() + 1);
  }

  return totalHours;
}


private diffInBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);

  while (current <= end) {
    const day = current.getDay();
    // 0 = Sunday, 6 = Saturday
    if (day !== 0 && day !== 6) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}





}
