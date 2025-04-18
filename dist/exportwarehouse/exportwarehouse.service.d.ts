import { HttpStatus } from '@nestjs/common';
import { CreateExportwarehouseDto } from './dto/create-exportwarehouse.dto';
import { UpdateExportwarehouseDto } from './dto/update-exportwarehouse.dto';
import { ExportWarehouse } from './entities/exportwarehouse.entity';
import { Repository } from 'typeorm';
import { CustomersService } from 'src/customers/customers.service';
export declare class ExportwarehouseService {
    private exportRepository;
    private customerService;
    constructor(exportRepository: Repository<ExportWarehouse>, customerService: CustomersService);
    create(createExportwarehouseDto: CreateExportwarehouseDto): Promise<ExportWarehouse>;
    findAll(): Promise<ExportWarehouse[]>;
    findID(id: number): Promise<ExportWarehouse>;
    update(id: number, updateExportwarehouseDto: UpdateExportwarehouseDto): Promise<ExportWarehouse>;
    remove(id: number): Promise<{
        status: HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': ExportWarehouse;
    }>;
}
