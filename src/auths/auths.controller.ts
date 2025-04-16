import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import {
  ChangePassword,
  CodeAuthDto,
  CreateAuthDto,
} from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authsService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Public()
  @Post('register')
  register(@Body() registerDto: CreateAuthDto) {
    return this.authsService.register(registerDto);
  }

  // active account
  @Public()
  @Post('check-code')
  checkCode(@Body() codeAuthDto: CodeAuthDto) {
    return this.authsService.checkCode(codeAuthDto);
  }

  @Post('retry-code')
  @Public()
  retryCodeId(@Body('email') email: string) {
    return this.authsService.retryCodeId(email);
  }

  @Public()
  @Patch('change-password')
  changePassword(@Body() changePassword: ChangePassword) {
    return this.authsService.changePassword(changePassword);
  }

  @Public()
  @Patch('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authsService.forgotPassword(email);
  }

  @Public()
  @Get('email')
  sendEmail() {
    this.mailerService.sendMail({
      to: 'vanphuongvip29@gmail.com', // list of receivers
      // from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      template: 'register',
      context: {
        name: 'VP',
        activationCode: 123456789,
      },
    });
    return 'OKi';
  }

  // @UseGuards(AuthGuard('jwt')) // Sử dụng AuthGuard với strategy 'jwt' để bảo vệ endpoint này
  @Get('me')
  async getMe(@Request() req) {
    // `req.user` sẽ chứa thông tin người dùng đã được xác thực từ JwtStrategy
    return { "user": req.user };
  }
}
