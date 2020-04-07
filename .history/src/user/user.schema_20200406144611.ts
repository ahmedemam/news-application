import { User } from './user.interface';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String, required: true, index: { unique: true }
    },
    password: { type: String, required: true },
    sources: [{ type: String }],
    countries: [{ type: String }],
    languages: [{ type: String }],
    categories: [{ type: String }],
});

UserSchema.pre<User>('save', function (next) {
    console.log(this.isModified('password'))
    console.log('this', this)
    if (!this.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, null, function (err, hash) {
            if (err) return next(err);

            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);