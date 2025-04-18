import { AuthsService } from './auths.service';
import { ChangePassword, CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthsController {
    private readonly authsService;
    private readonly mailerService;
    constructor(authsService: AuthsService, mailerService: MailerService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: CreateAuthDto): Promise<import("../users/dto/respone-user.dto").UserResponseDto>;
    checkCode(codeAuthDto: CodeAuthDto): Promise<{
        isBeforeCheck: true;
    }>;
    retryCodeId(email: string): Promise<{
        email: string;
    }>;
    changePassword(changePassword: ChangePassword): Promise<string>;
    forgotPassword(email: string): Promise<{
        email: string;
    }>;
    sendEmail(): string;
}
