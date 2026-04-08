import { DataSource, Repository } from "typeorm";
import { TraineesEntity } from 'src/entities';
export declare class TraineesService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<TraineesEntity>, dataSource: DataSource);
    getAll(): Promise<TraineesEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<TraineesEntity>;
    addItem(user: TraineesEntity): Promise<TraineesEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<TraineesEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[TraineesEntity[], number]>;
    findTraineesByCtrlNum(ctrl_num: string, bt_id: number): Promise<TraineesEntity[]>;
    addMany(trainees: TraineesEntity[]): Promise<TraineesEntity[]>;
    updateMany(trainees: Partial<TraineesEntity>[]): Promise<any>;
    getTraineesSummary(ctrl_num: string): Promise<{
        headers: {
            id: string;
            description: any;
        }[];
        data: any[];
    }>;
}
