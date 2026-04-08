import { DataSource, Repository } from "typeorm";
import { QualificationsEntity } from 'src/entities';
export declare class QualificationsService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<QualificationsEntity>, dataSource: DataSource);
    getAll(): Promise<QualificationsEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<QualificationsEntity>;
    addItem(user: QualificationsEntity): Promise<QualificationsEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<QualificationsEntity[]>;
    getAllByPage(page: number, limit: number, search_data: {
        value: string;
        type: string;
    }): Promise<[QualificationsEntity[], number]>;
}
