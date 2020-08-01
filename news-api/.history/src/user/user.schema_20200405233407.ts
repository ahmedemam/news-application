import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    token: String,
    email: String,
    password: String,
    sources: [{ type: String }],
    category: [{ type: String }],
    language: [{ type: String }],
    country: [{ type: String }],
    created_at: { type: Date, default: Date.now }
});

UserSchema.plugin(passportLocalMongoose);