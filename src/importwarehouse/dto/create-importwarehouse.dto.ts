import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Importwarehouse } from '../entities/importwarehouse.entity';

export class CreateImportwarehouseDto {
  @IsNotEmpty({ message: 'nhà cung cấp không được trống' })
  supplierID: Supplier;

  @IsNotEmpty({ message: 'tổng số lượng khồn được trống' })
  totalAmount: number;

  @IsString()
  importDate: string;
}

// Định nghĩa interface để nhận dữ liệu chi tiết nhập kho trong request
export interface ImportWithDetails {
  importData: CreateImportwarehouseDto;
  importDetails: CreateImportDetailWarehouseDto[];
}

// Định nghĩa DTO cho chi tiết nhập kho
export class CreateImportDetailWarehouseDto {
  @IsArray()
  @ArrayNotEmpty()
  productID: number; // Thay đổi kiểu dữ liệu ở đây
  quantity: number;
  importPrice: number;
}
