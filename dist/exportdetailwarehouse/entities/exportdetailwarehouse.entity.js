"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportDetailWarehouse = void 0;
const exportwarehouse_entity_1 = require("../../exportwarehouse/entities/exportwarehouse.entity");
const product_entity_1 = require("../../products/entities/product.entity");
const typeorm_1 = require("typeorm");
let ExportDetailWarehouse = class ExportDetailWarehouse {
    exportDetailID;
    exportID;
    productID;
    quantity;
    salePrice;
};
exports.ExportDetailWarehouse = ExportDetailWarehouse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExportDetailWarehouse.prototype, "exportDetailID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exportwarehouse_entity_1.ExportWarehouse, (exportWarehouse) => exportWarehouse.exportDetailID),
    (0, typeorm_1.JoinColumn)({ name: 'exportID' }),
    __metadata("design:type", exportwarehouse_entity_1.ExportWarehouse)
], ExportDetailWarehouse.prototype, "exportID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.exportDetailID),
    (0, typeorm_1.JoinColumn)({ name: 'productID' }),
    __metadata("design:type", product_entity_1.Product)
], ExportDetailWarehouse.prototype, "productID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExportDetailWarehouse.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExportDetailWarehouse.prototype, "salePrice", void 0);
exports.ExportDetailWarehouse = ExportDetailWarehouse = __decorate([
    (0, typeorm_1.Entity)()
], ExportDetailWarehouse);
//# sourceMappingURL=exportdetailwarehouse.entity.js.map