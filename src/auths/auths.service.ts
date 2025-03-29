import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswordUtil } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

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
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: CreateAuthDto) {
    return await this.usersService.registerUser(registerDto);
  }
}
