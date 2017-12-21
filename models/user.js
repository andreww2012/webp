const mongoose = require('../lib/db');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },

  password: { type: String, required: true, set: setPassword },

  tests: [{
    result: { type: [Boolean], required: true },
    date: { type: Date, required: true }
  }]
});

function setPassword(password) {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt);
}

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');
