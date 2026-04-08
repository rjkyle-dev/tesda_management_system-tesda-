"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraineesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trainees_entity_1 = require("./trainees.entity");
const trainees_controller_1 = require("./trainees.controller");
const trainees_service_1 = require("./trainees.service");
let TraineesModule = class TraineesModule {
};
exports.TraineesModule = TraineesModule;
exports.TraineesModule = TraineesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trainees_entity_1.TraineesEntity])],
        controllers: [trainees_controller_1.TraineesController],
        providers: [trainees_service_1.TraineesService],
    })
], TraineesModule);
//# sourceMappingURL=trainees.module.js.map