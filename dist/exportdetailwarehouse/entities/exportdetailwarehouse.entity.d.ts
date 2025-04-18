import { ExportWarehouse } from 'src/exportwarehouse/entities/exportwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class ExportDetailWarehouse {
    exportDetailID: number;
    exportID: ExportWarehouse;
    productID: Product;
    quantity: number;
    salePrice: number;
}
