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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const respone_user_dto_1 = require("./dto/respone-user.dto");
const bcrypt_1 = require("../utils/bcrypt");
const uuid_1 = require("uuid");
const dayjs_1 = __importDefault(require("dayjs"));
const mailer_1 = require("@nestjs-modules/mailer");
let UsersService = class UsersService {
    usersRepository;
    mailerService;
    constructor(usersRepository, mailerService) {
        this.usersRepository = usersRepository;
        this.mailerService = mailerService;
    }
    async checkEmailExists(email) {
        return this.usersRepository.exists({ where: { email } });
    }
    async create(createUserDto) {
        const { userName, email, passWord, firstName, lastName } = createUserDto;
        const isExist = await this.checkEmailExists(email);
        if (isExist) {
            throw new common_1.BadRequestException(`Email đã tồn tại: ${email}`);
        }
        const hashPass = await (0, bcrypt_1.hashPasswordUtil)(passWord);
        const user = await this.usersRepository.create({
            userName,
            email,
            passWord: hashPass,
            firstName,
            lastName,
        });
        const savedUser = await this.usersRepository.save(user);
        const userResponse = new respone_user_dto_1.UserResponseDto();
        userResponse.id = savedUser.id;
        userResponse.userName = savedUser.userName;
        userResponse.email = savedUser.email;
        return userResponse;
    }
    async findAll() {
        const user = await this.usersRepository.find();
        return user;
    }
    async findUserByEmail(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(` User with ID ${id} not found`);
        }
        return this.usersRepository.save({ ...user, ...updateUserDto });
    }
    async removeUser(id) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(` User with ID ${id} not found`);
        }
        const result = await this.usersRepository.remove(user);
        return { status: common_1.HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
    }
    async registerUser(registerDto) {
        const { userName, email, passWord, firstName, lastName } = registerDto;
        const isExist = await this.checkEmailExists(email);
        if (isExist) {
            throw new common_1.BadRequestException(`Email đã tồn tại: ${email}`);
        }
        const hashPass = await (0, bcrypt_1.hashPasswordUtil)(passWord);
        const codeId = (0, uuid_1.v4)();
        const user = await this.usersRepository.save({
            userName,
            email,
            passWord: hashPass,
            firstName,
            lastName,
            isActive: false,
            codeId: codeId,
            codeExpired: (0, dayjs_1.default)().add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
        });
        this.mailerService.sendMail({
            to: user.email,
            subject: 'Acctive your account at @VP✔',
            template: 'register',
            context: {
                name: user?.userName ?? user.email,
                activationCode: codeId,
            },
        });
        const userResponse = new respone_user_dto_1.UserResponseDto();
        userResponse.id = user.id;
        userResponse.userName = user.userName;
        userResponse.email = user.email;
        return userResponse;
    }
    async handleActive(codeAuthDto) {
        const user = await this.usersRepository.findOne({
            where: {
                email: codeAuthDto.email,
                codeId: codeAuthDto.codeId,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Thông tin User không tìm thấy');
        }
        const isBeforeCheck = (0, dayjs_1.default)().isBefore(user.codeExpired);
        if (isBeforeCheck) {
            await this.usersRepository.save({ ...user, isActive: true });
            return { isBeforeCheck };
        }
        else {
            throw new common_1.BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
        }
    }
    async retryCodeId(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('Tài khoản không tồn tại');
        }
        if (user.isActive) {
            throw new common_1.BadRequestException('Tài khoản đã được kích hoạt');
        }
        const codeId = (0, uuid_1.v4)();
        await this.usersRepository.save({
            ...user,
            codeId: codeId,
            codeExpired: (0, dayjs_1.default)().add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
        });
        this.mailerService.sendMail({
            to: user.email,
            subject: 'Acctive your account at @VP✔',
            template: 'register',
            context: {
                name: user?.userName ?? user.email,
                activationCode: codeId,
            },
        });
        return { email: user.email };
    }
    changePasswordUser = async (changePassword) => {
        const user = await this.usersRepository.findOne({
            where: { email: changePassword.email },
        });
        if (!user) {
            throw new common_1.BadRequestException('Tài khoản không tồn tại');
        }
        const isValidPassword = await (0, bcrypt_1.comparePasswordUtil)(changePassword.passWordOld, user.passWord);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('Mật khẩu cũ không đúng');
        }
        if (changePassword.confirmPassword !== changePassword.passWordNew) {
            throw new common_1.BadRequestException('Mật khẩu/xác nhận mật khẩu không chính xác.');
        }
        const newPassword = await (0, bcrypt_1.hashPasswordUtil)(changePassword.passWordNew);
        await this.usersRepository.save({ ...user, passWord: newPassword });
        return 'Thay đổi mật khẩu thành công !!!';
    };
    forgetPassword = async (email) => {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('Tài khoản không tồn tại');
        }
        const codeId = (0, uuid_1.v4)();
        this.mailerService.sendMail({
            to: user.email,
            subject: 'Forgot password your account at @VP✔',
            template: 'register',
            context: {
                name: user?.userName ?? user.email,
                activationCode: codeId,
            },
        });
        await this.usersRepository.save({
            ...user,
            codeId: codeId,
            codeExpired: (0, dayjs_1.default)().add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        });
        return { email: user.email };
    };
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map