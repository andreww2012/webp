const config = require('../config');
const mongoose = require('../lib/db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = () => {
  return session({
    saveUninitialized: false,
    resave: true,
    secret: config.session.secret,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  });
};
