import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "notifications"})
export class NotificationsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    message: string

    @Column()
    type: string

    @Column()
    reference_id: number

    @Column()
    reference_type: string

    @Column()
    created_by: number

    @Column()
    datetime_added: string


}