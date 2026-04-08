import { NotificationsService } from "./notifications.service";
import { NotificationsEntity } from "./notifications.entity";
export declare class NotificationsController {
    private readonly i_service;
    constructor(i_service: NotificationsService);
    getAll(): Promise<NotificationsEntity[]>;
    getCount(): Promise<{
        total_cnt: number;
    }>;
    findItem(id: number): Promise<NotificationsEntity>;
    addItem(data: NotificationsEntity): Promise<NotificationsEntity>;
    editItem(data: any): Promise<import("typeorm").UpdateResult>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<NotificationsEntity[]>;
    getAllByPage(page: number, limit: number): Promise<(number | NotificationsEntity[])[]>;
    getDataList(page: number, limit: number, userId: number): Promise<(number | {
        is_read: any;
        id: number;
        title: string;
        message: string;
        type: string;
        reference_id: number;
        reference_type: string;
        created_by: number;
        datetime_added: string;
    }[])[]>;
    markAsRead(data: {
        user_id: number;
        notification_id: number;
    }): Promise<import("typeorm").UpdateResult>;
}
