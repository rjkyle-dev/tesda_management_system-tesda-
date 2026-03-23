import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { UserTypesEntity } from './user_types.entity';

@Injectable()
export class UserTypesService {
    constructor(
        @InjectRepository(UserTypesEntity)
        private readonly i_repository: Repository<UserTypesEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("user_types")
        .orderBy('user_types.description', 'ASC')
        .getMany();
    }

    async findTypeUser(id : number){

        return await this.i_repository.createQueryBuilder("user_types")
        .where("user_types.id  = :id", {id : id})
        .getOne();
    }

}
