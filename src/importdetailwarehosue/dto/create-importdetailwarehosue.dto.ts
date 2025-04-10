import { IsNotEmpty, IsNumber } from 'class-validator';
import { Importwarehouse } from 'src/importwarehouse/entities/importwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateImportdetailwarehosueDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  importPrice: number;

  @IsNotEmpty({ message: 'id nhập kho không được trống' })
  importID: Importwarehouse;

  @IsNotEmpty({ message: 'id sản phẩm không được trống' })
  productID: Product;
}
