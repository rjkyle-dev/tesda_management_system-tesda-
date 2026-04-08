import { DataSource, Repository } from "typeorm";
import { InsightsEntity } from './insights.entity';
export declare class InsightsService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<InsightsEntity>, dataSource: DataSource);
    getAll(): Promise<any>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<InsightsEntity>;
    addItem(user: InsightsEntity): Promise<InsightsEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<InsightsEntity[]>;
    getDescription(score: number, report_name: string): Promise<InsightsEntity>;
}
