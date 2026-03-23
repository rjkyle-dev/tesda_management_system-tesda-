import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QualificationsEntity } from "./qualifications.entity";
import { QualificationsService } from "./qualifications.service";
import { QualificationsController } from "./qualifications.controller";

@Module({
  imports: [TypeOrmModule.forFeature([QualificationsEntity])],
  controllers: [QualificationsController],
  providers: [QualificationsService],
})
export class QualificationsModule {}
