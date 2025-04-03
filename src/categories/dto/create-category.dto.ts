import { IsNotEmpty } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'categoryName không được để trống' })
  categoryName: string;
}
