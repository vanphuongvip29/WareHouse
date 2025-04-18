import { Importwarehouse } from 'src/importwarehouse/entities/importwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';
export declare class CreateImportdetailwarehosueDto {
    quantity: number;
    importPrice: number;
    importID: Importwarehouse;
    productID: Product;
}
