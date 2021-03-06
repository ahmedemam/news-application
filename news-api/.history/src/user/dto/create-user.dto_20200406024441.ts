export class CreateUserDTO {
    readonly _id: string;
    readonly username: string;
    readonly email: string;
    password: string;
    readonly sources: string[];
    readonly category: string[];
    readonly language: string[];
    readonly country: string[];
    readonly created_at: Date;
}