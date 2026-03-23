import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingPeriodsEntity } from "./billing_periods.entity";
import { BillingPeriodsController } from "./billing_periods.controller";
import { BillingPeriodsService } from "./billing_periods.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { NotificationsEntity, NotificationsRecipientsEntity } from "src/entities";
import { NotificationsRecipientsService } from "src/notifications_recipients/notifications_recipients.service";

@Module({
  imports: [TypeOrmModule.forFeature([BillingPeriodsEntity, NotificationsEntity, NotificationsRecipientsEntity])],
  controllers: [BillingPeriodsController],
  providers: [BillingPeriodsService,NotificationsService, NotificationsRecipientsService],
})
export class BillingPeriodsModule {}
