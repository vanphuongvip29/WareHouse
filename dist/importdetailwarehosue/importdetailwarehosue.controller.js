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
exports.ImportdetailwarehosueController = void 0;
const common_1 = require("@nestjs/common");
const importdetailwarehosue_service_1 = require("./importdetailwarehosue.service");
const create_importdetailwarehosue_dto_1 = require("./dto/create-importdetailwarehosue.dto");
const update_importdetailwarehosue_dto_1 = require("./dto/update-importdetailwarehosue.dto");
const customize_1 = require("../decorator/customize");
let ImportdetailwarehosueController = class ImportdetailwarehosueController {
    importdetailwarehosueService;
    constructor(importdetailwarehosueService) {
        this.importdetailwarehosueService = importdetailwarehosueService;
    }
    create(createImportdetailwarehosueDto) {
        return this.importdetailwarehosueService.create(createImportdetailwarehosueDto);
    }
    findAll() {
        return this.importdetailwarehosueService.findAll();
    }
    findOne(id) {
        return this.importdetailwarehosueService.findID(+id);
    }
    update(id, updateImportdetailwarehosueDto) {
        return this.importdetailwarehosueService.update(+id, updateImportdetailwarehosueDto);
    }
    remove(id) {
        return this.importdetailwarehosueService.remove(+id);
    }
};
exports.ImportdetailwarehosueController = ImportdetailwarehosueController;
__decorate([
    (0, common_1.Post)(),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_importdetailwarehosue_dto_1.CreateImportdetailwarehosueDto]),
    __metadata("design:returntype", void 0)
], ImportdetailwarehosueController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImportdetailwarehosueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImportdetailwarehosueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_importdetailwarehosue_dto_1.UpdateImportdetailwarehosueDto]),
    __metadata("design:returntype", void 0)
], ImportdetailwarehosueController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImportdetailwarehosueController.prototype, "remove", null);
exports.ImportdetailwarehosueController = ImportdetailwarehosueController = __decorate([
    (0, common_1.Controller)('importdetailwarehosue'),
    __metadata("design:paramtypes", [importdetailwarehosue_service_1.ImportdetailwarehosueService])
], ImportdetailwarehosueController);
//# sourceMappingURL=importdetailwarehosue.controller.js.map