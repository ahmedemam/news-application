export class CreateUserDTO {
    readonly id: string;
    readonly userName: string;
    readonly token: string;
    readonly email: string;
    readonly password: string;
    readonly sources: string [];
    readonly category: string[];
    readonly language: string[];
    readonly country: string [];
}