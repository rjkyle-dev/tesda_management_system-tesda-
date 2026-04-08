"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeMenuModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_type_menu_entity_1 = require("./user_type_menu.entity");
const user_type_menu_controller_1 = require("./user_type_menu.controller");
const user_type_menu_service_1 = require("./user_type_menu.service");
let UserTypeMenuModule = class UserTypeMenuModule {
};
exports.UserTypeMenuModule = UserTypeMenuModule;
exports.UserTypeMenuModule = UserTypeMenuModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_type_menu_entity_1.UserTypeMenuEntity])],
        controllers: [user_type_menu_controller_1.UserTypeMenuController],
        providers: [user_type_menu_service_1.UserTypeMenuService],
    })
], UserTypeMenuModule);
//# sourceMappingURL=user_type_menu.module.js.map