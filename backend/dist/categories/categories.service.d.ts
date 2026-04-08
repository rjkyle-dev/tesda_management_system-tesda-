import { DataSource, Repository } from "typeorm";
import { CategoriesEntity } from './categories.entity';
export declare class CategoriesService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<CategoriesEntity>, dataSource: DataSource);
    getAll(): Promise<CategoriesEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<CategoriesEntity>;
    addItem(user: CategoriesEntity): Promise<CategoriesEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<CategoriesEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[CategoriesEntity[], number]>;
}
