const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const User = require('../models/user');
const Question = require('../models/question');
const Boom = require('boom');

module.exports = router;

router.get('/', checkAuth, async (req, res) => {
  const { user } = req;
  let questions = await Question.find();
  res.render('main.njk', { user, questions });
});

router.get('/profile', checkAuth, (req, res) => {
  const { user } = req;
  res.render('profile.njk', { user })
});

router.post('/check', checkAuth, async (req, res, next) => {
  if (!req.body) {
    return next(Boom.badRequest('Введите данные'));
  }
  const { user } = req;

  const questions = await Question.find();
  const questionAmount = questions.length;

  let results = [];

  for (let i = 0; i < questionAmount; i++) {
    const answer = Number(req.body[questions[i].id]);
    if (!answer) {
      return next(Boom.badRequest('Вы ответили не на все вопросы теста.'));
    }

    results[i] = answer;
  }

  let updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      '$push': {
        'tests': { result: results, date: new Date() }
      }
    }
  );

  res.redirect(`/result?id=${updatedUser.tests.length}`);
});

router.get('/result', checkAuth, async (req, res) => {
  const { user } = req;
  const resultId = req.query.id;
  const result = user.tests[resultId];
  const questions = await Question.find();

  res.render('result.njk', { user, resultId, result, questions });
});
