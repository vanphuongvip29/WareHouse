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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const typeorm_2 = require("typeorm");
let CustomersService = class CustomersService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async checkNameCustomer(name) {
        return await this.customerRepository.exists({
            where: { customerName: name },
        });
    }
    async create(createCustomerDto) {
        const isExist = await this.checkNameCustomer(createCustomerDto.customerName);
        if (isExist) {
            throw new common_1.BadRequestException('Tên khách hàng đã tồn tại');
        }
        return await this.customerRepository.save(createCustomerDto);
    }
    async findAll() {
        return await this.customerRepository.find();
    }
    async findID(id) {
        const findCus = await this.customerRepository.findOne({
            where: { customerID: id },
        });
        if (!findCus) {
            throw new common_1.NotFoundException('Không tìm thấy khách hàng');
        }
        return findCus;
    }
    async update(id, updateCustomerDto) {
        const customer = await this.findID(id);
        if (!customer) {
            throw new common_1.NotFoundException('Khách hàng không tồn tại');
        }
        if (updateCustomerDto.customerName &&
            customer.customerName !== updateCustomerDto.customerName) {
            const isExist = await this.checkNameCustomer(updateCustomerDto.customerName);
            if (isExist) {
                throw new common_1.BadRequestException('Tên khách hàng đã tồn tại');
            }
        }
        Object.assign(customer, updateCustomerDto);
        const saveCustomer = await this.customerRepository.save(customer);
        return saveCustomer;
    }
    async remove(id) {
        const cus = await this.customerRepository.findOneBy({ customerID: id });
        if (!cus) {
            throw new common_1.BadRequestException(` Khách hàng ${id} không tìm thấy`);
        }
        const result = await this.customerRepository.remove(cus);
        return { status: common_1.HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map