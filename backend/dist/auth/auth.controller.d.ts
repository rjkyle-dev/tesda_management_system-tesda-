import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(req: any): Promise<import("@nestjs/common").HttpException | {
        token: string;
        user: import("../entities").UserEntity;
        status: import("@nestjs/common").HttpStatus;
    }>;
}
