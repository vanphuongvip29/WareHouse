"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportwarehouseModule = void 0;
const common_1 = require("@nestjs/common");
const exportwarehouse_service_1 = require("./exportwarehouse.service");
const exportwarehouse_controller_1 = require("./exportwarehouse.controller");
const typeorm_1 = require("@nestjs/typeorm");
const exportwarehouse_entity_1 = require("./entities/exportwarehouse.entity");
const customers_module_1 = require("../customers/customers.module");
let ExportwarehouseModule = class ExportwarehouseModule {
};
exports.ExportwarehouseModule = ExportwarehouseModule;
exports.ExportwarehouseModule = ExportwarehouseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exportwarehouse_entity_1.ExportWarehouse]), customers_module_1.CustomersModule],
        controllers: [exportwarehouse_controller_1.ExportwarehouseController],
        providers: [exportwarehouse_service_1.ExportwarehouseService],
        exports: [exportwarehouse_service_1.ExportwarehouseService],
    })
], ExportwarehouseModule);
//# sourceMappingURL=exportwarehouse.module.js.map