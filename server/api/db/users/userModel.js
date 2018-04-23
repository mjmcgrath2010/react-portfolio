const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  // dont store the password as plain text
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', next => {
  if (!this.isModified('password')) return next();

  this.password = this.encryptPassword(this.password);
  return next();
});

UserSchema.methods = {
  // check the passwords on signin
  authenticate: plainTextPword => bcrypt.compareSync(plainTextPword, this.password),
  // hash the passwords
  encryptPassword: plainTextPword => {
    if (!plainTextPword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },

  toJson: () => {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  },
};

module.exports = mongoose.model('user', UserSchema);
