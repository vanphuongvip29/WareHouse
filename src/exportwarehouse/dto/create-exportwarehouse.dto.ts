import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { Customer } from 'src/customers/entities/customer.entity';

export class CreateExportwarehouseDto {
  @IsDateString()
  exportDate: Date;

  @IsNumber()
  totalAmount: number;

  @IsNotEmpty({ message: 'Tên khách hàng không được trống' })
  customerID: Customer;
}
