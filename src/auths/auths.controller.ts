import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator/customize';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authsService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
