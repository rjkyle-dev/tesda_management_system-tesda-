import { DataSource, Repository } from "typeorm";
import { TrainingCentersEntity } from './training_centers.entity';
import { QualificationsEntity } from 'src/entities';
export declare class TrainingCentersService {
    private readonly i_repository;
    private readonly q_repository;
    private dataSource;
    constructor(i_repository: Repository<TrainingCentersEntity>, q_repository: Repository<QualificationsEntity>, dataSource: DataSource);
    getAll(): Promise<TrainingCentersEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<TrainingCentersEntity>;
    addItem(user: TrainingCentersEntity): Promise<TrainingCentersEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<TrainingCentersEntity[]>;
    getAllByPage(page: number, limit: number, search_data: {
        value: string;
        type: string;
    }): Promise<[TrainingCentersEntity[], number]>;
    generateSummaryTrainingCenters(file_data: any): Promise<Buffer>;
    getTrainingCenterSummaryData(): Promise<any[]>;
}
