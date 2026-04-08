import { DataSource, Repository } from "typeorm";
import { BillingSetTypesEntity } from './billing_set_types.entity';
export declare class BillingSetTypesService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<BillingSetTypesEntity>, dataSource: DataSource);
    getAll(): Promise<BillingSetTypesEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<BillingSetTypesEntity>;
    addItem(user: BillingSetTypesEntity): Promise<BillingSetTypesEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<BillingSetTypesEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[BillingSetTypesEntity[], number]>;
    findBySCId(sc_id: number): Promise<BillingSetTypesEntity[]>;
}
