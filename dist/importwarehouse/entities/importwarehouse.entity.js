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
exports.Importwarehouse = void 0;
const importdetailwarehosue_entity_1 = require("../../importdetailwarehosue/entities/importdetailwarehosue.entity");
const supplier_entity_1 = require("../../suppliers/entities/supplier.entity");
const typeorm_1 = require("typeorm");
let Importwarehouse = class Importwarehouse {
    importID;
    supplierID;
    totalAmount;
    importDate;
    importDetailWarehosueID;
};
exports.Importwarehouse = Importwarehouse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Importwarehouse.prototype, "importID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (supplier) => supplier.importwarehouseID),
    (0, typeorm_1.JoinColumn)({ name: 'supplierID' }),
    __metadata("design:type", supplier_entity_1.Supplier)
], Importwarehouse.prototype, "supplierID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Importwarehouse.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Importwarehouse.prototype, "importDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => importdetailwarehosue_entity_1.Importdetailwarehosue, (importDetailWarehosue) => importDetailWarehosue.importID),
    __metadata("design:type", Array)
], Importwarehouse.prototype, "importDetailWarehosueID", void 0);
exports.Importwarehouse = Importwarehouse = __decorate([
    (0, typeorm_1.Entity)()
], Importwarehouse);
//# sourceMappingURL=importwarehouse.entity.js.map