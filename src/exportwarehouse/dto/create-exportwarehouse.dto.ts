import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Customer } from 'src/customers/entities/customer.entity';

export class CreateExportwarehouseDto {
  @IsDateString()
  exportDate: Date;

  @IsNumber()
  totalAmount: number;

  @IsNotEmpty({ message: 'Tên khách hàng không được trống' })
  customerID: Customer;

  @IsOptional()
  code: string;
}

export interface ExportWithDetails {
  exportData: CreateExportwarehouseDto;
  exportDetails: CreateExportDetailWarehouseDto[];
}

export class CreateExportDetailWarehouseDto {
  @IsArray()
  @ArrayNotEmpty()
  productID: number; // Thay đổi kiểu dữ liệu ở đây
  quantity: number;
  salePrice: number;
}
