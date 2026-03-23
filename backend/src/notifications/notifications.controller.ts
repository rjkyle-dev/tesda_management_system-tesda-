import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsEntity } from "./notifications.entity";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly i_service: NotificationsService) {}

  @Get("get_all")
  async getAll() {
    return await this.i_service.getAll();
  }

  @Get("get_count")
  async getCount() {
    return await this.i_service.getCount();
  }

  @Get("find/:id")
  async findItem(@Param("id", ParseIntPipe) id: number) {
    return await this.i_service.findItem(id);
  }

  @Post("add")
  async addItem(@Body() data: NotificationsEntity) {
    return await this.i_service.addItem(data);
  }

  @Post("edit")
  async editItem(@Body() data: any) {
    return await this.i_service.editItem(data);
  }

  @Post("delete")
  async deleteItem(@Body() data: any) {
    return await this.i_service.deleteItem(data);
  }

  @Get("search/:name")
  async searchName(@Param("name") name: string) {
    return await this.i_service.searchName(name);
  }

  @Get("get_all_by_page/:page/:limit")
  async getAllByPage(
    @Param("page", ParseIntPipe) page: number,
    @Param("limit", ParseIntPipe) limit: number
  ) {
    return await this.i_service.getAllByPage(page, limit);
  }

  @Get("get_data/:page/:limit/:user_id")
  async getDataList(
    @Param("page", ParseIntPipe) page: number,
    @Param("limit", ParseIntPipe) limit: number,
    @Param("user_id", ParseIntPipe) userId: number
  ) {
    return await this.i_service.getUserNotifications(page, limit, userId);
  }

  @Post("mark_as_read")
  async markAsRead(@Body() data: { user_id: number; notification_id: number }) {
    return await this.i_service.markAsRead(
      data.user_id,
      data.notification_id
    );
  }
}