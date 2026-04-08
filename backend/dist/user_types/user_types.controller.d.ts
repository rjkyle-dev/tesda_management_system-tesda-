import { UserTypesService } from "./user_types.service";
export declare class UserTypesController {
    private i_service;
    constructor(i_service: UserTypesService);
    getAll(): Promise<import("./user_types.entity").UserTypesEntity[]>;
    findTypeUser(ut_id: number): Promise<import("./user_types.entity").UserTypesEntity>;
}
