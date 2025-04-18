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
exports.ExportwarehouseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exportwarehouse_entity_1 = require("./entities/exportwarehouse.entity");
const typeorm_2 = require("typeorm");
const customers_service_1 = require("../customers/customers.service");
let ExportwarehouseService = class ExportwarehouseService {
    exportRepository;
    customerService;
    constructor(exportRepository, customerService) {
        this.exportRepository = exportRepository;
        this.customerService = customerService;
    }
    async create(createExportwarehouseDto) {
        const findCustomer = await this.customerService.findID(+createExportwarehouseDto.customerID);
        const createExport = this.exportRepository.create({
            ...createExportwarehouseDto,
            customerID: findCustomer,
        });
        return await this.exportRepository.save(createExport);
    }
    async findAll() {
        return await this.exportRepository.find();
    }
    async findID(id) {
        const findExp = await this.exportRepository.findOne({
            where: { exportID: id },
        });
        if (!findExp) {
            throw new common_1.NotFoundException('Không tìm thấy phiếu xuất');
        }
        return findExp;
    }
    async update(id, updateExportwarehouseDto) {
        const findExport = await this.findID(id);
        let cusID = findExport.customerID;
        if (updateExportwarehouseDto.customerID) {
            cusID = await this.customerService.findID(+updateExportwarehouseDto.customerID);
        }
        const createExport = await this.exportRepository.create({
            ...findExport,
            exportDate: updateExportwarehouseDto.exportDate,
            totalAmount: updateExportwarehouseDto.totalAmount,
            customerID: cusID,
        });
        return await this.exportRepository.save(createExport);
    }
    async remove(id) {
        const exp = await this.findID(id);
        const result = await this.exportRepository.remove(exp);
        return { status: common_1.HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
    }
};
exports.ExportwarehouseService = ExportwarehouseService;
exports.ExportwarehouseService = ExportwarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exportwarehouse_entity_1.ExportWarehouse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        customers_service_1.CustomersService])
], ExportwarehouseService);
//# sourceMappingURL=exportwarehouse.service.js.map