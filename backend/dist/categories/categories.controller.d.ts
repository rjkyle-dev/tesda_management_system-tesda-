import { CategoriesService } from "./categories.service";
import { CategoriesEntity } from "./categories.entity";
export declare class CategoriesController {
    private i_service;
    constructor(i_service: CategoriesService);
    getAll(): Promise<CategoriesEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<CategoriesEntity>;
    addItem(createUserOto: CategoriesEntity): Promise<CategoriesEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<CategoriesEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[CategoriesEntity[], number]>;
}
