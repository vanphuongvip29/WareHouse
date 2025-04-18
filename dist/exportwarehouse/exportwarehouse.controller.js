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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportwarehouseController = void 0;
const common_1 = require("@nestjs/common");
const exportwarehouse_service_1 = require("./exportwarehouse.service");
const create_exportwarehouse_dto_1 = require("./dto/create-exportwarehouse.dto");
const update_exportwarehouse_dto_1 = require("./dto/update-exportwarehouse.dto");
const customize_1 = require("../decorator/customize");
let ExportwarehouseController = class ExportwarehouseController {
    exportwarehouseService;
    constructor(exportwarehouseService) {
        this.exportwarehouseService = exportwarehouseService;
    }
    create(createExportwarehouseDto) {
        return this.exportwarehouseService.create(createExportwarehouseDto);
    }
    findAll() {
        return this.exportwarehouseService.findAll();
    }
    findOne(id) {
        return this.exportwarehouseService.findID(+id);
    }
    update(id, updateExportwarehouseDto) {
        return this.exportwarehouseService.update(+id, updateExportwarehouseDto);
    }
    remove(id) {
        return this.exportwarehouseService.remove(+id);
    }
};
exports.ExportwarehouseController = ExportwarehouseController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exportwarehouse_dto_1.CreateExportwarehouseDto]),
    __metadata("design:returntype", void 0)
], ExportwarehouseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExportwarehouseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExportwarehouseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exportwarehouse_dto_1.UpdateExportwarehouseDto]),
    __metadata("design:returntype", void 0)
], ExportwarehouseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExportwarehouseController.prototype, "remove", null);
exports.ExportwarehouseController = ExportwarehouseController = __decorate([
    (0, common_1.Controller)('exportwarehouse'),
    __metadata("design:paramtypes", [exportwarehouse_service_1.ExportwarehouseService])
], ExportwarehouseController);
//# sourceMappingURL=exportwarehouse.controller.js.map