import { DataSource, Repository } from "typeorm";
import { BillingRecordsEntity } from './billing_records.entity';
export declare class BillingRecordsService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<BillingRecordsEntity>, dataSource: DataSource);
    getAll(): Promise<BillingRecordsEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<BillingRecordsEntity>;
    addItem(user: BillingRecordsEntity): Promise<BillingRecordsEntity>;
    editItem(data: any): Promise<BillingRecordsEntity>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<BillingRecordsEntity[]>;
    getAllByPage(page: number, limit: number, status: number, search_data?: {
        type: string;
        value: string;
    }): Promise<[BillingRecordsEntity[], number]>;
    getAllByPageType(isWorkback: number, page: number, limit: number): Promise<[BillingRecordsEntity[], number]>;
    getAllByPageTypeUser(tc_id: number, isWorkback: number, page: number, limit: number, status: number, search_data: {
        value: string;
        type: string;
    }): Promise<[BillingRecordsEntity[], number]>;
    updateStatus(data: any): Promise<import("typeorm").UpdateResult>;
}
