import { ExportwarehouseService } from './exportwarehouse.service';
import { CreateExportwarehouseDto } from './dto/create-exportwarehouse.dto';
import { UpdateExportwarehouseDto } from './dto/update-exportwarehouse.dto';
export declare class ExportwarehouseController {
    private readonly exportwarehouseService;
    constructor(exportwarehouseService: ExportwarehouseService);
    create(createExportwarehouseDto: CreateExportwarehouseDto): Promise<import("./entities/exportwarehouse.entity").ExportWarehouse>;
    findAll(): Promise<import("./entities/exportwarehouse.entity").ExportWarehouse[]>;
    findOne(id: string): Promise<import("./entities/exportwarehouse.entity").ExportWarehouse>;
    update(id: string, updateExportwarehouseDto: UpdateExportwarehouseDto): Promise<import("./entities/exportwarehouse.entity").ExportWarehouse>;
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': import("./entities/exportwarehouse.entity").ExportWarehouse;
    }>;
}
