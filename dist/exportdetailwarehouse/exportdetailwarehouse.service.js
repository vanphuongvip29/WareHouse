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
exports.ExportdetailwarehouseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exportdetailwarehouse_entity_1 = require("./entities/exportdetailwarehouse.entity");
const typeorm_2 = require("typeorm");
const exportwarehouse_service_1 = require("../exportwarehouse/exportwarehouse.service");
const products_service_1 = require("../products/products.service");
let ExportdetailwarehouseService = class ExportdetailwarehouseService {
    exportDetailRepository;
    exportService;
    productsService;
    constructor(exportDetailRepository, exportService, productsService) {
        this.exportDetailRepository = exportDetailRepository;
        this.exportService = exportService;
        this.productsService = productsService;
    }
    async create(createExportdetailwarehouseDto) {
        const findProID = await this.productsService.findID(+createExportdetailwarehouseDto.productID);
        const findExportID = await this.exportService.findID(+createExportdetailwarehouseDto.exportID);
        const createExportDetail = this.exportDetailRepository.create({
            ...createExportdetailwarehouseDto,
            exportID: findExportID,
            productID: findProID,
        });
        return await this.exportDetailRepository.save(createExportDetail);
    }
    async findAll() {
        return await this.exportDetailRepository.find();
    }
    async findID(id) {
        const findExpDetail = await this.exportDetailRepository.findOne({
            where: { exportDetailID: id },
        });
        if (!findExpDetail) {
            throw new common_1.NotFoundException('Không tìm thấy phiếu xuất chi tiết');
        }
        return findExpDetail;
    }
    async update(id, updateExportdetailwarehouseDto) {
        const findExportDetail = await this.findID(id);
        let exportID = findExportDetail.exportID;
        if (updateExportdetailwarehouseDto.exportID) {
            exportID = await this.exportService.findID(+updateExportdetailwarehouseDto.exportID);
        }
        let productID = findExportDetail.productID;
        if (updateExportdetailwarehouseDto.productID) {
            productID = await this.productsService.findID(+updateExportdetailwarehouseDto.productID);
        }
        const updateExxportDetail = await this.exportDetailRepository.create({
            ...findExportDetail,
            exportID: exportID,
            quantity: updateExportdetailwarehouseDto.quantity,
            salePrice: updateExportdetailwarehouseDto.salePrice,
            productID: productID,
        });
        return await this.exportDetailRepository.save(updateExxportDetail);
    }
    async remove(id) {
        const expDetail = await this.findID(id);
        const result = await this.exportDetailRepository.remove(expDetail);
        return { status: common_1.HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
    }
};
exports.ExportdetailwarehouseService = ExportdetailwarehouseService;
exports.ExportdetailwarehouseService = ExportdetailwarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exportdetailwarehouse_entity_1.ExportDetailWarehouse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        exportwarehouse_service_1.ExportwarehouseService,
        products_service_1.ProductsService])
], ExportdetailwarehouseService);
//# sourceMappingURL=exportdetailwarehouse.service.js.map