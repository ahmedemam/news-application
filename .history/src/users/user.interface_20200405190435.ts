import { Document } from 'mongoose';

export interface User extends Document {
    readonly id: string;
    userName: string;
    token: string;
    email: string;
    password: string;
    sources: string [];
    category: string[];
    language: string[];
    country: string [];
}