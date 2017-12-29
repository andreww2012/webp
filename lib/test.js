const questions = [];

for (let i = 1; i <= 10; i++) {
  let answers = [];

  for (let j = 1; j <= 3; j++) {
    answers[j - 1] = {
      id: j,
      answer: `Вариант ответа ${j}`,
      correct: Math.random() > 0.5
    };
  }

  questions[i - 1] = {
    id: i,
    question: `Вопрос №${i}`,
    answers
  };
}

module.exports = questions;
