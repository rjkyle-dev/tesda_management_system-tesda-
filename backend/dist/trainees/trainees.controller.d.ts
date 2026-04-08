import { TraineesService } from "./trainees.service";
import { TraineesEntity } from "./trainees.entity";
export declare class TraineesController {
    private i_service;
    constructor(i_service: TraineesService);
    getAll(): Promise<TraineesEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<TraineesEntity>;
    addItem(createUserOto: TraineesEntity): Promise<TraineesEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<TraineesEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[TraineesEntity[], number]>;
    findTraineesByCtrlNum(ctrl_num: string, bt_id: number): Promise<TraineesEntity[]>;
    addMany(trainees: TraineesEntity[]): Promise<TraineesEntity[]>;
    updateMany(trainees: TraineesEntity[]): Promise<any>;
    getTraineesSummary(ctrl_num: string): Promise<{
        headers: {
            id: string;
            description: any;
        }[];
        data: any[];
    }>;
}
