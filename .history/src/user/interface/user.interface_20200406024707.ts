import { Document, PassportLocalDocument } from 'mongoose';

export interface User extends PassportLocalDocument {
    id: string;
    username: string;
    email: string;
    password: string;
    sources?: string[];
    category?: string[];
    language?: string[];
    country?: string[];
    created_at?: Date;
}