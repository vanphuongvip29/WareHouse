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
exports.ExportWarehouse = void 0;
const customer_entity_1 = require("../../customers/entities/customer.entity");
const exportdetailwarehouse_entity_1 = require("../../exportdetailwarehouse/entities/exportdetailwarehouse.entity");
const typeorm_1 = require("typeorm");
let ExportWarehouse = class ExportWarehouse {
    exportID;
    exportDate;
    customerID;
    totalAmount;
    exportDetailID;
};
exports.ExportWarehouse = ExportWarehouse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExportWarehouse.prototype, "exportID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ExportWarehouse.prototype, "exportDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.exportID),
    (0, typeorm_1.JoinColumn)({ name: 'customerID' }),
    __metadata("design:type", customer_entity_1.Customer)
], ExportWarehouse.prototype, "customerID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExportWarehouse.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exportdetailwarehouse_entity_1.ExportDetailWarehouse, (exportDetailWarehouse) => exportDetailWarehouse.exportID),
    __metadata("design:type", Array)
], ExportWarehouse.prototype, "exportDetailID", void 0);
exports.ExportWarehouse = ExportWarehouse = __decorate([
    (0, typeorm_1.Entity)()
], ExportWarehouse);
//# sourceMappingURL=exportwarehouse.entity.js.map