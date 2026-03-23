import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { BillingSetTypesEntity } from './billing_set_types.entity';
import { BillingTypesEntity } from 'src/entities';
@Injectable()
export class BillingSetTypesService {
    constructor(
        @InjectRepository(BillingSetTypesEntity)
        private readonly i_repository: Repository<BillingSetTypesEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("billing_set_types")
        .orderBy('billing_set_types.datetime_added', 'DESC')
        .getMany();
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("billing_set_types")
        .select("COUNT(billing_set_types.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("billing_set_types")
        .where("billing_set_types.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: BillingSetTypesEntity) : Promise<BillingSetTypesEntity>{

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
        order_num : data.order_num,
        bt_id : data.bt_id,
        sc_id : data.sc_id,
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

            return await this.i_repository.createQueryBuilder("billing_set_types")
            .where("billing_set_types.description LIKE :description OR billing_set_types.abbre LIKE :name", {name : `%${name}%`})
            .getMany();
        }

        async getAllByPage(page: number, limit : number){
        
            var start_from = (page-1) * limit;
        
            const query = this.i_repository.createQueryBuilder('billing_set_types');
        
            const results = await query
            .orderBy('billing_set_types.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit) 
            .getManyAndCount();
        
            return results;
        }

         async findBySCId(sc_id : number){

        return await this.i_repository.createQueryBuilder("billing_set_types")
        .leftJoinAndMapOne('billing_set_types.bt_id',BillingTypesEntity,'billing_type','billing_set_types.bt_id = billing_type.id')
        .where("billing_set_types.sc_id = :sc_id", {sc_id : sc_id})
        .getMany();
    }


}
