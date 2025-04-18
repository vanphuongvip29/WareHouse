import { ImportwarehouseService } from './importwarehouse.service';
import { CreateImportwarehouseDto } from './dto/create-importwarehouse.dto';
import { UpdateImportwarehouseDto } from './dto/update-importwarehouse.dto';
export declare class ImportwarehouseController {
    private readonly importwarehouseService;
    constructor(importwarehouseService: ImportwarehouseService);
    create(createImportwarehouseDto: CreateImportwarehouseDto): Promise<import("./entities/importwarehouse.entity").Importwarehouse>;
    findAll(): Promise<import("./entities/importwarehouse.entity").Importwarehouse[]>;
    findOne(id: string): Promise<import("./entities/importwarehouse.entity").Importwarehouse>;
    update(id: string, updateImportwarehouseDto: UpdateImportwarehouseDto): Promise<import("./entities/importwarehouse.entity").Importwarehouse>;
    remove(id: string): Promise<import("./entities/importwarehouse.entity").Importwarehouse>;
}
