import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { BillingRecordsEntity } from './billing_records.entity';
import { BillingPeriodsEntity, NotificationsEntity, QualificationsEntity, ScholarshipsEntity, TraineesEntity, TrainingCentersEntity } from 'src/entities';

@Injectable()
export class BillingRecordsService {
    constructor(
        @InjectRepository(BillingRecordsEntity)
        private readonly i_repository: Repository<BillingRecordsEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("billing_records")
        .orderBy('billing_records.datetime_added', 'DESC')
        .getMany();
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("billing_records")
        .select("COUNT(billing_records.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("billing_records")
        .leftJoinAndMapOne('billing_records.tc_id',TrainingCentersEntity,'training_center','billing_records.tc_id = training_center.id')
        .leftJoinAndMapOne('billing_records.sc_id',ScholarshipsEntity,'scholarship','billing_records.sc_id = scholarship.id')
        .leftJoinAndMapOne('billing_records.q_id',QualificationsEntity,'qualification','billing_records.q_id = qualification.id')
        .where("billing_records.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: BillingRecordsEntity): Promise<BillingRecordsEntity> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1️⃣ Save billing record
            const savedRecord = await queryRunner.manager.save(BillingRecordsEntity, user);

            // 2️⃣ Create notification for PO staff
            const notification = queryRunner.manager.create(NotificationsEntity, {
                title: 'New Billing Submission',
                message: `A new billing record has been submitted: ${savedRecord.ctrl_num}`,
                type: 'billing_submission',
                reference_id: savedRecord.id,
                reference_type: 'billing',
                created_by: user.uploaded_by, // the TC staff who submitted
                datetime_created: new Date(),
            });

            await queryRunner.manager.save(notification);

            // 3️⃣ Commit transaction
            await queryRunner.commitTransaction();

            return savedRecord;

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err; // rethrow so the controller can handle it
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
        await queryRunner.manager.update(BillingRecordsEntity, data.id, { 
            ctrl_num : data.ctrl_num,
            tc_id : data.tc_id,
            sc_id : data.sc_id,
            q_id : data.q_id,
            batch_name : data.batch_name,
            num_pax : data.num_pax,
            billed_amount : data.billed_amount,
            remarks : data.remarks,
            status_id : data.status_id,
            datetime_received : data.datetime_received,
            datetime_billed : data.datetime_billed,
            date_end : data.date_end,
            date_start : data.date_start,
            fiscal_yr : data.fiscal_yr,
        });

        // 2️⃣ Fetch updated record
        const updatedRecord = await queryRunner.manager.findOne(BillingRecordsEntity, { where: { id: data.id } });

        // 3️⃣ Create notification
        const notification = queryRunner.manager.create(NotificationsEntity, {
            title: 'Billing Record Updated',
            message: `Billing record ${updatedRecord.ctrl_num} has been updated.`,
            type: 'billing_update',
            reference_id: updatedRecord.id,
            reference_type: 'billing',
            created_by: updatedRecord.uploaded_by,
            // ✅ Convert Date to string for DB
            datetime_added: new Date().toISOString(), 
        } as Partial<NotificationsEntity>); // cast to Partial to satisfy TypeORM

        await queryRunner.manager.save(notification);

        // 4️⃣ Commit transaction
        await queryRunner.commitTransaction();

        return updatedRecord;

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

            return await this.i_repository.createQueryBuilder("billing_records")
            .where("billing_records.name LIKE :name OR billing_records.abbre LIKE :name", {name : `%${name}%`})
            .getMany();
        }

        async getAllByPage(
            page: number,
            limit: number,
            status: number,
            search_data?: { type: string; value: string }
        ) {
            const start_from = (page - 1) * limit;

            const query = this.i_repository.createQueryBuilder('billing_records')
                .leftJoinAndMapOne(
                    'billing_records.tc_id',
                    TrainingCentersEntity,
                    'training_center',
                    'billing_records.tc_id = training_center.id'
                )
                .leftJoinAndMapOne(
                    'billing_records.q_id',
                    QualificationsEntity,
                    'qualification',
                    'billing_records.q_id = qualification.id'
                )
                .leftJoinAndMapOne(
                    'billing_records.current_billing',
                    BillingPeriodsEntity,
                    'billing_period',
                    `billing_period.id = (
                        SELECT bp.id
                        FROM billing_periods bp
                        WHERE bp.ctrl_num = billing_records.ctrl_num
                        AND (bp.status IS NULL OR bp.status = 0)
                        ORDER BY bp.id ASC
                        LIMIT 1
                    )`
                )
                .orderBy('billing_records.datetime_added', 'DESC')
                .where('billing_records.isWorkback = 0')
                .andWhere('billing_records.status_id = :status', {status : status})
                .skip(start_from)
                .take(limit);

            // filter by billing existence based on selected status
            if (status === 1) {
                // WITH current billing
                query.andWhere('billing_period.id IS NOT NULL');
            }

            if (status === 3) {
                // WITHOUT current billing
                query.andWhere('billing_period.id IS NULL');
            }

            // 🔍 Apply search filter (optional)
            if (search_data?.value && search_data?.type === 'search') {
                query.andWhere('(billing_records.ctrl_num LIKE :value OR billing_records.batch_name LIKE :value)', {
                    value: `%${search_data.value}%`,
                });
            }

            return await query.getManyAndCount();
        }

        // async getAllByPage(
        //     page: number,
        //     limit: number,
        //     status: number,
        //     search_data?: { type: string; value: string }
        // ) {
        //     const start_from = (page - 1) * limit;

        //     const query = this.i_repository
        //         .createQueryBuilder('billing_records')

        //         // Training Center
        //         .leftJoinAndMapOne(
        //             'billing_records.tc_id',
        //             TrainingCentersEntity,
        //             'training_center',
        //             'billing_records.tc_id = training_center.id'
        //         )

        //         // Qualification
        //         .leftJoinAndMapOne(
        //             'billing_records.q_id',
        //             QualificationsEntity,
        //             'qualification',
        //             'billing_records.q_id = qualification.id'
        //         )

        //         // 🔹 Current billing (SEPARATED, not mapped to billing_records)
        //         .leftJoin(
        //             BillingPeriodsEntity,
        //             'current_billing',
        //             `
        //             current_billing.id = (
        //                 SELECT bp.id
        //                 FROM billing_periods bp
        //                 WHERE bp.ctrl_num = billing_records.ctrl_num
        //                 AND (bp.status IS NULL OR bp.status = 0)
        //                 ORDER BY bp.id ASC
        //                 LIMIT 1
        //             )
        //             `
        //         )
        //         .addSelect('current_billing')

        //         .where('billing_records.isWorkback = 0')
        //         .andWhere('billing_records.status_id = :status', { status })
        //         .orderBy('billing_records.datetime_added', 'DESC')
        //         .skip(start_from)
        //         .take(limit);

        //     // ✅ Status-based filter
        //     // if (status === 1) {
        //     //     query.andWhere('current_billing.id IS NOT NULL');
        //     // }

        //     // 🔍 Search filter (optional)
        //     if (search_data?.value && search_data?.type === 'search') {
        //         query.andWhere(
        //             `(billing_records.ctrl_num LIKE :value
        //             OR billing_records.batch_name LIKE :value)`,
        //             { value: `%${search_data.value}%` }
        //         );
        //     }

        //     return await query.getManyAndCount();
        // }


        // async getAllByPageType(isWorkback: number, page: number, limit : number){
        
        //     var start_from = (page-1) * limit;
        
        //     const query = this.i_repository.createQueryBuilder('billing_records')
        //     .leftJoinAndMapOne('billing_records.tc_id',TrainingCentersEntity,'training_center','billing_records.tc_id = training_center.id')
        //     .leftJoinAndMapOne('billing_records.q_id',QualificationsEntity,'qualification','billing_records.q_id = qualification.id');
        
        //     const results = await query
        //     .where("billing_records.isWorkback = :isWorkback", {isWorkback : isWorkback})
        //     .orderBy('billing_records.datetime_added', 'DESC')
        //     .skip(start_from)
        //     .take(limit) 
        //     .getManyAndCount();
        
        //     return results;
        // }

        async getAllByPageType(isWorkback: number, page: number, limit: number) {
        const start_from = (page - 1) * limit;

        const query = this.i_repository.createQueryBuilder('billing_records')
            .leftJoinAndMapOne(
                'billing_records.tc_id',
                TrainingCentersEntity,
                'training_center',
                'billing_records.tc_id = training_center.id'
            )
            .leftJoinAndMapOne(
                'billing_records.q_id',
                QualificationsEntity,
                'qualification',
                'billing_records.q_id = qualification.id'
            )
            .leftJoinAndMapOne(
                'billing_records.current_billing',
                BillingPeriodsEntity,
                'billing_period',
                `billing_period.id = (
                    SELECT bp.id
                    FROM billing_periods bp
                    WHERE bp.ctrl_num = billing_records.ctrl_num
                    AND (bp.status IS NULL OR bp.status = 0)
                    ORDER BY bp.id ASC
                    LIMIT 1
                )`
            )
            .where('billing_records.isWorkback = :isWorkback', { isWorkback })
            .orderBy('billing_records.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit);

        const results = await query.getManyAndCount();
        return results;
    }

    // async getAllByPageTypeUser(tc_id: number, isWorkback: number, page: number, limit: number, search_data: any) {
    //     const start_from = (page - 1) * limit;

    //     const query = this.i_repository.createQueryBuilder('billing_records')
    //         .leftJoinAndMapOne(
    //             'billing_records.tc_id',
    //             TrainingCentersEntity,
    //             'training_center',
    //             'billing_records.tc_id = training_center.id'
    //         )
    //         .leftJoinAndMapOne(
    //             'billing_records.q_id',
    //             QualificationsEntity,
    //             'qualification',
    //             'billing_records.q_id = qualification.id'
    //         )
    //         .leftJoinAndMapOne(
    //             'billing_records.current_billing',
    //             BillingPeriodsEntity,
    //             'billing_period',
    //             `billing_period.id = (
    //                 SELECT bp.id
    //                 FROM billing_periods bp
    //                 WHERE bp.ctrl_num = billing_records.ctrl_num
    //                 AND (bp.status IS NULL OR bp.status = 0)
    //                 ORDER BY bp.id ASC
    //                 LIMIT 1
    //             )`
    //         )
    //         .where('billing_records.isWorkback = :isWorkback', { isWorkback })
    //         .andWhere('billing_records.tc_id = :tc_id', { tc_id : tc_id })
    //         .orderBy('billing_records.datetime_added', 'DESC')
    //         .skip(start_from)
    //         .take(limit);

    //     const results = await query.getManyAndCount();
    //     return results;
    // }

    async getAllByPageTypeUser(
        tc_id: number,
        isWorkback: number,
        page: number,
        limit: number,
        status: number,
        search_data: { value: string; type: string }
    ) {

        const start_from = (page - 1) * limit;

        const query = this.i_repository.createQueryBuilder('billing_records')
            .leftJoinAndMapOne(
                'billing_records.tc_id',
                TrainingCentersEntity,
                'training_center',
                'billing_records.tc_id = training_center.id'
            )
            .leftJoinAndMapOne(
                'billing_records.q_id',
                QualificationsEntity,
                'qualification',
                'billing_records.q_id = qualification.id'
            )
            .leftJoinAndMapOne(
                'billing_records.current_billing',
                BillingPeriodsEntity,
                'billing_period',
                `billing_period.id = (
                    SELECT bp.id
                    FROM billing_periods bp
                    WHERE bp.ctrl_num = billing_records.ctrl_num
                    AND (bp.status IS NULL OR bp.status = 0)
                    ORDER BY bp.id ASC
                    LIMIT 1
                )`
            )
            .where('billing_records.isWorkback = :isWorkback', { isWorkback })
            .andWhere('billing_records.tc_id = :tc_id', { tc_id })
            .andWhere('billing_records.status_id = :status', { status })
            .orderBy('billing_records.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit);

        // 🔍 Apply SEARCH if provided
        if (search_data?.value && search_data?.type === 'search') {
            query.andWhere('(billing_records.ctrl_num LIKE :value OR billing_records.batch_name LIKE :value)', {
                value: `%${search_data.value}%`
            });
        }

        return await query.getManyAndCount();
    }

          async updateStatus(data: any) {
            if (data.status_id === 1) {

                return await this.i_repository.update(data.id, {
                status_id: data.status_id,
                remarks: data.remarks,
                });

            }
            else{
                return await this.i_repository.update(data.id, {
                status_id: data.status_id,
                remarks: data.remarks,
                });
            } 
        }

        // async updateStatus(data: any) {
        // if (data.status_id === 1) {
        //     // Step 1: Get current year
        //     const year = new Date().getFullYear();

        //     // Step 2: Get max counter from billing_records table
        //     const maxRecord = await this.i_repository
        //     .createQueryBuilder("billing_records")
        //     .select("MAX(CAST(SUBSTRING(billing_records.ctrl_num, -4) AS UNSIGNED))", "maxCounter")
        //     .getRawOne();

        //     // Extract max counter or 0 if none
        //     const maxCounter = maxRecord?.maxCounter ?? 0;

        //     // Step 3: Increment counter and pad with leading zeros (4 digits)
        //     const newCounter = (maxCounter + 1).toString().padStart(4, '0');

        //     // Step 4: Generate formatted ID
        //     const formattedId = `PQM-${year}-${data.sc_id.abbre}-${data.code}-${newCounter}`;

        //     // Step 5: Update with both status_id and formatted ID
        //     return await this.i_repository.update(data.id, {
        //     status_id: data.status_id,
        //     ctrl_num: formattedId,
        //     remarks: data.remarks,
        //     approved_pax : data.approved_pax
        //     });
        // } else {
        //     // Just update status_id normally
        //     return await this.i_repository.update(data.id, {
        //     status_id: data.status_id,
        //     remarks: data.remarks,
        //     });
        // }
        // }

       // billing.service.ts

        
}
