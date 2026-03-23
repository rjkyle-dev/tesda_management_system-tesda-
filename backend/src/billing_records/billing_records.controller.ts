import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Query } from "@nestjs/common";
import { BillingRecordsService } from "./billing_records.service";
import { BillingRecordsEntity } from "./billing_records.entity";


@Controller('billing_records')
export class BillingRecordsController {

    constructor(private i_service: BillingRecordsService) {

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
    async addItem(@Body() createUserOto: BillingRecordsEntity){
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

    // @Get("get_all_by_page/:page/:limit")
    // async getAllByPage(@Param('page') page: number, @Param('limit') limit: number) {
    //     const response = await this.i_service.getAllByPage(page,limit);
    //     return response;
    // }

    @Get("get_all_by_page/:page/:limit/:status")
        async getAllByPage(
            @Param('page') page: number,
            @Param('limit') limit: number,
            @Param('status') status: number,
            @Query('type') search_type: string,
            @Query('value') search_value: string,
        ) {
            return await this.i_service.getAllByPage(
                page,
                limit,
                status,
                { type: search_type, value: search_value }
            );
        }

    @Get("get_all_by_page_type/:isWorkback/:page/:limit")
    async getAllByPageType(@Param('isWorkback') isWorkback: number,@Param('page') page: number, @Param('limit') limit: number) {
        const response = await this.i_service.getAllByPageType(isWorkback,page,limit);
        return response;
    }

    @Get("get_all_by_page_type_user/:tc_id/:isWorkback/:page/:limit/:status")
    async getAllByPageTypeUser(
        @Param('tc_id') tc_id: number, 
        @Param('isWorkback') isWorkback: number,
        @Param('page') page: number, 
        @Param('limit') limit: number,
        @Param('status') status: number,
        @Query('value') search_value: string,
        @Query('type') search_type: string,) {
        const response = await this.i_service.getAllByPageTypeUser(tc_id,isWorkback,page,limit,status, { value: search_value, type: search_type });
        return response;
    }

    @Post("update_status")
    async updateStatus(@Body() data:any) {
        const response = await this.i_service.updateStatus(data);
        return response;
    }


}
