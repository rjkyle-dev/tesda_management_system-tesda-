import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { ScholarshipsEntity } from './scholarships.entity';

@Injectable()
export class ScholarshipsService {
    constructor(
        @InjectRepository(ScholarshipsEntity)
        private readonly i_repository: Repository<ScholarshipsEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("scholarships")
        .orderBy('scholarships.datetime_added', 'DESC')
        .getMany();
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("scholarships")
        .select("COUNT(scholarships.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }


    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("scholarships")
        .where("scholarships.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: ScholarshipsEntity) : Promise<ScholarshipsEntity>{

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
        description : data.description,
        abbre : data.abbre
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

            return await this.i_repository.createQueryBuilder("scholarships")
            .where("scholarships.name LIKE :name OR scholarships.abbre LIKE :name", {name : `%${name}%`})
            .getMany();
        }

        async getAllByPage(page: number, limit : number){
        
            var start_from = (page-1) * limit;
        
            const query = this.i_repository.createQueryBuilder('scholarships');
        
            const results = await query
            .orderBy('scholarships.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit) 
            .getManyAndCount();
        
            return results;
        }


}
