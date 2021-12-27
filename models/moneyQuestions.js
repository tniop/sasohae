const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const MoneyQuestionsSchema = new mongoose.Schema({
    moneyQuestion_id: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    moneyQuestion: {
        type: String,
        required: true,
    },
    positiveAnswerQuestion: {
        type: String,
        required: true,
    },
    negativeAnswerQuestion: {
        type: String,
        required: true,
    },
    positiveChangeValue: {
        type: Number,
        required: true,
    },
});

MoneyQuestionsSchema.plugin(autoIncrement.plugin, {
    model: "MoneyQuestionsSchema",
    field: "moneyQuestion_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("MoneyQuestions", MoneyQuestionsSchema);
