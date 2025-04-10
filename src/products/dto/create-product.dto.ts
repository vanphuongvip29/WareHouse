import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'categoryName không được để trống' })
  productName: string;

  @IsString()
  description: string;

  @IsNumber()
  unit: string;

  @IsNumber()
  importPrice: number;

  @IsNumber()
  salePrice: number;

  @IsNotEmpty({ message: 'categoryID không được để trống' })
  categoryID: Category;

  @IsNotEmpty({ message: 'supplierID không được để trống' })
  supplierID: Supplier;
}
