import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'categoryName không được để trống' })
  @IsString()
  categoryName: string;
}
