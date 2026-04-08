import { DataSource, Repository } from "typeorm";
import { UserEntity } from './user.entity';
export declare class UserService {
    private i_repository;
    private dataSource;
    constructor(i_repository: Repository<UserEntity>, dataSource: DataSource);
    getAll(): Promise<UserEntity[]>;
    getAllByType(isActive: number): Promise<UserEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    getAllByPage(type: number, page: number, limit: number, search_data: {
        value: string;
        type: string;
    }): Promise<[UserEntity[], number]>;
    getAllByPageType(ut_id: number, page: number, limit: number): Promise<[UserEntity[], number]>;
    findUser(id: number): Promise<UserEntity>;
    searchNameByPage(page: number, limit: number, name: string): Promise<[UserEntity[], number]>;
    searchName(name: string): Promise<UserEntity[]>;
    findTypeofUser(name: string): Promise<UserEntity>;
    registerUser(user: UserEntity): Promise<UserEntity>;
    checkEmailExisted(email: string): Promise<UserEntity>;
    checkIfApproved(email: string): Promise<UserEntity>;
    checkIfActive(email: string): Promise<UserEntity>;
    updateProfilePic(data: any): Promise<import("typeorm").UpdateResult>;
    editUser(data: any): Promise<import("typeorm").UpdateResult>;
    saveEsign(userId: number, filename: string): Promise<UserEntity>;
    saveProfPic(userId: number, filename: string): Promise<UserEntity>;
    editEmail(data: any): Promise<import("typeorm").UpdateResult>;
    editPassword(data: any): Promise<{
        message: string;
    }>;
}
