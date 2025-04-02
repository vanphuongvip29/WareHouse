import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswordUtil } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  ChangePassword,
  CodeAuthDto,
  CreateAuthDto,
} from './dto/create-auth.dto';

@Injectable()
export class AuthsService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    const isValidPassword = await comparePasswordUtil(pass, user.passWord);

    if (!user || !isValidPassword) return null;

    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      userName: user.userName,
      lastName: user.lastName,
    };

    // check active của user
    const checkUser = await this.usersService.findUserByEmail(user.email);
    if (!checkUser.isActive) {
      throw new BadRequestException('Vui lòng kích hoạt tài khoản');
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: CreateAuthDto) {
    return await this.usersService.registerUser(registerDto);
  }

  checkCode = async (codeAuthDto: CodeAuthDto) => {
    return await this.usersService.handleActive(codeAuthDto);
  };

  // gửi lại codeID
  retryCodeId = async (data: string) => {
    return await this.usersService.retryCodeId(data);
  };

  changePassword = async (changePasswor: ChangePassword) => {
    return await this.usersService.changePasswordUser(changePasswor);
  };

  forgotPassword = async (email: string) => {
    return await this.usersService.forgetPassword(email);
  };
}
