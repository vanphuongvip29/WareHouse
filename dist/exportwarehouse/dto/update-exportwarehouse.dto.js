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
exports.UpdateExportwarehouseDto = void 0;
const class_validator_1 = require("class-validator");
const customer_entity_1 = require("../../customers/entities/customer.entity");
class UpdateExportwarehouseDto {
    exportDate;
    totalAmount;
    customerID;
}
exports.UpdateExportwarehouseDto = UpdateExportwarehouseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateExportwarehouseDto.prototype, "exportDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateExportwarehouseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", customer_entity_1.Customer)
], UpdateExportwarehouseDto.prototype, "customerID", void 0);
//# sourceMappingURL=update-exportwarehouse.dto.js.map