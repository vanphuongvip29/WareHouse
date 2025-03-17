import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const port = 8080;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {exclude: ['']});
  // Middleware trước khi thêm vào csdl
  app.useGlobalPipes(new ValidationPipe({
      // loại bỏ các trường không được định nghĩa trong DTO
      whitelist: true,
      // không truyền lên những trường không tồn tại
      forbidNonWhitelisted: true,
    }
  ));

  //api swagger
  const config = new DocumentBuilder()
    .setTitle('Warehouse example')
    .setDescription('The warehouse API description')
    .setVersion('1.0')
    .addTag('Warehoues')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  
  await app.listen(port);
  console.log(`Server listening at http://localhost:${port}`);
}
bootstrap();
