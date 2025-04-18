import { CreateImportdetailwarehosueDto } from './dto/create-importdetailwarehosue.dto';
import { UpdateImportdetailwarehosueDto } from './dto/update-importdetailwarehosue.dto';
import { Importdetailwarehosue } from './entities/importdetailwarehosue.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { ImportwarehouseService } from 'src/importwarehouse/importwarehouse.service';
export declare class ImportdetailwarehosueService {
    private importDetailRepository;
    private productsService;
    private importsService;
    constructor(importDetailRepository: Repository<Importdetailwarehosue>, productsService: ProductsService, importsService: ImportwarehouseService);
    create(createImportdetailwarehosueDto: CreateImportdetailwarehosueDto): Promise<Importdetailwarehosue>;
    findAll(): Promise<Importdetailwarehosue[]>;
    findID(id: number): Promise<Importdetailwarehosue>;
    update(id: number, updateImportdetailwarehosueDto: UpdateImportdetailwarehosueDto): Promise<Importdetailwarehosue>;
    remove(id: number): Promise<Importdetailwarehosue>;
}
