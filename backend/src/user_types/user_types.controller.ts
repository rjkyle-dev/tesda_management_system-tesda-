import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { UserTypesService } from "./user_types.service";

@Controller('user_types')
export class UserTypesController {

    constructor(private i_service: UserTypesService) {

    }

    @Get("get_user_types")
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }


    @Get("find_user_types/:ut_id")
    async findTypeUser(@Param('ut_id') ut_id: number) {
        const response = await this.i_service.findTypeUser(ut_id);
        return response;
    }



}
