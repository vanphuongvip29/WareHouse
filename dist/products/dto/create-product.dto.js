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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const category_entity_1 = require("../../categories/entities/category.entity");
const supplier_entity_1 = require("../../suppliers/entities/supplier.entity");
class CreateProductDto {
    productName;
    description;
    unit;
    importPrice;
    salePrice;
    categoryID;
    supplierID;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'categoryName không được để trống' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "unit", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "importPrice", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "salePrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'categoryID không được để trống' }),
    __metadata("design:type", category_entity_1.Category)
], CreateProductDto.prototype, "categoryID", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'supplierID không được để trống' }),
    __metadata("design:type", supplier_entity_1.Supplier)
], CreateProductDto.prototype, "supplierID", void 0);
//# sourceMappingURL=create-product.dto.js.map