import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { TrainingCentersTypeEntity } from './training_centers_type.entity';

@Injectable()
export class TrainingCentersTypeService {
    constructor(
        @InjectRepository(TrainingCentersTypeEntity)
        private readonly i_repository: Repository<TrainingCentersTypeEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("training_centers_type")
        .orderBy('training_centers_type.description', 'ASC')
        .getMany();
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("training_centers_type")
        .where("training_centers_type.id  = :id", {id : id})
        .getOne();
    }

}
