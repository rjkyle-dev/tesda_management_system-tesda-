import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "billing_records"})
export class BillingRecordsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ctrl_num: string

    @Column()
    tc_id: number

    @Column()
    sc_id: number

    @Column()
    q_id: number

    @Column()
    batch_name: string

    @Column()
    num_pax: number

    @Column()
    dropped_pax: number

    @Column()
    billed_amount: number

    @Column()
    isWorkback: number

    @Column()
    remarks: string

    @Column()
    status_id: number

    @Column()
    datetime_received: string

    @Column()
    datetime_billed: string

    @Column()
    datetime_added: string

    @Column()
    uploaded_by: number

    @Column()
    uploaded_file: string

    @Column()
    date_start: string

    @Column()
    date_end: string

    @Column()
    fiscal_yr: string


}