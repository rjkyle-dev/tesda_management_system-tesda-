import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrainingCentersEntity } from "./training_centers.entity";
import { TrainingCentersController } from "./training_centers.controller";
import { TrainingCentersService } from "./training_centers.service";
import { QualificationsEntity } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([TrainingCentersEntity, QualificationsEntity])],
  controllers: [TrainingCentersController],
  providers: [TrainingCentersService],
})
export class TrainingCentersModule {}
