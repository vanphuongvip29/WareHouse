import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost', // Hoặc địa chỉ IP của máy chủ MySQL
    port: 3307, // Hoặc cổng MySQL của bạn
    username: 'root',
    password: '29012001',
    database: 'dbwarehouse',
    entities: [User], // Đường dẫn đến các entity của bạn
    synchronize: true, // Chỉ sử dụng trong môi trường phát triển
    autoLoadEntities: true,
  }),
    UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
