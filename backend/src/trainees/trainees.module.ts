import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TraineesEntity } from "./trainees.entity";
import { TraineesController } from "./trainees.controller";
import { TraineesService } from "./trainees.service";

@Module({
  imports: [TypeOrmModule.forFeature([TraineesEntity])],
  controllers: [TraineesController],
  providers: [TraineesService],
})
export class TraineesModule {}
