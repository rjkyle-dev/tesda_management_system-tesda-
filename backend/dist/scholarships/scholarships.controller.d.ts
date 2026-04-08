import { ScholarshipsService } from "./scholarships.service";
import { ScholarshipsEntity } from "./scholarships.entity";
export declare class ScholarshipsController {
    private i_service;
    constructor(i_service: ScholarshipsService);
    getAll(): Promise<ScholarshipsEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<ScholarshipsEntity>;
    addItem(createUserOto: ScholarshipsEntity): Promise<ScholarshipsEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<ScholarshipsEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[ScholarshipsEntity[], number]>;
}
