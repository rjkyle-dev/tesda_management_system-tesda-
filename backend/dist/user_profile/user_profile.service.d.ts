import { DataSource, Repository } from "typeorm";
import { UserProfileEntity } from 'src/entities';
export declare class UserProfileService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<UserProfileEntity>, dataSource: DataSource);
    getAll(): Promise<UserProfileEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<UserProfileEntity>;
    addItem(user: UserProfileEntity): Promise<UserProfileEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<UserProfileEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[UserProfileEntity[], number]>;
}
