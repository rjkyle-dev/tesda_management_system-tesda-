"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const user_module_1 = require("./user/user.module");
const user_types_controller_1 = require("./user_types/user_types.controller");
const user_types_service_1 = require("./user_types/user_types.service");
const user_types_module_1 = require("./user_types/user_types.module");
const entities_1 = require("./entities");
const auth_module_1 = require("./auth/auth.module");
const user_menu_controller_1 = require("./user_menu/user_menu.controller");
const user_menu_service_1 = require("./user_menu/user_menu.service");
const user_menu_module_1 = require("./user_menu/user_menu.module");
const user_type_menu_controller_1 = require("./user_type_menu/user_type_menu.controller");
const user_type_menu_service_1 = require("./user_type_menu/user_type_menu.service");
const user_type_menu_module_1 = require("./user_type_menu/user_type_menu.module");
const training_centers_controller_1 = require("./training_centers/training_centers.controller");
const training_centers_service_1 = require("./training_centers/training_centers.service");
const training_centers_module_1 = require("./training_centers/training_centers.module");
const scholarships_controller_1 = require("./scholarships/scholarships.controller");
const scholarships_service_1 = require("./scholarships/scholarships.service");
const scholarships_module_1 = require("./scholarships/scholarships.module");
const qualifications_controller_1 = require("./qualifications/qualifications.controller");
const qualifications_service_1 = require("./qualifications/qualifications.service");
const qualifications_module_1 = require("./qualifications/qualifications.module");
const user_profile_controller_1 = require("./user_profile/user_profile.controller");
const user_profile_service_1 = require("./user_profile/user_profile.service");
const user_profile_module_1 = require("./user_profile/user_profile.module");
const training_centers_type_controller_1 = require("./training_centers_type/training_centers_type.controller");
const training_centers_type_service_1 = require("./training_centers_type/training_centers_type.service");
const training_centers_type_module_1 = require("./training_centers_type/training_centers_type.module");
const billing_records_controller_1 = require("./billing_records/billing_records.controller");
const billing_records_service_1 = require("./billing_records/billing_records.service");
const billing_records_module_1 = require("./billing_records/billing_records.module");
const billing_types_controller_1 = require("./billing_types/billing_types.controller");
const billing_types_service_1 = require("./billing_types/billing_types.service");
const billing_types_module_1 = require("./billing_types/billing_types.module");
const categories_controller_1 = require("./categories/categories.controller");
const categories_service_1 = require("./categories/categories.service");
const categories_module_1 = require("./categories/categories.module");
const billing_set_types_module_1 = require("./billing_set_types/billing_set_types.module");
const billing_set_types_controller_1 = require("./billing_set_types/billing_set_types.controller");
const billing_set_types_service_1 = require("./billing_set_types/billing_set_types.service");
const billing_periods_controller_1 = require("./billing_periods/billing_periods.controller");
const billing_periods_module_1 = require("./billing_periods/billing_periods.module");
const billing_periods_service_1 = require("./billing_periods/billing_periods.service");
const trainees_controller_1 = require("./trainees/trainees.controller");
const trainees_service_1 = require("./trainees/trainees.service");
const trainees_module_1 = require("./trainees/trainees.module");
const insights_controller_1 = require("./insights/insights.controller");
const insights_service_1 = require("./insights/insights.service");
const insights_module_1 = require("./insights/insights.module");
const notifications_controller_1 = require("./notifications/notifications.controller");
const notifications_service_1 = require("./notifications/notifications.service");
const notifications_module_1 = require("./notifications/notifications.module");
const notifications_recipients_controller_1 = require("./notifications_recipients/notifications_recipients.controller");
const notifications_recipients_module_1 = require("./notifications_recipients/notifications_recipients.module");
const notifications_recipients_service_1 = require("./notifications_recipients/notifications_recipients.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: '../images'
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forFeature(entities_1.default),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: entities_1.default,
                synchronize: false,
            }),
            user_module_1.UserModule,
            user_types_module_1.UserTypesModule,
            auth_module_1.AuthModule,
            user_menu_module_1.UserMenuModule,
            user_type_menu_module_1.UserTypeMenuModule,
            training_centers_module_1.TrainingCentersModule,
            scholarships_module_1.ScholarshipsModule,
            qualifications_module_1.QualificationsModule,
            user_profile_module_1.UserProfileModule,
            training_centers_type_module_1.TrainingCentersTypeModule,
            billing_records_module_1.BillingRecordsModule,
            billing_types_module_1.BillingTypesModule,
            categories_module_1.CategoriesModule,
            billing_set_types_module_1.BillingSetTypesModule,
            billing_periods_module_1.BillingPeriodsModule,
            trainees_module_1.TraineesModule,
            insights_module_1.InsightsModule,
            notifications_module_1.NotificationsModule,
            notifications_recipients_module_1.NotificationsRecipientsModule,
        ],
        controllers: [app_controller_1.AppController, user_types_controller_1.UserTypesController, user_menu_controller_1.UserMenuController, user_type_menu_controller_1.UserTypeMenuController, training_centers_controller_1.TrainingCentersController, scholarships_controller_1.ScholarshipsController, qualifications_controller_1.QualificationsController, user_profile_controller_1.UserProfileController, training_centers_type_controller_1.TrainingCentersTypeController, billing_records_controller_1.BillingRecordsController, billing_types_controller_1.BillingTypesController, categories_controller_1.CategoriesController, billing_set_types_controller_1.BillingSetTypesController, billing_periods_controller_1.BillingPeriodsController, trainees_controller_1.TraineesController, insights_controller_1.InsightsController, notifications_controller_1.NotificationsController, notifications_recipients_controller_1.NotificationsRecipientsController],
        providers: [app_service_1.AppService, user_types_service_1.UserTypesService, user_menu_service_1.UserMenuService, user_type_menu_service_1.UserTypeMenuService, training_centers_service_1.TrainingCentersService, scholarships_service_1.ScholarshipsService, qualifications_service_1.QualificationsService, user_profile_service_1.UserProfileService, training_centers_type_service_1.TrainingCentersTypeService, billing_records_service_1.BillingRecordsService, billing_types_service_1.BillingTypesService, categories_service_1.CategoriesService, billing_set_types_service_1.BillingSetTypesService, billing_periods_service_1.BillingPeriodsService, trainees_service_1.TraineesService, insights_service_1.InsightsService, notifications_service_1.NotificationsService, notifications_recipients_service_1.NotificationsRecipientsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map