import { HttpStatus } from '@nestjs/common';
import { CreateExportdetailwarehouseDto } from './dto/create-exportdetailwarehouse.dto';
import { UpdateExportdetailwarehouseDto } from './dto/update-exportdetailwarehouse.dto';
import { ExportDetailWarehouse } from './entities/exportdetailwarehouse.entity';
import { Repository } from 'typeorm';
import { ExportwarehouseService } from 'src/exportwarehouse/exportwarehouse.service';
import { ProductsService } from 'src/products/products.service';
export declare class ExportdetailwarehouseService {
    private exportDetailRepository;
    private exportService;
    private productsService;
    constructor(exportDetailRepository: Repository<ExportDetailWarehouse>, exportService: ExportwarehouseService, productsService: ProductsService);
    create(createExportdetailwarehouseDto: CreateExportdetailwarehouseDto): Promise<ExportDetailWarehouse>;
    findAll(): Promise<ExportDetailWarehouse[]>;
    findID(id: number): Promise<ExportDetailWarehouse>;
    update(id: number, updateExportdetailwarehouseDto: UpdateExportdetailwarehouseDto): Promise<ExportDetailWarehouse>;
    remove(id: number): Promise<{
        status: HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': ExportDetailWarehouse;
    }>;
}
