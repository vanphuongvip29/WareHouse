import { Category } from 'src/categories/entities/category.entity';
import { ExportDetailWarehouse } from 'src/exportdetailwarehouse/entities/exportdetailwarehouse.entity';
import { Importdetailwarehosue } from 'src/importdetailwarehosue/entities/importdetailwarehosue.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
export declare class Product {
    productID: number;
    productName: string;
    description: string;
    unit: string;
    importPrice: number;
    salePrice: number;
    categoryID: Category;
    supplierID: Supplier;
    importDetailProductID: Importdetailwarehosue[];
    exportDetailID: ExportDetailWarehouse[];
}
