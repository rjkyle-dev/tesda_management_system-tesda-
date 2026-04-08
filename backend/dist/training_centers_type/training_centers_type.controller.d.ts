import { TrainingCentersTypeService } from "./training_centers_type.service";
export declare class TrainingCentersTypeController {
    private i_service;
    constructor(i_service: TrainingCentersTypeService);
    getAll(): Promise<import("./training_centers_type.entity").TrainingCentersTypeEntity[]>;
    findItem(ut_id: number): Promise<import("./training_centers_type.entity").TrainingCentersTypeEntity>;
}
