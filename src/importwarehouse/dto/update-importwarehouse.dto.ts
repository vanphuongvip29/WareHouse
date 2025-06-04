import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Importdetailwarehosue } from 'src/importdetailwarehosue/entities/importdetailwarehosue.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';

export class UpdateImportwarehouseDto {
  @IsOptional()
  supplierID: Supplier;

  @IsOptional()
  totalAmount: number;

  @IsOptional()
  importDate: string;
}

export class UpdateDto {
  @IsOptional()
  totalAmount: number;
  @IsOptional()
  importDate: Date;
  @IsOptional()
  supplierID: number;
  @IsOptional()
  products: {
    importDetailID?: number;
    productID: number;
    quantity: number;
    importPrice: number;
  }[];
}
