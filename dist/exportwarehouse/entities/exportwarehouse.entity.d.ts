import { Customer } from 'src/customers/entities/customer.entity';
import { ExportDetailWarehouse } from 'src/exportdetailwarehouse/entities/exportdetailwarehouse.entity';
export declare class ExportWarehouse {
    exportID: number;
    exportDate: Date;
    customerID: Customer;
    totalAmount: number;
    exportDetailID: ExportDetailWarehouse[];
}
