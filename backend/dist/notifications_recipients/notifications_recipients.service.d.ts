import { Repository } from "typeorm";
import { NotificationsRecipientsEntity } from "src/entities";
export declare class NotificationsRecipientsService {
    private readonly i_repository;
    constructor(i_repository: Repository<NotificationsRecipientsEntity>);
    getAll(): Promise<NotificationsRecipientsEntity[]>;
    getCount(): Promise<{
        total_cnt: number;
    }>;
    findItem(id: number): Promise<NotificationsRecipientsEntity>;
    addItem(data: NotificationsRecipientsEntity): Promise<NotificationsRecipientsEntity>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    getAllByPage(page: number, limit: number): Promise<[NotificationsRecipientsEntity[], number]>;
    markAsRead(data: {
        user_id: number;
        notification_id: number;
    }): Promise<NotificationsRecipientsEntity>;
}
