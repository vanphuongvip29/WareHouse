import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Supplier } from 'src/suppliers/entities/supplier.entity';

export class CreateImportwarehouseDto {
  @IsNotEmpty({ message: 'nhà cung cấp không được trống' })
  supplierID: Supplier;

  @IsNotEmpty({ message: 'tổng số lượng khồn được trống' })
  totalAmount: number;

  @IsString()
  importDate: string;
}
