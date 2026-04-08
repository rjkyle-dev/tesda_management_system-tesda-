import { InsightsService } from "./insights.service";
import { InsightsEntity } from "./insights.entity";
export declare class InsightsController {
    private i_service;
    constructor(i_service: InsightsService);
    getAll(): Promise<any>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<InsightsEntity>;
    addItem(createUserOto: InsightsEntity): Promise<InsightsEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<InsightsEntity[]>;
    getDescription(score: number, report_name: string): Promise<InsightsEntity>;
}
