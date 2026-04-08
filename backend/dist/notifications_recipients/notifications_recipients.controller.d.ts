import { NotificationsRecipientsService } from "./notifications_recipients.service";
import { NotificationsRecipientsEntity } from "./notifications_recipients.entity";
export declare class NotificationsRecipientsController {
    private i_service;
    constructor(i_service: NotificationsRecipientsService);
    getAll(): Promise<NotificationsRecipientsEntity[]>;
    getCount(): Promise<{
        total_cnt: number;
    }>;
    findItem(id: number): Promise<NotificationsRecipientsEntity>;
    addItem(createUserOto: NotificationsRecipientsEntity): Promise<NotificationsRecipientsEntity>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    getAllByPage(page: number, limit: number): Promise<[NotificationsRecipientsEntity[], number]>;
    markAsRead(data: any): Promise<NotificationsRecipientsEntity>;
}
