const router = require('express').Router();
const User = require('../models/user');
const Boom = require('boom');

module.exports = router;

router.get('/form', (req, res) => {
  res.render('auth.njk', req.query);
});

router.get('/logout', (req, res) => {
  req.session.user = '';
  res.redirect('/');
})

router.post('/auth', async (req, res, next) => {
  if (req.session.user) return res.redirect('/');

  let { username, password } = req.body;
  if (!username || !password) {
    return next(Boom.badRequest('Введите данные.'));
  }

  let user = await User.findOne({ username });

  if (user) {
    if (user.checkPassword(password)) {
      req.session.user = user._id;
    } else {
      return next(Boom.forbidden('Неверный пароль.'));
    }
  } else {
    let newUser = await new User({ username, password }).save();
    req.session.user = newUser._id;
  }

  res.redirect('/');
});
