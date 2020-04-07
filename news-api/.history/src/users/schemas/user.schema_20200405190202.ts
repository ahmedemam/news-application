import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    userName: String,
    token: String,
    email: String,
    password: String,
    sources: [{type: String}],
    category: [{type: String}],
    language: [{type: String}],
    country: [{type: String}],
});