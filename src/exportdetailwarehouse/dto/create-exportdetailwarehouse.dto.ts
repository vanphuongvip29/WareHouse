import { IsNotEmpty, IsNumber } from 'class-validator';
import { ExportWarehouse } from 'src/exportwarehouse/entities/exportwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateExportdetailwarehouseDto {
  @IsNotEmpty({ message: 'Id sản phẩm k đc trống' })
  productID: Product;

  @IsNumber()
  quantity: number;

  @IsNumber()
  salePrice: number;

  @IsNotEmpty({ message: 'xuất k đc trống' })
  exportID: ExportWarehouse;
}
