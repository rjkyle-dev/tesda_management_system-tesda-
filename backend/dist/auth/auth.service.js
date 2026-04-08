"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt_1 = require("../utils/bcrypt");
const typeorm_1 = require("typeorm");
let AuthService = class AuthService {
    constructor(usersService, jwtService, dataSource) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.dataSource = dataSource;
    }
    async validateUser(email, password, isGoogleLogin) {
        const user = await this.usersService.checkEmailExisted(email);
        if (isGoogleLogin) {
            if (user) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            const matched = (0, bcrypt_1.comparePassword)(password, user.password);
            if (user && matched) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    async loginUser(userdata) {
        const userdetails = await this.usersService.checkEmailExisted(userdata.email);
        const checkIfActive = await this.usersService.checkIfActive(userdata.email);
        const checkApproved = await this.usersService.checkIfApproved(userdata.email);
        if (userdetails) {
            if (checkApproved) {
                if (checkIfActive) {
                    const isMatched = await this.validateUser(userdata.email, userdata.password, userdata.isGoogleLogin);
                    if (isMatched) {
                        const payload = { user: userdetails };
                        return {
                            token: this.jwtService.sign(payload),
                            user: userdetails,
                            status: common_1.HttpStatus.FOUND
                        };
                    }
                    else {
                        return new common_1.HttpException('Password do not match', common_1.HttpStatus.NOT_FOUND);
                    }
                }
                else {
                    return new common_1.HttpException('Account deactivated', common_1.HttpStatus.NOT_FOUND);
                }
            }
            else {
                return new common_1.HttpException('Account not yet approved', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            return new common_1.HttpException('User not registered', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        typeorm_1.DataSource])
], AuthService);
//# sourceMappingURL=auth.service.js.map