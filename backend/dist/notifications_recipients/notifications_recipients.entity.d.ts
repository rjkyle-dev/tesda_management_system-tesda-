import { NotificationsEntity } from "src/entities";
export declare class NotificationsRecipientsEntity {
    id: number;
    notification_id: number;
    user_id: number;
    is_read: number;
    datetime_read: string;
    notification: NotificationsEntity;
}
