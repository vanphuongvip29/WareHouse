export declare class CreateAuthDto {
    email: string;
    passWord: string;
    userName: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    isActive: boolean;
    role: string;
    accountType: string;
}
export declare class CodeAuthDto {
    email: string;
    codeId: string;
}
export declare class ChangePassword {
    email: string;
    passWordOld: string;
    passWordNew: string;
    confirmPassword: string;
}
