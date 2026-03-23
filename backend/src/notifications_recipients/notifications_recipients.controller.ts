import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { NotificationsRecipientsService } from "./notifications_recipients.service";
import { NotificationsRecipientsEntity } from "./notifications_recipients.entity";


@Controller('notifications_recipients')
export class NotificationsRecipientsController {

    constructor(private i_service: NotificationsRecipientsService) {

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
    async addItem(@Body() createUserOto: NotificationsRecipientsEntity){
        const response = await this.i_service.addItem(createUserOto);
        return response;
    }

    // @Post("edit")
    // async editItem(@Body() data:any) {
    //     const response = await this.i_service.editItem(data);
    //     return response;
    // }

    @Post("delete")
    async deleteItem(@Body() data:any) {
        const response = await this.i_service.deleteItem(data);
        return response;
    }

    // @Get("search/:name")
    // async searchName(@Param('name') name: string) {
    //     const response = await this.i_service.searchName(name);
    //     return response;
    // }

    @Get("get_all_by_page/:page/:limit")
    async getAllByPage(@Param('page') page: number, @Param('limit') limit: number) {
        const response = await this.i_service.getAllByPage(page,limit);
        return response;
    }

    // @Get("get_data/:page/:limit/:user_id")
    // async getDataList(@Param('page') page: number, @Param('limit') limit: number, @Param('user_id') user_id: number) {
    //     const response = await this.i_service.getDataList(page,limit,user_id);
    //     return response;
    // }

    @Post("mark_as_read")
    async markAsRead(@Body() data:any) {
        const response = await this.i_service.markAsRead(data);
        return response;
    }


}
