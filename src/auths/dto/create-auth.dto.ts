import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty({message: "email không được để trống"})
    email: string;
    
    @IsNotEmpty({message: "password không được để trống"})
    passWord: string
}
