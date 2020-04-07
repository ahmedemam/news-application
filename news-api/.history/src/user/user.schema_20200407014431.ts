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

UserSchema.pre<User>('save', function(next){
    const user = this;
    // Make sure not to rehash the password if it is already hashed
    if(!user.isModified('password')) return next();

    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {

        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) return next(err);
            user.password = hash;
            next();

        });

    });

}); 

UserSchema.methods.checkPassword = function(attempt, callback){

    let user = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    });

};