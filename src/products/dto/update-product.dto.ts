import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class UpdateProductDto {
  @IsOptional()
  productName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber()
  unit: string;

  @IsOptional()
  @IsNumber()
  importPrice: number;

  @IsOptional()
  @IsNumber()
  salePrice: number;

  @IsOptional()
  categoryID: Category;
}
