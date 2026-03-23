import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { CategoriesEntity, QualificationsEntity } from 'src/entities';

@Injectable()
export class QualificationsService {
    constructor(
        @InjectRepository(QualificationsEntity)
        private readonly i_repository: Repository<QualificationsEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("qualifications")
        .orderBy('qualifications.datetime_added', 'DESC')
        .getMany();
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("qualifications")
        .select("COUNT(qualifications.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("qualifications")
        .leftJoinAndMapOne('qualifications.category_id',CategoriesEntity,'category','qualifications.category_id = category.id')
        .where("qualifications.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: QualificationsEntity) : Promise<QualificationsEntity>{

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
        hrs : data.hrs,
        days : data.days,
        category_id : data.category_id
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

            return await this.i_repository.createQueryBuilder("qualifications")
            .where("qualifications.name LIKE :name OR qualifications.abbre LIKE :name", {name : `%${name}%`})
            .getMany();
        }

        async getAllByPage(page: number, limit : number, search_data: { value: string; type: string }){
        
            var start_from = (page-1) * limit;
        
            const query = this.i_repository.createQueryBuilder('qualifications')
            .leftJoinAndMapOne('qualifications.category_id',CategoriesEntity,'category','qualifications.category_id = category.id');
        
            const results = await query
            .orderBy('qualifications.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit) 

             // 🔍 Apply SEARCH if provided
            if (search_data?.value && search_data?.type === 'search') {
                query.andWhere('(qualifications.description LIKE :value)', {
                    value: `%${search_data.value}%`
                });
            }

            return results.getManyAndCount();
        }


}
