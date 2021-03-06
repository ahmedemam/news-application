import { Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    sources: string[];
    countries: string[];
    languages: string[];
    categories: string[];
}
