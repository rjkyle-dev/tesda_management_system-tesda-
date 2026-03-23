import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "training_centers_type"})
export class TrainingCentersTypeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    isPrivate: number

    @Column()
    datetime_added: string


}