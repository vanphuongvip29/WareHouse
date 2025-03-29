import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'password không được để trống' })
  passWord: string;

  @IsOptional()
  userName: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  dateOfBirth: Date;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  role: string;

  @IsOptional()
  accountType: string;
}
