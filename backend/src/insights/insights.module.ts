import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InsightsEntity } from "./insights.entity";
import { InsightsController } from "./insights.controller";
import { InsightsService } from "./insights.service";

@Module({
  imports: [TypeOrmModule.forFeature([InsightsEntity])],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}
