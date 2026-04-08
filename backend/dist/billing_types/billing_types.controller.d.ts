import { BillingTypesService } from "./billing_types.service";
import { BillingTypesEntity } from "./billing_types.entity";
export declare class BillingTypesController {
    private i_service;
    constructor(i_service: BillingTypesService);
    getAll(): Promise<BillingTypesEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<BillingTypesEntity>;
    addItem(createUserOto: BillingTypesEntity): Promise<BillingTypesEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<BillingTypesEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[BillingTypesEntity[], number]>;
}
