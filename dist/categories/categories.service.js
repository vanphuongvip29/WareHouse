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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("./entities/category.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CategoriesService = class CategoriesService {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async checkNameCateExists(name) {
        return this.categoryRepository.exists({ where: { categoryName: name } });
    }
    async create(createCategoryDto) {
        const { categoryName } = createCategoryDto;
        const isNameExist = await this.checkNameCateExists(categoryName);
        if (isNameExist) {
            throw new common_1.BadRequestException(`Tên danh mục đã tồn tại: ${createCategoryDto.categoryName}`);
        }
        return await this.categoryRepository.save(createCategoryDto);
    }
    async findAll() {
        const cate = await this.categoryRepository.find();
        return cate;
    }
    async queryBuilder(alias) {
        return this.categoryRepository.createQueryBuilder(alias);
    }
    async findID(id) {
        const findCate = await this.categoryRepository.findOne({
            where: { categoryID: id },
            relations: ['productID'],
        });
        if (!findCate)
            throw new common_1.BadGatewayException('Không tìm thấy danh mục');
        return findCate;
    }
    async update(id, updateCategoryDto) {
        const findCate = await this.categoryRepository.findOne({
            where: { categoryID: id },
        });
        if (!findCate) {
            throw new common_1.BadRequestException('Không tìm thấy danh mục ');
        }
        const { categoryName } = updateCategoryDto;
        const isNameExist = await this.checkNameCateExists(categoryName);
        if (isNameExist) {
            throw new common_1.BadRequestException(`Danh mục đã tồn tại bạn vui lòng cập nhật tên khác: ${updateCategoryDto.categoryName}`);
        }
        const createCate = await this.categoryRepository.create({
            ...findCate,
            categoryName: updateCategoryDto.categoryName,
        });
        const updateCate = await this.categoryRepository.save(createCate);
        return updateCate;
    }
    async remove(id) {
        const cate = await this.categoryRepository.findOneBy({ categoryID: id });
        if (!cate) {
            throw new common_1.BadRequestException(`Danh mục ${id} không tìm thấy`);
        }
        const result = await this.categoryRepository.remove(cate);
        return { status: common_1.HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map