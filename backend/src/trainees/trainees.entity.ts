import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "trainees"})
export class TraineesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fname: string

    @Column()
    mname: string

    @Column()
    lname: string

    @Column()
    extension: string

    @Column()
    sg_number: string

    @Column()
    training_cost: number

    @Column()
    ctrl_num: string

    @Column()
    bt_id: number

    @Column()
    status: string

    @Column()
    date_dropped: string


}