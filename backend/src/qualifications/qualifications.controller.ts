import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Query } from "@nestjs/common";
import { QualificationsService } from "./qualifications.service";
import { QualificationsEntity } from "./qualifications.entity";


@Controller('qualifications')
export class QualificationsController {

    constructor(private i_service: QualificationsService) {

    }

    @Get("get_all")
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }

    @Get("get_count")
    async getCount() {
        const response = await this.i_service.getCount();
        return response;
    }

    @Get("find/:id")
    async findItem(@Param('id') id: number) {
        const response = await this.i_service.findItem(id);
        return response;
    }

    @Post('add')
    async addItem(@Body() createUserOto: QualificationsEntity){
        const response = await this.i_service.addItem(createUserOto);
        return response;
    }

    @Post("edit")
    async editItem(@Body() data:any) {
        const response = await this.i_service.editItem(data);
        return response;
    }

    @Post("delete")
    async deleteItem(@Body() data:any) {
        const response = await this.i_service.deleteItem(data);
        return response;
    }

    @Get("search/:name")
    async searchName(@Param('name') name: string) {
        const response = await this.i_service.searchName(name);
        return response;
    }

    @Get("get_all_by_page/:page/:limit")
    async getAllByPage(
        @Param('page') page: number, 
        @Param('limit') limit: number,
        @Query('value') search_value: string,
        @Query('type') search_type: string,) {
        const response = await this.i_service.getAllByPage(page,limit, { value: search_value, type: search_type });
        return response;
    }
    


}
