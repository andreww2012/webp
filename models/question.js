const mongoose = require('../lib/db');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  id: { type: Number, require: true, unique: true },
  question: { type: String, required: true },

  answers: [{
    id: { type: Number, require: true },
    answer: { type: String, required: true },
    correct: { type: Boolean, required: true }
  }]
});

module.exports = mongoose.model('Question', questionSchema, 'questions');
