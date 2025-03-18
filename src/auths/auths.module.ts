import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: "jwtConstants.secret",
      signOptions: { expiresIn: '60h' },
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule {}
