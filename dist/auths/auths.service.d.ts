import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword, CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthsService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: CreateAuthDto): Promise<import("../users/dto/respone-user.dto").UserResponseDto>;
    checkCode: (codeAuthDto: CodeAuthDto) => Promise<{
        isBeforeCheck: true;
    }>;
    retryCodeId: (data: string) => Promise<{
        email: string;
    }>;
    changePassword: (changePasswor: ChangePassword) => Promise<string>;
    forgotPassword: (email: string) => Promise<{
        email: string;
    }>;
}
