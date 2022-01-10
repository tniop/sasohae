const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const giftsUserData = new mongoose.Schema(
    {
        selectedGift_id: {
            type: Number,
            required: true,
            unique: true,
            default: 0,
        },
        selectedGift: {
            type: Array,
            default: [],
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
            type: String,
        },
        giftAnswerExpensive: {
            type: String,
        },
        giftAnswerPersonality: {
            type: Array,
            default: [],
        },
        giftAnswerEmotional: {
            type: Array,
            default: [],
        },
        giftAnswerTrendy: {
            type: Array,
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
