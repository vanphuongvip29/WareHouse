import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthsService } from '../auths.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthsService) {
    super({
      usernameField: 'email', // Thay đổi tên trường thành email
      passwordField: 'passWord',
    });
  }

  async validate(email: string, passWord: string): Promise<any> {
    const user = await this.authService.validateUser(email, passWord);
    if (!user) {
      throw new UnauthorizedException('Email/Password không đúng');
    }
    if (user.isActive === false) {
      throw new BadRequestException('Tài khoản chưa được kích hoạt');
    }
    return user;
  }
}
