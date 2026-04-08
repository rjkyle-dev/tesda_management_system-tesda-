import { DataSource, Repository } from "typeorm";
import { TrainingCentersTypeEntity } from './training_centers_type.entity';
export declare class TrainingCentersTypeService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<TrainingCentersTypeEntity>, dataSource: DataSource);
    getAll(): Promise<TrainingCentersTypeEntity[]>;
    findItem(id: number): Promise<TrainingCentersTypeEntity>;
}
