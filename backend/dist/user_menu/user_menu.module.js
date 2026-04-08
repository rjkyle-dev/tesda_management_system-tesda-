"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMenuModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_menu_entity_1 = require("./user_menu.entity");
const user_menu_controller_1 = require("./user_menu.controller");
const user_menu_service_1 = require("./user_menu.service");
let UserMenuModule = class UserMenuModule {
};
exports.UserMenuModule = UserMenuModule;
exports.UserMenuModule = UserMenuModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_menu_entity_1.UserMenuEntity])],
        controllers: [user_menu_controller_1.UserMenuController],
        providers: [user_menu_service_1.UserMenuService],
    })
], UserMenuModule);
//# sourceMappingURL=user_menu.module.js.map