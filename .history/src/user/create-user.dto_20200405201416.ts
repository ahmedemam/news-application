export class CreateUserDTO {
    readonly username: string;
    readonly token: string;
    readonly email: string;
    readonly password: string;
    readonly sources: string[];
    readonly category: string[];
    readonly language: string[];
    readonly country: string[];
    readonly created_at: Date;
}