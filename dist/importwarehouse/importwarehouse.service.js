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
exports.ImportwarehouseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const importwarehouse_entity_1 = require("./entities/importwarehouse.entity");
const typeorm_2 = require("typeorm");
const suppliers_service_1 = require("../suppliers/suppliers.service");
let ImportwarehouseService = class ImportwarehouseService {
    importRepository;
    suppliersService;
    constructor(importRepository, suppliersService) {
        this.importRepository = importRepository;
        this.suppliersService = suppliersService;
    }
    async create(createImportwarehouseDto) {
        const findSupplier = await this.suppliersService.findID(+createImportwarehouseDto.supplierID);
        const createImport = this.importRepository.create({
            ...createImportwarehouseDto,
            supplierID: findSupplier,
        });
        return await this.importRepository.save(createImport);
    }
    async findAll() {
        return await this.importRepository.find({ relations: ['supplierID'] });
    }
    async findID(id) {
        const findSup = await this.importRepository.findOne({
            where: { importID: id },
            relations: ['supplierID'],
        });
        if (!findSup) {
            throw new common_1.BadGatewayException('không tìm thấy nhập kho');
        }
        return findSup;
    }
    async update(id, updateImportwarehouseDto) {
        const findImport = await this.findID(id);
        let supID = findImport.supplierID;
        if (updateImportwarehouseDto.supplierID) {
            supID = await this.suppliersService.findID(+updateImportwarehouseDto.supplierID);
        }
        const createProduct = await this.importRepository.create({
            ...findImport,
            totalAmount: updateImportwarehouseDto.totalAmount,
            importDate: updateImportwarehouseDto.importDate,
            supplierID: supID,
        });
        return await this.importRepository.save(createProduct);
    }
    async remove(id) {
        const importWarehous = await this.findID(id);
        const result = await this.importRepository.remove(importWarehous);
        return result;
    }
};
exports.ImportwarehouseService = ImportwarehouseService;
exports.ImportwarehouseService = ImportwarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(importwarehouse_entity_1.Importwarehouse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        suppliers_service_1.SuppliersService])
], ImportwarehouseService);
//# sourceMappingURL=importwarehouse.service.js.map