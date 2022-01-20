const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const giftsUserData = new mongoose.Schema(
    {
        selectedGift_id: {
            type: Number,
            unique: true,
            required: true,
            default: 0,
        },
        selectedGift: {
            type: Array,
            default: [],
        },
        giftTarget: {
            type: String,
            required: true,
        },
        giftEvent: {
            type: String,
            required: true,
        },
        sex: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        giftAnswerExpensive: {
            type: String,
            required: true,
        },
        giftAnswerPersonality: {
            type: Array,
            required: true,
            default: [],
        },
        giftAnswerEmotional: {
            type: Array,
            required: true,
            default: [],
        },
        giftAnswerTrendy: {
            type: Array,
            required: true,
            default: [],
        },
    },
    { timestamps: true }
);

giftsUserData.plugin(autoIncrement.plugin, {
    model: "giftsUserData",
    field: "selectedGift_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("giftsUserData", giftsUserData);
