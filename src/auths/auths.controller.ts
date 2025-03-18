import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post("login")
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authsService.signIn(createAuthDto.email, createAuthDto.passWord);
  }
}
