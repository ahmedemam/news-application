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

UserSchema.pre('save',  function(done)  {
    if(this.isModified('password')) {
        bcrypt.hash(this.password, null, null, (err, hash) => {
          if(err) return next(err);
    
          this.password = hash;
          this.updated_at = new Date().toISOString();
          done();
        });
      } else {
        return done();
      }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);