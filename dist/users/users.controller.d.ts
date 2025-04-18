import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./dto/respone-user.dto").UserResponseDto>;
    findAll(): Promise<User[]>;
    findOneByEmail(email: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': User;
    }>;
}
