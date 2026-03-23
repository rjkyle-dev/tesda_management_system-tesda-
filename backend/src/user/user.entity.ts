import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ut_id: number

    @Column()
    tc_id: number

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column()
    profile_pic: string

    @Column()
    isApproved: number

    @Column()
    isActive: number

    @Column()
    datetime_added: string

    @Column()
    e_sign: string


}