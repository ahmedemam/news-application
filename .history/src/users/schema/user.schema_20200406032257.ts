import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
})

UserSchema.pre('save', (next) => {
    if (!this.user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(this.user.password, salt, function (err, hash) {
            if (err) return next(err);
            this.user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePasswords = (candidatePassword, next) => {
    bcrypt.compare(candidatePassword, this.local.password, function (err, isMatch) {
        if (err) {
            return next(err);
        }
        next(null, isMatch);
    });
};

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null);
};

UserSchema.methods.isPasswordValid = function (password) {
    return bcrypt.compareSync(password, this.user.password);
};

UserSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.user.password;
        return ret;
    }
});