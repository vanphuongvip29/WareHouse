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
exports.UpdateImportwarehouseDto = void 0;
const class_validator_1 = require("class-validator");
const supplier_entity_1 = require("../../suppliers/entities/supplier.entity");
class UpdateImportwarehouseDto {
    supplierID;
    totalAmount;
    importDate;
}
exports.UpdateImportwarehouseDto = UpdateImportwarehouseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", supplier_entity_1.Supplier)
], UpdateImportwarehouseDto.prototype, "supplierID", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateImportwarehouseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateImportwarehouseDto.prototype, "importDate", void 0);
//# sourceMappingURL=update-importwarehouse.dto.js.map