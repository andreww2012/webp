const User = require('../models/user');

module.exports = async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/form?authMessage=1');
  }
  req.user = (await User.findById(req.session.user)).toObject();
  next();
};
