import { DataSource, Repository } from "typeorm";
import { UserMenuEntity } from './user_menu.entity';
export declare class UserMenuService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<UserMenuEntity>, dataSource: DataSource);
    getAll(): Promise<UserMenuEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    getAllByPage(page: number, limit: number): Promise<UserMenuEntity[]>;
    findItem(id: number): Promise<UserMenuEntity>;
    addItem(user: UserMenuEntity): Promise<UserMenuEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<UserMenuEntity[]>;
    getAllPage(page: number, limit: number): Promise<UserMenuEntity[]>;
}
