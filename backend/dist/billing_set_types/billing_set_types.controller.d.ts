import { BillingSetTypesService } from "./billing_set_types.service";
import { BillingSetTypesEntity } from "./billing_set_types.entity";
export declare class BillingSetTypesController {
    private i_service;
    constructor(i_service: BillingSetTypesService);
    getAll(): Promise<BillingSetTypesEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<BillingSetTypesEntity>;
    addItem(createUserOto: BillingSetTypesEntity): Promise<BillingSetTypesEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<BillingSetTypesEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[BillingSetTypesEntity[], number]>;
    findBySCId(sc_id: number): Promise<BillingSetTypesEntity[]>;
}
