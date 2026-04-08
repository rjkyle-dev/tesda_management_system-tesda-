import { StreamableFile } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
export declare class UserController {
    private i_service;
    constructor(i_service: UserService);
    getAll(): Promise<UserEntity[]>;
    getAllByType(isActive: number): Promise<UserEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    getAllByPageTypeUser(type: number, page: number, limit: number, search_value: string, search_type: string): Promise<[UserEntity[], number]>;
    getAllByPageType(ut_id: number, page: number, limit: number): Promise<[UserEntity[], number]>;
    findUser(user_id: number): Promise<UserEntity>;
    searchNameByPage(page: number, limit: number, name: string): Promise<[UserEntity[], number]>;
    searchName(name: string): Promise<UserEntity[]>;
    findTypeofUser(name: string): Promise<UserEntity>;
    registerUser(createUserOto: UserEntity): Promise<UserEntity>;
    uploadEsign(file: Express.Multer.File, id: number, req: any): Promise<UserEntity>;
    uploadPic(file: Express.Multer.File, id: number, req: any): Promise<UserEntity>;
    updateProfilePic(createUserOto: UserEntity): Promise<import("typeorm").UpdateResult>;
    getFile(filename: string, filetype: string, res: any): StreamableFile;
    editUser(createUserOto: UserEntity): Promise<import("typeorm").UpdateResult>;
    editEmail(createUserOto: UserEntity): Promise<import("typeorm").UpdateResult>;
    editPassword(createUserOto: UserEntity): Promise<{
        message: string;
    }>;
}
