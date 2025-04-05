import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async checkNameCustomer(name: string): Promise<boolean> {
    return await this.customerRepository.exists({
      where: { customerName: name },
    });
  }

  async create(createCustomerDto: CreateCustomerDto) {
    //kiểm tra tên KH đã tồn tại chưa
    const isExist = await this.checkNameCustomer(
      createCustomerDto.customerName,
    );
    if (isExist) {
      throw new BadRequestException('Tên khách hàng đã tồn tại');
    }

    return await this.customerRepository.save(createCustomerDto);
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const findCus = await this.customerRepository.findOne({
      where: { customerID: id },
    });

    if (!findCus) {
      throw new NotFoundException('Không tìm thấy KH');
    }
    return findCus;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException('Khách hàng không tồn tại');
    }

    // Kiểm tra tên khách hàng tồn tại (nếu tên được cập nhật)
    if (
      updateCustomerDto.customerName &&
      customer.customerName !== updateCustomerDto.customerName
    ) {
      const isExist = await this.checkNameCustomer(
        updateCustomerDto.customerName,
      );
      if (isExist) {
        throw new BadRequestException('Tên khách hàng đã tồn tại');
      }
    }

    Object.assign(customer, updateCustomerDto);

    const saveCustomer = await this.customerRepository.save(customer);

    return saveCustomer;
  }

  async remove(id: number) {
    const cus = await this.customerRepository.findOneBy({ customerID: id });
    if (!cus) {
      throw new BadRequestException(` Khách hàng ${id} not found`);
    }
    const result = await this.customerRepository.remove(cus);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
