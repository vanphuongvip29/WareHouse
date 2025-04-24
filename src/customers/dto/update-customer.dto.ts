import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  customerName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  address: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  status: string;
}
