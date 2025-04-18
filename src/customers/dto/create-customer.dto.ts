import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Tên khách hàng không được trống' })
  customerName: string;

  @IsNotEmpty({ message: 'Địa chỉ không được trống' })
  address: string;

  @IsNotEmpty({ message: 'Số điện thoại không được trống' })
  phone: string;

  @IsOptional()
  status: string;
}
