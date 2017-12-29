const mongoose = require('../lib/db');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const moment = require('moment');
moment.locale('ru');

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },

  password: { type: String, required: true, set: setPassword },

  tests: [{
    result: { type: [Number], required: true },
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

userSchema.set('toObject', {
  transform: (doc, ret) => {
    for (let i = 0; i < ret.tests.length; i++) {
      ret.tests[i].date = moment(ret.tests[i].date).fromNow();
    }
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema, 'users');
