const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;


const UserSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: 'e-mail is required',
    unique: 'this e-mail already exist',
  },
  passwordHash: String,
  salt: String,
  refreshToken: String,
}, {
  timestamps: true,
});

UserSchema.virtual('password')
  .set(async function set(password) {
    this.plainPassword = password;
    if (password) {
      const SALT_FACTOR = 10;

      this.salt = bcrypt.genSaltSync(SALT_FACTOR);
      this.passwordHash = bcrypt.hashSync(password, this.salt);
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function get() {
    return this.plainPassword;
  });

UserSchema.virtual('clientData')
  .get(function get() {
    return {
      id: this._id,
      username: this.username,
      email: this.email,
    };
  });

UserSchema.methods.checkPassword = function checkPassword(password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.setRefreshToken = function setRefreshToken(token) {
  this.refreshToken = token;
  this.save();
};

module.exports = mongoose.model('User', UserSchema);
