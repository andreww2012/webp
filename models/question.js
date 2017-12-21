const mongoose = require('../lib/db');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

module.exports = mongoose.model('Question', questionSchema, 'questions');
