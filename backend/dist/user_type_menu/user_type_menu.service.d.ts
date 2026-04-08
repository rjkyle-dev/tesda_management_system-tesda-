import { DataSource, Repository } from "typeorm";
import { UserTypeMenuEntity } from './user_type_menu.entity';
export declare class UserTypeMenuService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<UserTypeMenuEntity>, dataSource: DataSource);
    getAll(): Promise<UserTypeMenuEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    getAllByPage(page: number, limit: number): Promise<UserTypeMenuEntity[]>;
    findItem(id: number): Promise<UserTypeMenuEntity>;
    addItem(user: UserTypeMenuEntity): Promise<UserTypeMenuEntity>;
    editItem(data: any): Promise<void>;
    assignChild(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<UserTypeMenuEntity[]>;
    getMenu(id: number): Promise<UserTypeMenuEntity[]>;
    checkPrivilege(data: any): Promise<{
        check_data: any;
    }>;
    searchNameNav(name: string, ut_id: number): Promise<UserTypeMenuEntity[]>;
    getListDataClick(ut_id: number): Promise<UserTypeMenuEntity[]>;
}
