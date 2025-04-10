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
