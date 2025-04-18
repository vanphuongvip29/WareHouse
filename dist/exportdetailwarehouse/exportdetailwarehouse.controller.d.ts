import { ExportdetailwarehouseService } from './exportdetailwarehouse.service';
import { CreateExportdetailwarehouseDto } from './dto/create-exportdetailwarehouse.dto';
import { UpdateExportdetailwarehouseDto } from './dto/update-exportdetailwarehouse.dto';
export declare class ExportdetailwarehouseController {
    private readonly exportdetailwarehouseService;
    constructor(exportdetailwarehouseService: ExportdetailwarehouseService);
    create(createExportdetailwarehouseDto: CreateExportdetailwarehouseDto): Promise<import("./entities/exportdetailwarehouse.entity").ExportDetailWarehouse>;
    findAll(): Promise<import("./entities/exportdetailwarehouse.entity").ExportDetailWarehouse[]>;
    findOne(id: string): Promise<import("./entities/exportdetailwarehouse.entity").ExportDetailWarehouse>;
    update(id: string, updateExportdetailwarehouseDto: UpdateExportdetailwarehouseDto): Promise<import("./entities/exportdetailwarehouse.entity").ExportDetailWarehouse>;
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': import("./entities/exportdetailwarehouse.entity").ExportDetailWarehouse;
    }>;
}
