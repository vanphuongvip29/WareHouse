import { IsOptional } from 'class-validator';
import { Supplier } from 'src/suppliers/entities/supplier.entity';

export class UpdateImportwarehouseDto {
  @IsOptional()
  supplierID: Supplier;

  @IsOptional()
  totalAmount: number;

  @IsOptional()
  importDate: string;
}
