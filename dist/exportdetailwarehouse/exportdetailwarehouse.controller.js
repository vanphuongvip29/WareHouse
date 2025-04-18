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
exports.ExportdetailwarehouseController = void 0;
const common_1 = require("@nestjs/common");
const exportdetailwarehouse_service_1 = require("./exportdetailwarehouse.service");
const create_exportdetailwarehouse_dto_1 = require("./dto/create-exportdetailwarehouse.dto");
const update_exportdetailwarehouse_dto_1 = require("./dto/update-exportdetailwarehouse.dto");
const customize_1 = require("../decorator/customize");
let ExportdetailwarehouseController = class ExportdetailwarehouseController {
    exportdetailwarehouseService;
    constructor(exportdetailwarehouseService) {
        this.exportdetailwarehouseService = exportdetailwarehouseService;
    }
    create(createExportdetailwarehouseDto) {
        return this.exportdetailwarehouseService.create(createExportdetailwarehouseDto);
    }
    findAll() {
        return this.exportdetailwarehouseService.findAll();
    }
    findOne(id) {
        return this.exportdetailwarehouseService.findID(+id);
    }
    update(id, updateExportdetailwarehouseDto) {
        return this.exportdetailwarehouseService.update(+id, updateExportdetailwarehouseDto);
    }
    remove(id) {
        return this.exportdetailwarehouseService.remove(+id);
    }
};
exports.ExportdetailwarehouseController = ExportdetailwarehouseController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exportdetailwarehouse_dto_1.CreateExportdetailwarehouseDto]),
    __metadata("design:returntype", void 0)
], ExportdetailwarehouseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExportdetailwarehouseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExportdetailwarehouseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exportdetailwarehouse_dto_1.UpdateExportdetailwarehouseDto]),
    __metadata("design:returntype", void 0)
], ExportdetailwarehouseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExportdetailwarehouseController.prototype, "remove", null);
exports.ExportdetailwarehouseController = ExportdetailwarehouseController = __decorate([
    (0, common_1.Controller)('exportdetailwarehouse'),
    __metadata("design:paramtypes", [exportdetailwarehouse_service_1.ExportdetailwarehouseService])
], ExportdetailwarehouseController);
//# sourceMappingURL=exportdetailwarehouse.controller.js.map