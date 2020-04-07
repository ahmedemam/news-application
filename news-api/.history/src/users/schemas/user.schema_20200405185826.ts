import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    userName: String,
    token: String,
    email: String,
    password: String
});