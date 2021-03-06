import { Document, PassportLocalDocument } from 'mongoose';

export interface User extends PassportLocalDocument {
    readonly id: string;
    readonly username: string;
    readonly token: string;
    readonly email: string;
    readonly password: string;
    readonly sources: string [];
    readonly category: string[];
    readonly language: string[];
    readonly country: string [];
    readonly created_at: Date;

}