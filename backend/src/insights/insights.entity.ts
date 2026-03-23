import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "insights"})
export class InsightsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    from_score: number

    @Column()
    to_score: number

    @Column()
    description: string

    @Column()
    report_name: string


}