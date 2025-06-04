import { IsOptional } from 'class-validator';
import { Customer } from 'src/customers/entities/customer.entity';

export class UpdateExportwarehouseDto {
  @IsOptional()
  exportDate: Date;
  @IsOptional()
  totalAmount: number;

  @IsOptional()
  customerID: Customer;
}

export class UpdateDtoExport {
  @IsOptional()
  totalAmount: number;

  @IsOptional()
  exportDate: Date;

  @IsOptional()
  customerID: number;

  @IsOptional()
  products: {
    exportDetailID?: number;
    productID: number;
    quantity: number;
    salePrice: number;
  }[];
}

export class CkeckBanking {
  @IsOptional()
  totalAmount: number;

  @IsOptional()
  code: string;
}
