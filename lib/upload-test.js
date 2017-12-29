const Question = require('../models/question');
const test = require('./test');

(async function upload() {
  try {
    await Question.remove({});
    console.log('Коллекция очищена');

    test.forEach(async (question) => {
      try {
        await new Question(question).save();
        console.log('Вопрос добавлен');
      } catch(e) {
        console.log(e);
      }
    });
  } catch(e) {
    console.log(e);
  }
})();
