import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
})
