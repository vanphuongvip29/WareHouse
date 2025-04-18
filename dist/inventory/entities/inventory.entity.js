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
exports.Inventory = void 0;
const product_entity_1 = require("../../products/entities/product.entity");
const typeorm_1 = require("typeorm");
let Inventory = class Inventory {
    productID;
    quantity;
    product;
};
exports.Inventory = Inventory;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Inventory.prototype, "productID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'productID' }),
    __metadata("design:type", product_entity_1.Product)
], Inventory.prototype, "product", void 0);
exports.Inventory = Inventory = __decorate([
    (0, typeorm_1.Entity)()
], Inventory);
//# sourceMappingURL=inventory.entity.js.map