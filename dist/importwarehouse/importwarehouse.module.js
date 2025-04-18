"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportwarehouseModule = void 0;
const common_1 = require("@nestjs/common");
const importwarehouse_service_1 = require("./importwarehouse.service");
const importwarehouse_controller_1 = require("./importwarehouse.controller");
const typeorm_1 = require("@nestjs/typeorm");
const importwarehouse_entity_1 = require("./entities/importwarehouse.entity");
const suppliers_module_1 = require("../suppliers/suppliers.module");
let ImportwarehouseModule = class ImportwarehouseModule {
};
exports.ImportwarehouseModule = ImportwarehouseModule;
exports.ImportwarehouseModule = ImportwarehouseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([importwarehouse_entity_1.Importwarehouse]), suppliers_module_1.SuppliersModule],
        controllers: [importwarehouse_controller_1.ImportwarehouseController],
        providers: [importwarehouse_service_1.ImportwarehouseService],
        exports: [importwarehouse_service_1.ImportwarehouseService],
    })
], ImportwarehouseModule);
//# sourceMappingURL=importwarehouse.module.js.map