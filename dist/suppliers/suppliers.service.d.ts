import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
export declare class SuppliersService {
    private supplierRepository;
    constructor(supplierRepository: Repository<Supplier>);
    checkSupplierName(name: string): Promise<boolean>;
    create(createSupplierDto: CreateSupplierDto): Promise<CreateSupplierDto & Supplier>;
    findAll(): Promise<Supplier[]>;
    findID(id: number): Promise<Supplier>;
    update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<{
        supplierName: string;
        address: string;
        phone: string;
        supplierID: number;
        productID: import("../products/entities/product.entity").Product[];
        importwarehouseID: import("../importwarehouse/entities/importwarehouse.entity").Importwarehouse[];
    } & Supplier>;
    remove(id: number): Promise<Supplier>;
}
