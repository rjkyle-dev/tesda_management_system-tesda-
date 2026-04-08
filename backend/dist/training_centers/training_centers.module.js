"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingCentersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const training_centers_entity_1 = require("./training_centers.entity");
const training_centers_controller_1 = require("./training_centers.controller");
const training_centers_service_1 = require("./training_centers.service");
const entities_1 = require("../entities");
let TrainingCentersModule = class TrainingCentersModule {
};
exports.TrainingCentersModule = TrainingCentersModule;
exports.TrainingCentersModule = TrainingCentersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([training_centers_entity_1.TrainingCentersEntity, entities_1.QualificationsEntity])],
        controllers: [training_centers_controller_1.TrainingCentersController],
        providers: [training_centers_service_1.TrainingCentersService],
    })
], TrainingCentersModule);
//# sourceMappingURL=training_centers.module.js.map