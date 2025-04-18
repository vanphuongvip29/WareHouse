"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportdetailwarehouseModule = void 0;
const common_1 = require("@nestjs/common");
const exportdetailwarehouse_service_1 = require("./exportdetailwarehouse.service");
const exportdetailwarehouse_controller_1 = require("./exportdetailwarehouse.controller");
const typeorm_1 = require("@nestjs/typeorm");
const exportdetailwarehouse_entity_1 = require("./entities/exportdetailwarehouse.entity");
const products_module_1 = require("../products/products.module");
const exportwarehouse_module_1 = require("../exportwarehouse/exportwarehouse.module");
let ExportdetailwarehouseModule = class ExportdetailwarehouseModule {
};
exports.ExportdetailwarehouseModule = ExportdetailwarehouseModule;
exports.ExportdetailwarehouseModule = ExportdetailwarehouseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([exportdetailwarehouse_entity_1.ExportDetailWarehouse]),
            products_module_1.ProductsModule,
            exportwarehouse_module_1.ExportwarehouseModule,
        ],
        controllers: [exportdetailwarehouse_controller_1.ExportdetailwarehouseController],
        providers: [exportdetailwarehouse_service_1.ExportdetailwarehouseService],
    })
], ExportdetailwarehouseModule);
//# sourceMappingURL=exportdetailwarehouse.module.js.map