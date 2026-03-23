import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "billing_types"})
export class BillingTypesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    abbre: string

    @Column()
    days: number

    @Column()
    isHTD: number

    @Column()
    datetime_added: string

    @Column()
    tag_type: string
}