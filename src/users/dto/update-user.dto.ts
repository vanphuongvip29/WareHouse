import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  // userName: string;
  // email: string;
  @IsOptional()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsDate()
  @IsOptional()
  dateOfBirth: Date;
}
