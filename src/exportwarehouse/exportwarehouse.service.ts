import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExportwarehouseDto } from './dto/create-exportwarehouse.dto';
import { UpdateExportwarehouseDto } from './dto/update-exportwarehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExportWarehouse } from './entities/exportwarehouse.entity';
import { Repository } from 'typeorm';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class ExportwarehouseService {
  constructor(
    @InjectRepository(ExportWarehouse)
    private exportRepository: Repository<ExportWarehouse>,
    private customerService: CustomersService,
  ) {}

  async create(createExportwarehouseDto: CreateExportwarehouseDto) {
    const findCustomer = await this.customerService.findID(
      +createExportwarehouseDto.customerID,
    );

    // Tạo đối tượng Product
    const createExport = this.exportRepository.create({
      ...createExportwarehouseDto,
      customerID: findCustomer,
    });
    return await this.exportRepository.save(createExport);
  }

  async findAll() {
    return await this.exportRepository.find({ relations: ['customerID'] });
  }

  async findID(id: number) {
    const findExp = await this.exportRepository.findOne({
      where: { exportID: id },
      relations: ['customerID'],
    });

    if (!findExp) {
      throw new NotFoundException('Không tìm thấy phiếu xuất');
    }
    return findExp;
  }

  async update(id: number, updateExportwarehouseDto: UpdateExportwarehouseDto) {
    const findExport = await this.findID(id);

    let cusID = findExport.customerID; // Giữ nguyên nhà cung cấp hiện tại nếu không có supplierID mới

    // Kiểm tra nếu supplierID được cung cấp
    if (updateExportwarehouseDto.customerID) {
      cusID = await this.customerService.findID(
        +updateExportwarehouseDto.customerID,
      );
    }

    const createExport = await this.exportRepository.create({
      ...findExport,
      exportDate: updateExportwarehouseDto.exportDate,
      totalAmount: updateExportwarehouseDto.totalAmount,
      customerID: cusID,
    });
    return await this.exportRepository.save(createExport);
  }

  async remove(id: number) {
    const exp = await this.findID(id);

    const result = await this.exportRepository.remove(exp);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
