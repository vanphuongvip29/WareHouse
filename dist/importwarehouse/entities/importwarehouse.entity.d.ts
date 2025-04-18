import { Importdetailwarehosue } from 'src/importdetailwarehosue/entities/importdetailwarehosue.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
export declare class Importwarehouse {
    importID: number;
    supplierID: Supplier;
    totalAmount: number;
    importDate: string;
    importDetailWarehosueID: Importdetailwarehosue[];
}
