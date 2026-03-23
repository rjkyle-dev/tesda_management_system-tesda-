import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingSetTypesEntity } from "./billing_set_types.entity";
import { BillingSetTypesController } from "./billing_set_types.controller";
import { BillingSetTypesService } from "./billing_set_types.service";

@Module({
  imports: [TypeOrmModule.forFeature([BillingSetTypesEntity])],
  controllers: [BillingSetTypesController],
  providers: [BillingSetTypesService],
})
export class BillingSetTypesModule {}
