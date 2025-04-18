import { Importwarehouse } from 'src/importwarehouse/entities/importwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class Supplier {
    supplierID: number;
    supplierName: string;
    address: string;
    phone: string;
    productID: Product[];
    importwarehouseID: Importwarehouse[];
}
