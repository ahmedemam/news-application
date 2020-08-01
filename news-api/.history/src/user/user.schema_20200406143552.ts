import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String, required: true, index: { unique: true }
    },
    password: { type: String, required: true },
    sources: [{type: String}],
    countries: [{type: String}],
    languages: [{type: String}],
    categories: [{type: String}],
});


UserSchema.pre('save', (next) => {
    // if (!this.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, function (err, hash) {
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