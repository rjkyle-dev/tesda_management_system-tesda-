import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingRecordsEntity } from "./billing_records.entity";
import { BillingRecordsController } from "./billing_records.controller";
import { BillingRecordsService } from "./billing_records.service";

@Module({
  imports: [TypeOrmModule.forFeature([BillingRecordsEntity])],
  controllers: [BillingRecordsController],
  providers: [BillingRecordsService],
})
export class BillingRecordsModule {}
