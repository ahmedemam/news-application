import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: string,
    sources: string[],
    countries: string[],
    languages: string[],
    categories: string[],
}),