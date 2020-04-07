import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const  SALT_WORK_FACTOR = 10;

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
})

