import { StreamableFile } from "@nestjs/common";
import { UserMenuService } from "./user_menu.service";
import { UserMenuEntity } from "./user_menu.entity";
export declare class UserMenuController {
    private i_service;
    constructor(i_service: UserMenuService);
    getAll(): Promise<UserMenuEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<UserMenuEntity>;
    addItem(createUserOto: UserMenuEntity): Promise<UserMenuEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<UserMenuEntity[]>;
    uploadPic(file: any): Promise<any>;
    getFile(filename: string, filetype: string, res: any): StreamableFile;
    getAllPage(page: number, limit: number): Promise<UserMenuEntity[]>;
}
