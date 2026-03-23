import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "billing_periods"})
export class BillingPeriodsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ctrl_num: string

    @Column()
    sc_id: number

    @Column()
    bt_id: number

    @Column()
    order_num: number

    @Column()
    datetime_actioned: string

    @Column()
    status: number

    @Column()
    remarks: string

    @Column()
    total_payment: number

    @Column()
    user_id: number

    @Column({ type: 'date', nullable: true })
    datetime_due: string

    @Column()
    datetime_submit: string

    @Column()
    uploaded_file: string

    @Column()
    total_utilized: number

    @Column()
    total_unutilized: number

    @Column()
    total_dropped: number

}