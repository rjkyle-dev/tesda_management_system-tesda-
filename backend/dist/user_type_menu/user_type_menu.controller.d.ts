import { UserTypeMenuService } from "./user_type_menu.service";
import { UserTypeMenuEntity } from "./user_type_menu.entity";
export declare class UserTypeMenuController {
    private i_service;
    constructor(i_service: UserTypeMenuService);
    getAll(): Promise<UserTypeMenuEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<UserTypeMenuEntity>;
    addItem(createUserOto: UserTypeMenuEntity): Promise<UserTypeMenuEntity>;
    editItem(data: any): Promise<void>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<UserTypeMenuEntity[]>;
    getMenu(id: number): Promise<UserTypeMenuEntity[]>;
    checkPrivilege(data: any): Promise<{
        check_data: any;
    }>;
    assignChild(data: any): Promise<import("typeorm").UpdateResult>;
    searchNameNav(name: string, ut_id: number): Promise<UserTypeMenuEntity[]>;
    getListDataClick(ut_id: number): Promise<UserTypeMenuEntity[]>;
}
