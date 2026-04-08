import { StreamableFile } from "@nestjs/common";
import { TrainingCentersService } from "./training_centers.service";
import { TrainingCentersEntity } from "./training_centers.entity";
import { Response as ExpressResponse } from 'express';
export declare class TrainingCentersController {
    private i_service;
    constructor(i_service: TrainingCentersService);
    getAll(): Promise<TrainingCentersEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<TrainingCentersEntity>;
    addItem(createUserOto: TrainingCentersEntity): Promise<TrainingCentersEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<TrainingCentersEntity[]>;
    getAllByPageTypeUser(page: number, limit: number, search_value: string, search_type: string): Promise<[TrainingCentersEntity[], number]>;
    generateSummaryTrainingCenters(file_data: any): Promise<Buffer<ArrayBufferLike>>;
    getSummaryFile(filename: string, res: ExpressResponse): StreamableFile;
}
