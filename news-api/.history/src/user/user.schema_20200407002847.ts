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
});

UserSchema.pre<User>('save', function (next) {
    if (this.isModified('password')) {
        return bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            console.log(this)
            next();
        });
    }
    next();
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);