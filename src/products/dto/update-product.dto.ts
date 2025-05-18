import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';

export class UpdateProductDto {
  @IsOptional()
  productName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsString()
  unit: string;

  @IsOptional()
  categoryID: Category;

  @IsOptional()
  supplierID: Supplier;
}
