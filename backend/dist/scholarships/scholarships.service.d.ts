import { DataSource, Repository } from "typeorm";
import { ScholarshipsEntity } from './scholarships.entity';
export declare class ScholarshipsService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<ScholarshipsEntity>, dataSource: DataSource);
    getAll(): Promise<ScholarshipsEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<ScholarshipsEntity>;
    addItem(user: ScholarshipsEntity): Promise<ScholarshipsEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<ScholarshipsEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[ScholarshipsEntity[], number]>;
}
