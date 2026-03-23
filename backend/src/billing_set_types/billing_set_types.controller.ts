import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { BillingSetTypesService } from "./billing_set_types.service";
import { BillingSetTypesEntity } from "./billing_set_types.entity";


@Controller('billing_set_types')
export class BillingSetTypesController {

    constructor(private i_service: BillingSetTypesService) {

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
    async addItem(@Body() createUserOto: BillingSetTypesEntity){
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
    async getAllByPage(@Param('page') page: number, @Param('limit') limit: number) {
        const response = await this.i_service.getAllByPage(page,limit);
        return response;
    }

    @Get("find_by_sc_id/:sc_id")
    async findBySCId(@Param('sc_id') sc_id: number) {
        const response = await this.i_service.findBySCId(sc_id);
        return response;
    }


}
