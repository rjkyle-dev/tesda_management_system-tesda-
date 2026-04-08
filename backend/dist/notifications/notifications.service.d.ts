import { DataSource, Repository } from "typeorm";
import { NotificationsEntity } from "./notifications.entity";
import { NotificationsRecipientsEntity } from "src/entities";
export declare class NotificationsService {
    private readonly i_repository;
    private readonly recipientsRepository;
    private readonly dataSource;
    constructor(i_repository: Repository<NotificationsEntity>, recipientsRepository: Repository<NotificationsRecipientsEntity>, dataSource: DataSource);
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
    getUserNotifications(page: number, limit: number, userId: number): Promise<(number | {
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
    markAsRead(userId: number, notificationId: number): Promise<import("typeorm").UpdateResult>;
    createNotification(data: {
        title: string;
        message: string;
        type: string;
        referenceId?: number;
        referenceType?: string;
        createdBy: number;
        recipientIds: number[];
    }): Promise<NotificationsEntity>;
    getUnreadCount(userId: number): Promise<{
        unread: number;
    }>;
}
