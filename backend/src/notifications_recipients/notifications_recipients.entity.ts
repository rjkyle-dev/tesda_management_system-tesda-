import { NotificationsEntity } from "src/entities";
import { Column, Entity, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "notifications_recipients"})
export class NotificationsRecipientsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    notification_id: number

    @Column()
    user_id: number

    @Column()
    is_read: number

    @Column()
    datetime_read: string

    // 🔹 Add relation to NotificationsEntity
    @ManyToOne(() => NotificationsEntity, notif => notif.id)
    @JoinColumn({ name: 'notification_id' })
    notification: NotificationsEntity;


}