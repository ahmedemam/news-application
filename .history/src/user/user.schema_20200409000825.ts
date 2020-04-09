import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import { User } from './user.interface';
const SALT_WORK_FACTOR = 10;

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: { type: String, required: true },
    access_token: { type: String},
    refresh_token: { type: String},
    sources: [{ type: String }]

    // NEWS API SUPPORT MISSING
    // countries: [{ type: String }],
    // languages: [{ type: String }],
    // categories: [{ type: String }],
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

// UserSchema.method('comparePassword', function (password: string): boolean {
//     if (bcrypt.compareSync(password, this.password)) return true;
//     return false;
// });

// UserSchema.static('hashPassword', (password: string): string => {
//     return bcrypt.hashSync(password);
// });
