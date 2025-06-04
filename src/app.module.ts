import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './auths/auths.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auths/passport/jwt-auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ImportwarehouseModule } from './importwarehouse/importwarehouse.module';
import { ImportdetailwarehosueModule } from './importdetailwarehosue/importdetailwarehosue.module';
import { Importwarehouse } from './importwarehouse/entities/importwarehouse.entity';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ExportwarehouseModule } from './exportwarehouse/exportwarehouse.module';
import { ExportdetailwarehouseModule } from './exportdetailwarehouse/exportdetailwarehouse.module';
import { CustomersModule } from './customers/customers.module';
import { InventoryModule } from './inventory/inventory.module';
import { ExportWarehouse } from './exportwarehouse/entities/exportwarehouse.entity';
import { ExportDetailWarehouse } from './exportdetailwarehouse/entities/exportdetailwarehouse.entity';
import { Customer } from './customers/entities/customer.entity';
import { Inventory } from './inventory/entities/inventory.entity';
import { QRModule } from './banking/qr.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Hoặc địa chỉ IP của máy chủ MySQL
      port: 3307, // Hoặc cổng MySQL của bạn
      username: 'root',
      password: '29012001',
      database: 'dbwarehouse',
      entities: [
        User,
        Category,
        Product,
        Importwarehouse,
        ImportdetailwarehosueModule,
        ExportWarehouse,
        ExportDetailWarehouse,
        Customer,
        Inventory,
      ], // Đường dẫn đến các entity của bạn
      synchronize: true, // Chỉ sử dụng trong môi trường phát triển
      autoLoadEntities: true,
    }),

    TypeOrmModule.forFeature([
      User,
      Category,
      Product,
      Importwarehouse,
      ImportdetailwarehosueModule,
      ExportWarehouse,
      ExportDetailWarehouse,
      Customer,
      Inventory,
    ]),

    UsersModule,
    AuthsModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // ignoreTLS: true,
        // secure: false,
        auth: {
          // user: process.env.MAILDEV_INCOMING_USER,
          // pass: process.env.MAILDEV_INCOMING_PASS,
          user: 'vanphuongvip29@gmail.com',
          pass: 'olisssgpkmbupglq',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      // preview: true,
      template: {
        dir: process.cwd() + '/src/mail/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    CategoriesModule,
    ProductsModule,
    ImportwarehouseModule,
    ImportdetailwarehosueModule,
    SuppliersModule,
    ExportwarehouseModule,
    ExportdetailwarehouseModule,
    CustomersModule,
    InventoryModule,
    QRModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EventsGateway,
  ],
})
export class AppModule {}
