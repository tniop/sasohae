const mongoose = require("mongoose");

const giftQuestions = new mongoose.Schema({
    giftQuestionPersonality: {
        type: Array,
        default: [],
    },
    giftQuestionEmotional: {
        type: Array,
        default: [],
    },
    giftQuestionTrendy: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("giftQuestions", giftQuestions);
