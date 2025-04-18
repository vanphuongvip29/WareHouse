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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const supplier_entity_1 = require("./entities/supplier.entity");
const typeorm_2 = require("typeorm");
let SuppliersService = class SuppliersService {
    supplierRepository;
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    async checkSupplierName(name) {
        return await this.supplierRepository.exists({
            where: { supplierName: name },
        });
    }
    async create(createSupplierDto) {
        const checkName = await this.checkSupplierName(createSupplierDto.supplierName);
        if (checkName) {
            throw new common_1.BadRequestException('Tên nhà cung cấp đã tồn tại');
        }
        return await this.supplierRepository.save(createSupplierDto);
    }
    findAll() {
        return this.supplierRepository.find();
    }
    async findID(id) {
        const findSupp = await this.supplierRepository.findOne({
            where: { supplierID: id },
            relations: ['importwarehouseID'],
        });
        if (!findSupp) {
            throw new common_1.NotFoundException('Không tìm thấy nhà cung cấp');
        }
        return findSupp;
    }
    async update(id, updateSupplierDto) {
        const findSupp = await this.findID(id);
        if (!findSupp) {
            throw new common_1.NotFoundException('Không tìm thấy nhà cung cấp');
        }
        if (updateSupplierDto.supplierName &&
            findSupp.supplierName != updateSupplierDto.supplierName) {
            const isNameExist = await this.checkSupplierName(updateSupplierDto.supplierName);
            if (isNameExist) {
                throw new common_1.BadRequestException(`Tên nhà cung cấp đã tồn tại bạn vui lòng cập nhật tên khác: ${updateSupplierDto.supplierName}`);
            }
        }
        return await this.supplierRepository.save({
            ...findSupp,
            ...updateSupplierDto,
        });
    }
    async remove(id) {
        const findSup = await this.findID(id);
        return await this.supplierRepository.remove(findSup);
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map