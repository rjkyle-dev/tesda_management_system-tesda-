"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsRecipientsEntity = exports.NotificationsEntity = exports.InsightsEntity = exports.TraineesEntity = exports.BillingPeriodsEntity = exports.BillingSetTypesEntity = exports.CategoriesEntity = exports.BillingTypesEntity = exports.BillingRecordsEntity = exports.TrainingCentersTypeEntity = exports.QualificationsEntity = exports.ScholarshipsEntity = exports.TrainingCentersEntity = exports.UserProfileEntity = exports.UserTypeMenuEntity = exports.UserMenuEntity = exports.UserTypesEntity = exports.UserEntity = void 0;
const billing_periods_entity_1 = require("../billing_periods/billing_periods.entity");
Object.defineProperty(exports, "BillingPeriodsEntity", { enumerable: true, get: function () { return billing_periods_entity_1.BillingPeriodsEntity; } });
const billing_records_entity_1 = require("../billing_records/billing_records.entity");
Object.defineProperty(exports, "BillingRecordsEntity", { enumerable: true, get: function () { return billing_records_entity_1.BillingRecordsEntity; } });
const billing_set_types_entity_1 = require("../billing_set_types/billing_set_types.entity");
Object.defineProperty(exports, "BillingSetTypesEntity", { enumerable: true, get: function () { return billing_set_types_entity_1.BillingSetTypesEntity; } });
const billing_types_entity_1 = require("../billing_types/billing_types.entity");
Object.defineProperty(exports, "BillingTypesEntity", { enumerable: true, get: function () { return billing_types_entity_1.BillingTypesEntity; } });
const categories_entity_1 = require("../categories/categories.entity");
Object.defineProperty(exports, "CategoriesEntity", { enumerable: true, get: function () { return categories_entity_1.CategoriesEntity; } });
const insights_entity_1 = require("../insights/insights.entity");
Object.defineProperty(exports, "InsightsEntity", { enumerable: true, get: function () { return insights_entity_1.InsightsEntity; } });
const notifications_entity_1 = require("../notifications/notifications.entity");
Object.defineProperty(exports, "NotificationsEntity", { enumerable: true, get: function () { return notifications_entity_1.NotificationsEntity; } });
const notifications_recipients_entity_1 = require("../notifications_recipients/notifications_recipients.entity");
Object.defineProperty(exports, "NotificationsRecipientsEntity", { enumerable: true, get: function () { return notifications_recipients_entity_1.NotificationsRecipientsEntity; } });
const qualifications_entity_1 = require("../qualifications/qualifications.entity");
Object.defineProperty(exports, "QualificationsEntity", { enumerable: true, get: function () { return qualifications_entity_1.QualificationsEntity; } });
const scholarships_entity_1 = require("../scholarships/scholarships.entity");
Object.defineProperty(exports, "ScholarshipsEntity", { enumerable: true, get: function () { return scholarships_entity_1.ScholarshipsEntity; } });
const trainees_entity_1 = require("../trainees/trainees.entity");
Object.defineProperty(exports, "TraineesEntity", { enumerable: true, get: function () { return trainees_entity_1.TraineesEntity; } });
const training_centers_entity_1 = require("../training_centers/training_centers.entity");
Object.defineProperty(exports, "TrainingCentersEntity", { enumerable: true, get: function () { return training_centers_entity_1.TrainingCentersEntity; } });
const training_centers_type_entity_1 = require("../training_centers_type/training_centers_type.entity");
Object.defineProperty(exports, "TrainingCentersTypeEntity", { enumerable: true, get: function () { return training_centers_type_entity_1.TrainingCentersTypeEntity; } });
const user_entity_1 = require("../user/user.entity");
Object.defineProperty(exports, "UserEntity", { enumerable: true, get: function () { return user_entity_1.UserEntity; } });
const user_menu_entity_1 = require("../user_menu/user_menu.entity");
Object.defineProperty(exports, "UserMenuEntity", { enumerable: true, get: function () { return user_menu_entity_1.UserMenuEntity; } });
const user_profile_entity_1 = require("../user_profile/user_profile.entity");
Object.defineProperty(exports, "UserProfileEntity", { enumerable: true, get: function () { return user_profile_entity_1.UserProfileEntity; } });
const user_type_menu_entity_1 = require("../user_type_menu/user_type_menu.entity");
Object.defineProperty(exports, "UserTypeMenuEntity", { enumerable: true, get: function () { return user_type_menu_entity_1.UserTypeMenuEntity; } });
const user_types_entity_1 = require("../user_types/user_types.entity");
Object.defineProperty(exports, "UserTypesEntity", { enumerable: true, get: function () { return user_types_entity_1.UserTypesEntity; } });
const entities = [
    user_entity_1.UserEntity,
    user_types_entity_1.UserTypesEntity,
    user_menu_entity_1.UserMenuEntity,
    user_type_menu_entity_1.UserTypeMenuEntity,
    user_profile_entity_1.UserProfileEntity,
    training_centers_entity_1.TrainingCentersEntity,
    scholarships_entity_1.ScholarshipsEntity,
    qualifications_entity_1.QualificationsEntity,
    training_centers_type_entity_1.TrainingCentersTypeEntity,
    billing_records_entity_1.BillingRecordsEntity,
    billing_types_entity_1.BillingTypesEntity,
    categories_entity_1.CategoriesEntity,
    billing_set_types_entity_1.BillingSetTypesEntity,
    billing_periods_entity_1.BillingPeriodsEntity,
    trainees_entity_1.TraineesEntity,
    insights_entity_1.InsightsEntity,
    notifications_entity_1.NotificationsEntity,
    notifications_recipients_entity_1.NotificationsRecipientsEntity
];
exports.default = entities;
//# sourceMappingURL=index.js.map