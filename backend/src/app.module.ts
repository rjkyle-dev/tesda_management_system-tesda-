import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { UserTypesController } from './user_types/user_types.controller';
import { UserTypesService } from './user_types/user_types.service';
import { UserTypesModule } from './user_types/user_types.module';
import entities from './entities';
import { AuthModule } from './auth/auth.module';
import { UserMenuController } from './user_menu/user_menu.controller';
import { UserMenuService } from './user_menu/user_menu.service';
import { UserMenuModule } from './user_menu/user_menu.module';
import { UserTypeMenuController } from './user_type_menu/user_type_menu.controller';
import { UserTypeMenuService } from './user_type_menu/user_type_menu.service';
import { UserTypeMenuModule } from './user_type_menu/user_type_menu.module';
import { TrainingCentersController } from './training_centers/training_centers.controller';
import { TrainingCentersService } from './training_centers/training_centers.service';
import { TrainingCentersModule } from './training_centers/training_centers.module';
import { ScholarshipsController } from './scholarships/scholarships.controller';
import { ScholarshipsService } from './scholarships/scholarships.service';
import { ScholarshipsModule } from './scholarships/scholarships.module';
import { QualificationsController } from './qualifications/qualifications.controller';
import { QualificationsService } from './qualifications/qualifications.service';
import { QualificationsModule } from './qualifications/qualifications.module';
import { UserProfileController } from './user_profile/user_profile.controller';
import { UserProfileService } from './user_profile/user_profile.service';
import { UserProfileModule } from './user_profile/user_profile.module';
import { TrainingCentersTypeController } from './training_centers_type/training_centers_type.controller';
import { TrainingCentersTypeService } from './training_centers_type/training_centers_type.service';
import { TrainingCentersTypeModule } from './training_centers_type/training_centers_type.module';
import { BillingRecordsController } from './billing_records/billing_records.controller';
import { BillingRecordsService } from './billing_records/billing_records.service';
import { BillingRecordsModule } from './billing_records/billing_records.module';
import { BillingTypesController } from './billing_types/billing_types.controller';
import { BillingTypesService } from './billing_types/billing_types.service';
import { BillingTypesModule } from './billing_types/billing_types.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { BillingSetTypesModule } from './billing_set_types/billing_set_types.module';
import { BillingSetTypesController } from './billing_set_types/billing_set_types.controller';
import { BillingSetTypesService } from './billing_set_types/billing_set_types.service';
import { BillingPeriodsController } from './billing_periods/billing_periods.controller';
import { BillingPeriodsModule } from './billing_periods/billing_periods.module';
import { BillingPeriodsService } from './billing_periods/billing_periods.service';
import { TraineesController } from './trainees/trainees.controller';
import { TraineesService } from './trainees/trainees.service';
import { TraineesModule } from './trainees/trainees.module';
import { InsightsController } from './insights/insights.controller';
import { InsightsService } from './insights/insights.service';
import { InsightsModule } from './insights/insights.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsRecipientsController } from './notifications_recipients/notifications_recipients.controller';
import { NotificationsRecipientsModule } from './notifications_recipients/notifications_recipients.module';
import { NotificationsRecipientsService } from './notifications_recipients/notifications_recipients.service';

@Module({
  imports: [
    MulterModule.register({
      dest: '../images'
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature(entities),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: entities,
      synchronize: false,
    }),
    UserModule,
    UserTypesModule,
    AuthModule,
    UserMenuModule,
    UserTypeMenuModule,
    TrainingCentersModule,
    ScholarshipsModule,
    QualificationsModule,
    UserProfileModule,
    TrainingCentersTypeModule,
    BillingRecordsModule,
    BillingTypesModule,
    CategoriesModule,
    BillingSetTypesModule,
    BillingPeriodsModule,
    TraineesModule,
    InsightsModule,
    NotificationsModule,
    NotificationsRecipientsModule,
  ],
  controllers: [AppController, UserTypesController, UserMenuController, UserTypeMenuController, TrainingCentersController, ScholarshipsController, QualificationsController, UserProfileController, TrainingCentersTypeController, BillingRecordsController, BillingTypesController, CategoriesController, BillingSetTypesController, BillingPeriodsController, TraineesController, InsightsController, NotificationsController, NotificationsRecipientsController],
  providers: [AppService, UserTypesService, UserMenuService, UserTypeMenuService, TrainingCentersService, ScholarshipsService, QualificationsService, UserProfileService, TrainingCentersTypeService, BillingRecordsService, BillingTypesService, CategoriesService, BillingSetTypesService, BillingPeriodsService, TraineesService, InsightsService, NotificationsService, NotificationsRecipientsService],
})
export class AppModule {}
