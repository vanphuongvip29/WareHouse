import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty({ message: 'Tên nhà cung cấp không được để trống' })
  @IsString()
  supplierName: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;

  @IsNotEmpty({ message: 'Số điện thoại được để trống' })
  phone: string;
}
