"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportdetailwarehosueModule = void 0;
const common_1 = require("@nestjs/common");
const importdetailwarehosue_service_1 = require("./importdetailwarehosue.service");
const importdetailwarehosue_controller_1 = require("./importdetailwarehosue.controller");
const typeorm_1 = require("@nestjs/typeorm");
const importdetailwarehosue_entity_1 = require("./entities/importdetailwarehosue.entity");
const products_module_1 = require("../products/products.module");
const importwarehouse_module_1 = require("../importwarehouse/importwarehouse.module");
let ImportdetailwarehosueModule = class ImportdetailwarehosueModule {
};
exports.ImportdetailwarehosueModule = ImportdetailwarehosueModule;
exports.ImportdetailwarehosueModule = ImportdetailwarehosueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([importdetailwarehosue_entity_1.Importdetailwarehosue]),
            products_module_1.ProductsModule,
            importwarehouse_module_1.ImportwarehouseModule,
        ],
        controllers: [importdetailwarehosue_controller_1.ImportdetailwarehosueController],
        providers: [importdetailwarehosue_service_1.ImportdetailwarehosueService],
    })
], ImportdetailwarehosueModule);
//# sourceMappingURL=importdetailwarehosue.module.js.map