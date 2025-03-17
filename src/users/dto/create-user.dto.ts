import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, isString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({message: "userName không được để trống"})
    userName: string;
    
    @IsNotEmpty({message: "email không được để trống"})
    @IsEmail({}, { message: 'email không đúng định dạng' })
    email: string; 
    
    @IsNotEmpty({message: "password không được để trống"})
    passWord: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsDate()
    @IsOptional() // Cho phép trường này có thể không có giá trị
    dateOfBirth: Date;
}
