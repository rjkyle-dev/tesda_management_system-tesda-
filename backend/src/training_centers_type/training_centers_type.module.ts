import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrainingCentersTypeEntity } from "./training_centers_type.entity";
import { TrainingCentersTypeController } from "./training_centers_type.controller";
import { TrainingCentersTypeService } from "./training_centers_type.service";


@Module({
  imports: [TypeOrmModule.forFeature([TrainingCentersTypeEntity])],
  controllers: [TrainingCentersTypeController],
  providers: [TrainingCentersTypeService],
})
export class TrainingCentersTypeModule {}
