import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { BillingRecordsEntity, BillingTypesEntity, TraineesEntity, UserEntity, UserProfileEntity } from 'src/entities';

@Injectable()
export class TraineesService {
    constructor(
        @InjectRepository(TraineesEntity)
        private readonly i_repository: Repository<TraineesEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("trainees")
        .orderBy('trainees.datetime_added', 'DESC')
        .getMany();
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("trainees")
        .select("COUNT(trainees.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("trainees")
        .leftJoinAndMapOne('trainees.ctrl_num',BillingRecordsEntity,'br','trainees.ctrl_num = br.ctrl_num')
        .where("trainees.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: TraineesEntity) : Promise<TraineesEntity>{

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

    async editItem(data:any){

        return await this.i_repository.update(data.id, { 
        fname : data.fname,
        mname : data.mname,
        lname : data.lname,
        extension : data.extension,
        sg_number : data.sg_number,
        training_cost : data.training_cost,
        ctrl_num : data.ctrl_num,
        bt_id : data.bt_id,
        status : data.status,
        });

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

            return await this.i_repository.createQueryBuilder("trainees")
            .where("trainees.fname LIKE :name OR trainees.mname LIKE :name OR trainees.lname LIKE :name", {name : `%${name}%`})
            .getMany();
        }

        async getAllByPage(page: number, limit : number){
        
            var start_from = (page-1) * limit;
        
            const query = this.i_repository.createQueryBuilder('trainees');
        
            query.leftJoinAndMapOne('trainees.ctrl_num',BillingRecordsEntity,'br','trainees.ctrl_num = br.ctrl_num')
        
            const results = await query
            .orderBy('trainees.lname', 'DESC')
            .skip(start_from)
            .take(limit) 
            .getManyAndCount();
        
            return results;
        }

        async findTraineesByCtrlNum(ctrl_num : string, bt_id : number){

        return await this.i_repository.createQueryBuilder("trainees")
        .leftJoinAndMapOne('trainees.ctrl_num',BillingRecordsEntity,'br','trainees.ctrl_num = br.ctrl_num')
        .where("trainees.ctrl_num = :ctrl_num AND trainees.bt_id = :bt_id", {ctrl_num : ctrl_num, bt_id : bt_id})
        .getMany();
    }

    async addMany(trainees: TraineesEntity[]): Promise<TraineesEntity[]> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const res = await queryRunner.manager.save(TraineesEntity, trainees);
            await queryRunner.commitTransaction();
            return res;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    // async updateMany(trainees: Partial<TraineesEntity>[]): Promise<any> {
    //     const queryRunner = this.dataSource.createQueryRunner();
    //     await queryRunner.startTransaction();

    //     try {
    //         for (const t of trainees) {
    //             await this.i_repository.update(
    //                 { id: t.id, ctrl_num: t.ctrl_num, bt_id: t.bt_id }, // match by id, ctrl_num, bt_id
    //                 {
    //                     fname: t.fname,
    //                     mname: t.mname,
    //                     lname: t.lname,
    //                     extension: t.extension,
    //                     sg_number: t.sg_number,
    //                     training_cost: t.training_cost,
    //                     status: t.status,
    //                 }
    //             );
    //         }

    //         await queryRunner.commitTransaction();
    //         return { message: 'Trainees updated successfully' };
    //     } catch (err) {
    //         await queryRunner.rollbackTransaction();
    //         throw err;
    //     } finally {
    //         await queryRunner.release();
    //     }
    // }

    async updateMany(trainees: Partial<TraineesEntity>[]): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
        for (const t of trainees) {
            // 1️⃣ Update the current record first
            await this.i_repository.update(
                { id: t.id, ctrl_num: t.ctrl_num },
                {
                    fname: t.fname,
                    mname: t.mname,
                    lname: t.lname,
                    extension: t.extension,
                    sg_number: t.sg_number,
                    training_cost: t.training_cost,
                    status: t.status,
                }
            );

             await this.i_repository
                    .createQueryBuilder()
                    .update(TraineesEntity)
                    .set({ status: t.status, training_cost: t.training_cost })
                    .where('sg_number = :sg_number', { sg_number: t.sg_number })
                    .andWhere('ctrl_num = :ctrl_num', { ctrl_num: t.ctrl_num })
                    .andWhere('id > :id', { id: t.id }) // use id instead of bt_id
                    .execute();

            // if (t.status === 'dropped') {
            //     await this.i_repository
            //         .createQueryBuilder()
            //         .update(TraineesEntity)
            //         .set({ status: 'dropped', training_cost: 0 })
            //         .where('sg_number = :sg_number', { sg_number: t.sg_number })
            //         .andWhere('ctrl_num = :ctrl_num', { ctrl_num: t.ctrl_num })
            //         .andWhere('id > :id', { id: t.id }) // use id instead of bt_id
            //         .execute();
            // }

               
        }

        await queryRunner.commitTransaction();
        return { message: 'Trainees updated successfully' };
    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
    } finally {
        await queryRunner.release();
    }
}

//WORKING
// async getTraineesSummary(ctrl_num: string) {
//     // Step 1: Fetch the trainees with their billing type and training cost using getRawMany
//     const trainees = await this.i_repository.createQueryBuilder("trainees")
//         .leftJoin('billing_records', 'br', 'trainees.ctrl_num = br.ctrl_num')
//         .leftJoin('billing_types', 'bt', 'trainees.bt_id = bt.id')  // Join billing_types table directly
//         .where("trainees.ctrl_num = :ctrl_num", { ctrl_num })
//         .select([
//             'trainees.fname',
//             'trainees.mname',
//             'trainees.lname',
//             'trainees.extension',
//             'trainees.status',
//             'trainees.bt_id',
//             'trainees.training_cost',
//             'trainees.date_dropped',
//             'bt.id AS bt_id',       // billing_types id
//             'bt.abbre AS bt_abbre'  // billing_types abbre
//         ])
//         .getRawMany();  // Use getRawMany to get raw query results

//     // Step 2: Fetch unique bt_id values from trainees to filter the relevant billing types
//     const traineeBtIds = trainees.map(t => t.bt_id); // Get all bt_ids from trainees

//     // Step 3: Fetch only the relevant BillingTypes based on the bt_id values
//     const billingTypes = await this.i_repository.manager
//         .createQueryBuilder()
//         .select(['id', 'abbre'])
//         .from('billing_types', 'bt')
//         .where('bt.id IN (:...ids)', { ids: traineeBtIds })  // Filter based on the bt_ids found in trainees
//         .getRawMany(); // Raw result: [{ id: 1, abbre: 'BT1' }, ...]

//     // Step 4: Group trainees by fullname
//     const grouped: Record<string, any> = {};

//     trainees.forEach(t => {
//         const fullName = `${t.trainees_fname} ${t.trainees_mname || ''} ${t.trainees_lname} ${t.trainees_extension || ''}`.trim();

//         // Initialize the group if it doesn't exist
//         if (!grouped[fullName]) {
//             grouped[fullName] = {
//                 fullName,
//                 bt_costs: {},  // Store costs for each bt_id here,
//                 status: t.trainees_status,
//                 date_dropped: t.trainees_date_dropped,
//             };
//         }

//         // Map the training cost for the corresponding bt_id
//         if (t.bt_id) {
//             grouped[fullName].bt_costs[`bt_${t.bt_id}`] = t.trainees_training_cost;
//         }
//     });

//     // Step 5: Format headers dynamically from the raw billingTypes
//     const headers = billingTypes.map(bt => ({
//         id: `bt_${bt.id}`,    // Header ID based on bt_id
//         description: bt.abbre // Use abbre as the header label
//     }));

//     // Step 6: Format the grouped data into the desired output
//     const data = Object.values(grouped).map(t => {
//         const result: any = {
//             fullName: t.fullName,
//             status: t.status,
//             date_dropped: t.date_dropped,
//         };

//         // Add the training cost for each bt_id as columns
//         headers.forEach(h => {
//             result[h.id] = t.bt_costs[h.id] || 0;  // Default to 0 if no cost is present
//         });

//         return result;
//     });

//     // Step 7: Return headers and formatted data
//     return { headers, data };
// }


async getTraineesSummary(ctrl_num: string) {

    /**
     * STEP 1: Fetch trainees with billing types
     * IMPORTANT:
     * - MAX(date_dropped) prevents null override when multiple bt_id exist
     */
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

    /**
     * STEP 2: Collect unique billing type IDs
     */
    const traineeBtIds = [...new Set(trainees.map(t => t.bt_id))];

    /**
     * STEP 3: Fetch billing type headers
     */
    const billingTypes = await this.i_repository.manager
        .createQueryBuilder()
        .select(['bt.id AS id', 'bt.abbre AS abbre'])
        .from('billing_types', 'bt')
        .where('bt.id IN (:...ids)', { ids: traineeBtIds })
        .getRawMany();

    /**
     * STEP 4: Group trainees by full name
     */
    const grouped: Record<string, any> = {};

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

        // Preserve non-null date_dropped
        if (!grouped[fullName].date_dropped && t.trainees_date_dropped) {
            grouped[fullName].date_dropped = t.trainees_date_dropped;
        }

        if (t.bt_id) {
            grouped[fullName].bt_costs[`bt_${t.bt_id}`] = t.trainees_training_cost;
        }
    });

    /**
     * STEP 5: Build dynamic headers
     */
    const headers = billingTypes.map(bt => ({
        id: `bt_${bt.id}`,
        description: bt.abbre,
    }));

    /**
     * STEP 6: Final formatting + dropped logic
     */
    const data = Object.values(grouped).map((t: any) => {
        const result: any = {
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

    /**
     * STEP 7: Return final response
     */
    return { headers, data };
}


    


}
