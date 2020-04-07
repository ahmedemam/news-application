import { User } from './user.interface';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String, required: true, unique: true
    },
    password: { type: String, required: true },
    sources: [{ type: String }],
    countries: [{ type: String }],
    languages: [{ type: String }],
    categories: [{ type: String }],
});

UserSchema.pre<User>('save', function (next) {
    if (!this.isModified('password')) return next();    

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });

    });

});

UserSchema.methods.checkPassword = function (attempt, callback) {
    bcrypt.compare(attempt, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};