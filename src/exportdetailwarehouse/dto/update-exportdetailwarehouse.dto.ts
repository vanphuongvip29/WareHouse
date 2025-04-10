import { IsOptional } from 'class-validator';
import { ExportWarehouse } from 'src/exportwarehouse/entities/exportwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';

export class UpdateExportdetailwarehouseDto {
  @IsOptional()
  productID: Product;

  @IsOptional()
  quantity: number;

  @IsOptional()
  salePrice: number;

  @IsOptional()
  exportID: ExportWarehouse;
}
