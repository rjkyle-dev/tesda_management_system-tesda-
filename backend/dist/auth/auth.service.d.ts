import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    private dataSource;
    constructor(usersService: UserService, jwtService: JwtService, dataSource: DataSource);
    validateUser(email: string, password: string, isGoogleLogin: boolean): Promise<any>;
    loginUser(userdata: any): Promise<HttpException | {
        token: string;
        user: UserEntity;
        status: HttpStatus;
    }>;
}
