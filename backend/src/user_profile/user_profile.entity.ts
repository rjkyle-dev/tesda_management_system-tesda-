import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "user_profile"})
export class UserProfileEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    fname: string

    @Column()
    mname: string

    @Column()
    lname: string

    @Column()
    gender: string

    @Column()
    phone_number: string

    @Column()
    datetime_changed: string


}