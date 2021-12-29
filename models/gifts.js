const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const gifts = new mongoose.Schema({
    gift_id: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    giftName: {
        type: String,
    },
    giftUrl: {
        type: String,
    },
    giftTarget: {
        type: String,
    },
    giftEvent: {
        type: String,
    },
    sex: {
        type: String,
    },
    age: {
        type: Number,
    },
    giftAnswerPersonality: {
        type: String,
    },
    giftAnswerEmotional: {
        type: String,
    },
    giftAnswerTrendy: {
        type: String,
    },
    giftAnswerExpensive: {
        type: String,
    },
    giftLikeCnt: {
        type: Number,
        default: 0,
    },
    giftResultCnt: {
        type: Number,
        default: 0,
    },
});

gifts.plugin(autoIncrement.plugin, {
    model: "gifts",
    field: "gift_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("gifts", gifts);
