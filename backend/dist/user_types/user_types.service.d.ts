import { DataSource, Repository } from "typeorm";
import { UserTypesEntity } from './user_types.entity';
export declare class UserTypesService {
    private readonly i_repository;
    private dataSource;
    constructor(i_repository: Repository<UserTypesEntity>, dataSource: DataSource);
    getAll(): Promise<UserTypesEntity[]>;
    findTypeUser(id: number): Promise<UserTypesEntity>;
}
