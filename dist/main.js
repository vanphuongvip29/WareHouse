"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const port = 8080;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api', { exclude: [''] });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Warehouse example')
        .setDescription('The warehouse API description')
        .setVersion('1.0')
        .addTag('Warehoues')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, documentFactory);
    await app.listen(port);
    console.log(`Server listening at http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map