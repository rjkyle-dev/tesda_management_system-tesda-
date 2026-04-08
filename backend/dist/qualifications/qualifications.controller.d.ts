import { QualificationsService } from "./qualifications.service";
import { QualificationsEntity } from "./qualifications.entity";
export declare class QualificationsController {
    private i_service;
    constructor(i_service: QualificationsService);
    getAll(): Promise<QualificationsEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<QualificationsEntity>;
    addItem(createUserOto: QualificationsEntity): Promise<QualificationsEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<QualificationsEntity[]>;
    getAllByPage(page: number, limit: number, search_value: string, search_type: string): Promise<[QualificationsEntity[], number]>;
}
