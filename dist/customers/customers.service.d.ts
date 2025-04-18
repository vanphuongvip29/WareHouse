import { HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
export declare class CustomersService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    checkNameCustomer(name: string): Promise<boolean>;
    create(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerDto & Customer>;
    findAll(): Promise<Customer[]>;
    findID(id: number): Promise<Customer>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    remove(id: number): Promise<{
        status: HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': Customer;
    }>;
}
