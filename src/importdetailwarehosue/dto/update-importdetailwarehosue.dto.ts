import { IsOptional } from 'class-validator';
import { Importwarehouse } from 'src/importwarehouse/entities/importwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';

export class UpdateImportdetailwarehosueDto {
  @IsOptional()
  quantity: number;

  @IsOptional()
  importPrice: number;

  @IsOptional()
  importID: Importwarehouse;

  @IsOptional()
  productID: Product;
}
