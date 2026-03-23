import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "training_centers"})
export class TrainingCentersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    abbre: string

    @Column()
    tc_type_id: number

    @Column()
    address: string

    @Column()
    province: string

    @Column()
    region: string

    @Column()
    administrator_id: number

    @Column()
    sc_focal_id: number

    @Column()
    datetime_added: string

    @Column()
    list_sc_id: string

    @Column()
    list_q_id: string


}