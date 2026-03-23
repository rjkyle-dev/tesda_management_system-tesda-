import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { TrainingCentersTypeService } from "./training_centers_type.service";


@Controller('training_centers_type')
export class TrainingCentersTypeController {

    constructor(private i_service: TrainingCentersTypeService) {

    }

    @Get("get_all")
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }


    @Get("find/:id")
    async findItem(@Param('id') ut_id: number) {
        const response = await this.i_service.findItem(ut_id);
        return response;
    }



}
