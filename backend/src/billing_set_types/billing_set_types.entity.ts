import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "billing_set_types"})
export class BillingSetTypesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sc_id: number

    @Column()
    bt_id: number

    @Column()
    order_num: number



}