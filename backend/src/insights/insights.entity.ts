import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "insights"})
export class InsightsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 5, scale: 3 })
    from_score: number;

    @Column({ type: 'decimal', precision: 5, scale: 3 })
    to_score: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    report_name: string | null;
}