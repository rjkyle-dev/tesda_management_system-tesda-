import { BillingRecordsService } from "./billing_records.service";
import { BillingRecordsEntity } from "./billing_records.entity";
export declare class BillingRecordsController {
    private i_service;
    constructor(i_service: BillingRecordsService);
    getAll(): Promise<BillingRecordsEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<BillingRecordsEntity>;
    addItem(createUserOto: BillingRecordsEntity): Promise<BillingRecordsEntity>;
    editItem(data: any): Promise<BillingRecordsEntity>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<BillingRecordsEntity[]>;
    getAllByPage(page: number, limit: number, status: number, search_type: string, search_value: string): Promise<[BillingRecordsEntity[], number]>;
    getAllByPageType(isWorkback: number, page: number, limit: number): Promise<[BillingRecordsEntity[], number]>;
    getAllByPageTypeUser(tc_id: number, isWorkback: number, page: number, limit: number, status: number, search_value: string, search_type: string): Promise<[BillingRecordsEntity[], number]>;
    updateStatus(data: any): Promise<import("typeorm").UpdateResult>;
}
