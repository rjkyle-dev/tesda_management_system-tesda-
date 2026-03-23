import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsRecipientsEntity } from "./notifications_recipients.entity";
import { NotificationsRecipientsController } from "./notifications_recipients.controller";
import { NotificationsRecipientsService } from "./notifications_recipients.service";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationsRecipientsEntity]),
    NotificationsModule
  ],
  controllers: [NotificationsRecipientsController],
  providers: [NotificationsRecipientsService],
})
export class NotificationsRecipientsModule {}