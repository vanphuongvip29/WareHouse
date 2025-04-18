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
exports.Product = void 0;
const category_entity_1 = require("../../categories/entities/category.entity");
const exportdetailwarehouse_entity_1 = require("../../exportdetailwarehouse/entities/exportdetailwarehouse.entity");
const importdetailwarehosue_entity_1 = require("../../importdetailwarehosue/entities/importdetailwarehosue.entity");
const supplier_entity_1 = require("../../suppliers/entities/supplier.entity");
const typeorm_1 = require("typeorm");
let Product = class Product {
    productID;
    productName;
    description;
    unit;
    importPrice;
    salePrice;
    categoryID;
    supplierID;
    importDetailProductID;
    exportDetailID;
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "productID", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "importPrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "salePrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.productID),
    (0, typeorm_1.JoinColumn)({ name: 'categoryID' }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "categoryID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (supplier) => supplier.productID),
    (0, typeorm_1.JoinColumn)({ name: 'supplierID' }),
    __metadata("design:type", supplier_entity_1.Supplier)
], Product.prototype, "supplierID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => importdetailwarehosue_entity_1.Importdetailwarehosue, (importDetailProduct) => importDetailProduct.productID),
    __metadata("design:type", Array)
], Product.prototype, "importDetailProductID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exportdetailwarehouse_entity_1.ExportDetailWarehouse, (exportDetailWarehouse) => exportDetailWarehouse.productID),
    __metadata("design:type", Array)
], Product.prototype, "exportDetailID", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
//# sourceMappingURL=product.entity.js.map