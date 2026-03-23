import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { UserEntity, UserProfileEntity } from 'src/entities';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfileEntity)
        private readonly i_repository: Repository<UserProfileEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("user_profile")
        .orderBy('user_profile.datetime_added', 'DESC')
        .getMany();
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("user_profile")
        .select("COUNT(user_profile.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("user_profile")
        .where("user_profile.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: UserProfileEntity) : Promise<UserProfileEntity>{

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

        return await this.i_repository.update({ user_id : data.user_id}, { 
        fname : data.fname,
        mname : data.mname,
        lname : data.lname,
        phone_number : data.phone_number,
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

            return await this.i_repository.createQueryBuilder("user_profile")
            .where("user_profile.name LIKE :name OR user_profile.abbre LIKE :name", {name : `%${name}%`})
            .getMany();
        }

        async getAllByPage(page: number, limit : number){
        
            var start_from = (page-1) * limit;
        
            const query = this.i_repository.createQueryBuilder('user_profile');
        
            query.leftJoinAndMapOne('user_profile.administrator_id',UserEntity,'admin_id','user_profile.administrator_id = admin_id.id')
            .leftJoinAndMapOne('user_profile.sc_focal_id',UserEntity,'focal_id','user_profile.sc_focal_id = focal_id.id')
        
            const results = await query
            .orderBy('user_profile.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit) 
            .getManyAndCount();
        
            return results;
        }


}
