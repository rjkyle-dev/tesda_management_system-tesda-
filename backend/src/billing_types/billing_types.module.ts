import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingTypesEntity } from "./billing_types.entity";
import { BillingTypesController } from "./billing_types.controller";
import { BillingTypesService } from "./billing_types.service";

@Module({
  imports: [TypeOrmModule.forFeature([BillingTypesEntity])],
  controllers: [BillingTypesController],
  providers: [BillingTypesService],
})
export class BillingTypesModule {}
