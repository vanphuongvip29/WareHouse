"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auths_module_1 = require("./auths/auths.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./auths/passport/jwt-auth.guard");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const categories_module_1 = require("./categories/categories.module");
const category_entity_1 = require("./categories/entities/category.entity");
const products_module_1 = require("./products/products.module");
const product_entity_1 = require("./products/entities/product.entity");
const importwarehouse_module_1 = require("./importwarehouse/importwarehouse.module");
const importdetailwarehosue_module_1 = require("./importdetailwarehosue/importdetailwarehosue.module");
const importwarehouse_entity_1 = require("./importwarehouse/entities/importwarehouse.entity");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const exportwarehouse_module_1 = require("./exportwarehouse/exportwarehouse.module");
const exportdetailwarehouse_module_1 = require("./exportdetailwarehouse/exportdetailwarehouse.module");
const customers_module_1 = require("./customers/customers.module");
const inventory_module_1 = require("./inventory/inventory.module");
const exportwarehouse_entity_1 = require("./exportwarehouse/entities/exportwarehouse.entity");
const exportdetailwarehouse_entity_1 = require("./exportdetailwarehouse/entities/exportdetailwarehouse.entity");
const customer_entity_1 = require("./customers/entities/customer.entity");
const inventory_entity_1 = require("./inventory/entities/inventory.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3307,
                username: 'root',
                password: '29012001',
                database: 'dbwarehouse',
                entities: [
                    user_entity_1.User,
                    category_entity_1.Category,
                    product_entity_1.Product,
                    importwarehouse_entity_1.Importwarehouse,
                    importdetailwarehosue_module_1.ImportdetailwarehosueModule,
                    exportwarehouse_entity_1.ExportWarehouse,
                    exportdetailwarehouse_entity_1.ExportDetailWarehouse,
                    customer_entity_1.Customer,
                    inventory_entity_1.Inventory,
                ],
                synchronize: true,
                autoLoadEntities: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                category_entity_1.Category,
                product_entity_1.Product,
                importwarehouse_entity_1.Importwarehouse,
                importdetailwarehosue_module_1.ImportdetailwarehosueModule,
                exportwarehouse_entity_1.ExportWarehouse,
                exportdetailwarehouse_entity_1.ExportDetailWarehouse,
                customer_entity_1.Customer,
                inventory_entity_1.Inventory,
            ]),
            users_module_1.UsersModule,
            auths_module_1.AuthsModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'vanphuongvip29@gmail.com',
                        pass: 'olisssgpkmbupglq',
                    },
                },
                defaults: {
                    from: '"No Reply" <no-reply@localhost>',
                },
                template: {
                    dir: process.cwd() + '/src/mail/templates/',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            importwarehouse_module_1.ImportwarehouseModule,
            importdetailwarehosue_module_1.ImportdetailwarehosueModule,
            suppliers_module_1.SuppliersModule,
            exportwarehouse_module_1.ExportwarehouseModule,
            exportdetailwarehouse_module_1.ExportdetailwarehouseModule,
            customers_module_1.CustomersModule,
            inventory_module_1.InventoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map