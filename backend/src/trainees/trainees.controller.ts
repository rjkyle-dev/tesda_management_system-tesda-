import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { TraineesService } from "./trainees.service";
import { TraineesEntity } from "./trainees.entity";


@Controller('trainees')
export class TraineesController {

    constructor(private i_service: TraineesService) {

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
    async addItem(@Body() createUserOto: TraineesEntity){
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

    @Get("get_trainees/:ctrl_num/:bt_id")
    async findTraineesByCtrlNum(@Param('ctrl_num') ctrl_num: string, @Param('bt_id') bt_id: number) {
        const response = await this.i_service.findTraineesByCtrlNum(ctrl_num,bt_id);
        return response;
    }

    @Post('add_many')
    async addMany(@Body() trainees: TraineesEntity[]) {
        const response = await this.i_service.addMany(trainees);
        return response;
    }

    @Put('update_many')
    async updateMany(@Body() trainees: TraineesEntity[]) {
    return this.i_service.updateMany(trainees);
    }

    @Get("get_trainees_summary/:ctrl_num")
    async getTraineesSummary(@Param('ctrl_num') ctrl_num: string) {
        const response = await this.i_service.getTraineesSummary(ctrl_num);
        return response;
    }


}
