import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto & import("./entities/customer.entity").Customer>;
    findAll(): Promise<import("./entities/customer.entity").Customer[]>;
    findOne(id: string): Promise<import("./entities/customer.entity").Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<import("./entities/customer.entity").Customer>;
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': import("./entities/customer.entity").Customer;
    }>;
}
