import { ImportdetailwarehosueService } from './importdetailwarehosue.service';
import { CreateImportdetailwarehosueDto } from './dto/create-importdetailwarehosue.dto';
import { UpdateImportdetailwarehosueDto } from './dto/update-importdetailwarehosue.dto';
export declare class ImportdetailwarehosueController {
    private readonly importdetailwarehosueService;
    constructor(importdetailwarehosueService: ImportdetailwarehosueService);
    create(createImportdetailwarehosueDto: CreateImportdetailwarehosueDto): Promise<import("./entities/importdetailwarehosue.entity").Importdetailwarehosue>;
    findAll(): Promise<import("./entities/importdetailwarehosue.entity").Importdetailwarehosue[]>;
    findOne(id: string): Promise<import("./entities/importdetailwarehosue.entity").Importdetailwarehosue>;
    update(id: string, updateImportdetailwarehosueDto: UpdateImportdetailwarehosueDto): Promise<import("./entities/importdetailwarehosue.entity").Importdetailwarehosue>;
    remove(id: string): Promise<import("./entities/importdetailwarehosue.entity").Importdetailwarehosue>;
}
