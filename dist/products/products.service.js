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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const categories_service_1 = require("../categories/categories.service");
const suppliers_service_1 = require("../suppliers/suppliers.service");
let ProductsService = class ProductsService {
    productRepository;
    categoryService;
    supplierService;
    constructor(productRepository, categoryService, supplierService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.supplierService = supplierService;
    }
    async checkNameProExists(name) {
        return this.productRepository.exists({ where: { productName: name } });
    }
    async create(createProductDto) {
        const isNameExist = await this.checkNameProExists(createProductDto.productName);
        if (isNameExist) {
            throw new common_1.BadRequestException(`tên sản phẩm đã tồn tại: ${createProductDto.productName}`);
        }
        const categoryId = await this.categoryService.findID(+createProductDto.categoryID);
        const supplierId = await this.supplierService.findID(+createProductDto.supplierID);
        const createProduct = this.productRepository.create({
            ...createProductDto,
            categoryID: categoryId,
            supplierID: supplierId,
        });
        return this.productRepository.save(createProduct);
    }
    async findAll() {
        return this.productRepository.find();
    }
    async findID(id) {
        const findPro = await this.productRepository.findOne({
            where: { productID: id },
            relations: ['categoryID'],
        });
        if (!findPro) {
            throw new common_1.BadGatewayException('Không tìm thấy sản phẩm');
        }
        return findPro;
    }
    async update(id, updateProductDto) {
        const findProId = await this.findID(id);
        if (updateProductDto.productName &&
            findProId.productName != updateProductDto.productName) {
            const isNameExist = await this.checkNameProExists(updateProductDto.productName);
            if (isNameExist) {
                throw new common_1.BadRequestException(`Tên sản phẩm đã tồn tại bạn vui lòng cập nhật tên khác: ${updateProductDto.productName}`);
            }
        }
        let cateID = findProId.categoryID;
        if (updateProductDto.categoryID) {
            cateID = await this.categoryService.findID(+updateProductDto.categoryID);
        }
        let suppID = findProId.supplierID;
        if (updateProductDto.supplierID) {
            suppID = await this.supplierService.findID(+updateProductDto.supplierID);
        }
        const createProduct = this.productRepository.create({
            ...findProId,
            productName: updateProductDto.productName,
            description: updateProductDto.description,
            unit: updateProductDto.unit,
            importPrice: updateProductDto.importPrice,
            salePrice: updateProductDto.salePrice,
            categoryID: cateID,
            supplierID: suppID,
        });
        return this.productRepository.save(createProduct);
    }
    async remove(id) {
        const pro = await this.findID(id);
        const result = await this.productRepository.remove(pro);
        return { status: common_1.HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService,
        suppliers_service_1.SuppliersService])
], ProductsService);
//# sourceMappingURL=products.service.js.map