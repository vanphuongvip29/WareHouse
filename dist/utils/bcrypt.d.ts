export declare const hashPasswordUtil: (plainPassword: string) => Promise<string | undefined>;
export declare const comparePasswordUtil: (plainPassword: string, hashPassword: string) => Promise<boolean | undefined>;
