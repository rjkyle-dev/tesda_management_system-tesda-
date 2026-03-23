import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "qualifications"})
export class QualificationsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    hrs: number

    @Column()
    days: number

    @Column()
    category_id: number

    @Column()
    datetime_added: string


}