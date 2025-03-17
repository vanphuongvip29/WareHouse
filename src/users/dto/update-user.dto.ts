import { IsDate, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {
    // userName: string;
    // email: string; 
    // passWord: string;
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsDate()
    @IsOptional()
    dateOfBirth: Date;
}
