import { ExportWarehouse } from 'src/exportwarehouse/entities/exportwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class UpdateExportdetailwarehouseDto {
    productID: Product;
    quantity: number;
    salePrice: number;
    exportID: ExportWarehouse;
}
