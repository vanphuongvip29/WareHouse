import { CreateImportwarehouseDto } from './dto/create-importwarehouse.dto';
import { UpdateImportwarehouseDto } from './dto/update-importwarehouse.dto';
import { Importwarehouse } from './entities/importwarehouse.entity';
import { Repository } from 'typeorm';
import { SuppliersService } from 'src/suppliers/suppliers.service';
export declare class ImportwarehouseService {
    private importRepository;
    private suppliersService;
    constructor(importRepository: Repository<Importwarehouse>, suppliersService: SuppliersService);
    create(createImportwarehouseDto: CreateImportwarehouseDto): Promise<Importwarehouse>;
    findAll(): Promise<Importwarehouse[]>;
    findID(id: number): Promise<Importwarehouse>;
    update(id: number, updateImportwarehouseDto: UpdateImportwarehouseDto): Promise<Importwarehouse>;
    remove(id: number): Promise<Importwarehouse>;
}
