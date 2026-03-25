import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { InsightsEntity } from './insights.entity';

@Injectable()
export class InsightsService {
    constructor(
        @InjectRepository(InsightsEntity)
        private readonly i_repository: Repository<InsightsEntity>,
        private dataSource: DataSource
    ) { }

    async getAll() {
        // Plain SQL avoids TypeORM entity hydration issues (e.g. DECIMAL/TEXT vs default column mapping).
        const rows = await this.dataSource.query(
            'SELECT id, from_score, to_score, description, report_name FROM insights ORDER BY id ASC',
        );
        return rows.map((row: Record<string, unknown>) => ({
            id: Number(row.id),
            from_score: row.from_score != null ? Number(row.from_score) : 0,
            to_score: row.to_score != null ? Number(row.to_score) : 0,
            description: row.description ?? '',
            report_name: row.report_name ?? '',
        }));
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("insights")
        .select("COUNT(insights.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("insights")
        .where("insights.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: InsightsEntity) : Promise<InsightsEntity>{

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
        from_score : data.from_score,
        to_score : data.to_score,
        description : data.description,
        report_name : data.report_name,
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

            return await this.i_repository.createQueryBuilder("insights")
            .where("insights.fname LIKE :name OR insights.mname LIKE :name OR insights.lname LIKE :name", {name : `%${name}%`})
            .getMany();
        }


      async getDescription(score: number, report_name: string) {
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

}
