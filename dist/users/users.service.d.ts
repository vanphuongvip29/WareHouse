import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/respone-user.dto';
import { ChangePassword, CodeAuthDto, CreateAuthDto } from 'src/auths/dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class UsersService {
    private usersRepository;
    private readonly mailerService;
    constructor(usersRepository: Repository<User>, mailerService: MailerService);
    checkEmailExists(email: string): Promise<boolean>;
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<User[]>;
    findUserByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
        id: number;
        userName: string;
        email: string;
        passWord: string;
        isActive: boolean;
        role: string;
        accountType: string;
        codeId: string;
        codeExpired: Date;
        createdAt: Date;
        updatedAt: Date;
    } & User>;
    removeUser(id: number): Promise<{
        status: HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': User;
    }>;
    registerUser(registerDto: CreateAuthDto): Promise<UserResponseDto>;
    handleActive(codeAuthDto: CodeAuthDto): Promise<{
        isBeforeCheck: true;
    }>;
    retryCodeId(email: string): Promise<{
        email: string;
    }>;
    changePasswordUser: (changePassword: ChangePassword) => Promise<string>;
    forgetPassword: (email: string) => Promise<{
        email: string;
    }>;
}
