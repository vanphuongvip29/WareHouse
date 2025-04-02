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

export class CodeAuthDto {
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'code không được để trống' })
  codeId: string;
}

export class ChangePassword {
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'password cũ mới không được để trống' })
  passWordOld: string;

  @IsNotEmpty({ message: 'password mới không được để trống' })
  passWordNew: string;

  @IsNotEmpty({ message: 'confirmPassword không được để trống' })
  confirmPassword: string;

  // @IsNotEmpty({ message: 'codeId không được để trống' })
  // codeId: string;
}
