import { DataSource, Repository } from "typeorm";
import { BillingTypesEntity } from './billing_types.entity';
export declare class BillingTypesService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<BillingTypesEntity>, dataSource: DataSource);
    getAll(): Promise<BillingTypesEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<BillingTypesEntity>;
    addItem(user: BillingTypesEntity): Promise<BillingTypesEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<BillingTypesEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[BillingTypesEntity[], number]>;
}
