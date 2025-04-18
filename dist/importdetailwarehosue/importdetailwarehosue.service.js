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
exports.ImportdetailwarehosueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const importdetailwarehosue_entity_1 = require("./entities/importdetailwarehosue.entity");
const typeorm_2 = require("typeorm");
const products_service_1 = require("../products/products.service");
const importwarehouse_service_1 = require("../importwarehouse/importwarehouse.service");
let ImportdetailwarehosueService = class ImportdetailwarehosueService {
    importDetailRepository;
    productsService;
    importsService;
    constructor(importDetailRepository, productsService, importsService) {
        this.importDetailRepository = importDetailRepository;
        this.productsService = productsService;
        this.importsService = importsService;
    }
    async create(createImportdetailwarehosueDto) {
        const findImportID = await this.importsService.findID(+createImportdetailwarehosueDto.importID);
        const findProID = await this.productsService.findID(+createImportdetailwarehosueDto.productID);
        const createImportDetail = this.importDetailRepository.create({
            ...createImportdetailwarehosueDto,
            importID: findImportID,
            productID: findProID,
        });
        return await this.importDetailRepository.save(createImportDetail);
    }
    async findAll() {
        return await this.importDetailRepository.find({
            relations: ['productID', 'importID'],
        });
    }
    async findID(id) {
        const findImportDetail = await this.importDetailRepository.findOne({
            where: { importDetailID: id },
            relations: ['productID', 'importID'],
        });
        if (!findImportDetail) {
            throw new common_1.BadGatewayException('Không tìm thấy nhập kho chi tiết');
        }
        return findImportDetail;
    }
    async update(id, updateImportdetailwarehosueDto) {
        const findImportDetail = await this.findID(id);
        let importID = findImportDetail.importID;
        if (updateImportdetailwarehosueDto.importID) {
            importID = await this.importsService.findID(+updateImportdetailwarehosueDto.importID);
        }
        let productID = findImportDetail.productID;
        if (updateImportdetailwarehosueDto.productID) {
            productID = await this.productsService.findID(+updateImportdetailwarehosueDto.productID);
        }
        const updateImportDetail = await this.importDetailRepository.create({
            ...findImportDetail,
            quantity: updateImportdetailwarehosueDto.quantity,
            importPrice: updateImportdetailwarehosueDto.importPrice,
            importID: importID,
            productID: productID,
        });
        return await this.importDetailRepository.save(updateImportDetail);
    }
    async remove(id) {
        const importDetail = await this.findID(id);
        const result = await this.importDetailRepository.remove(importDetail);
        return result;
    }
};
exports.ImportdetailwarehosueService = ImportdetailwarehosueService;
exports.ImportdetailwarehosueService = ImportdetailwarehosueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(importdetailwarehosue_entity_1.Importdetailwarehosue)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        products_service_1.ProductsService,
        importwarehouse_service_1.ImportwarehouseService])
], ImportdetailwarehosueService);
//# sourceMappingURL=importdetailwarehosue.service.js.map