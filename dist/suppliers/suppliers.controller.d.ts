import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDto: CreateSupplierDto): Promise<CreateSupplierDto & import("./entities/supplier.entity").Supplier>;
    findAll(): Promise<import("./entities/supplier.entity").Supplier[]>;
    findOne(id: string): Promise<import("./entities/supplier.entity").Supplier>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<{
        supplierName: string;
        address: string;
        phone: string;
        supplierID: number;
        productID: import("../products/entities/product.entity").Product[];
        importwarehouseID: import("../importwarehouse/entities/importwarehouse.entity").Importwarehouse[];
    } & import("./entities/supplier.entity").Supplier>;
    remove(id: string): Promise<import("./entities/supplier.entity").Supplier>;
}
