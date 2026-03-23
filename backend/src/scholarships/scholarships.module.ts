import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScholarshipsEntity } from "./scholarships.entity";
import { ScholarshipsController } from "./scholarships.controller";
import { ScholarshipsService } from "./scholarships.service";

@Module({
  imports: [TypeOrmModule.forFeature([ScholarshipsEntity])],
  controllers: [ScholarshipsController],
  providers: [ScholarshipsService],
})
export class ScholarshipsModule {}
