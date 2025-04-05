import { IsOptional } from 'class-validator';

export class UpdateSupplierDto {
  @IsOptional()
  supplierName: string;

  @IsOptional()
  address: string;

  @IsOptional()
  phone: string;
}
