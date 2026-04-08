import { UserProfileEntity } from "./user_profile.entity";
import { UserProfileService } from "./user_profile.service";
export declare class UserProfileController {
    private i_service;
    constructor(i_service: UserProfileService);
    getAll(): Promise<UserProfileEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<UserProfileEntity>;
    addItem(createUserOto: UserProfileEntity): Promise<UserProfileEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<UserProfileEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[UserProfileEntity[], number]>;
}
