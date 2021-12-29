const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const statistic = new mongoose.Schema({
    statistic_id: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    totVisitorCnt: {
        type: Number,
        default: 0,
    },
    giftSurveyUsersCnt: {
        type: Number,
        default: 0,
    },
    giftRandomUsersCnt: {
        type: Number,
        default: 0,
    },
    moneyUsersCnt: {
        type: Number,
        default: 0,
    },
    menuUsersCnt: {
        type: Number,
        default: 0,
    },
    boardUsersCnt: {
        type: Number,
        default: 0,
    },
    boardWriteUsersCnt: {
        type: Number,
        default: 0,
    },
});

statistic.plugin(autoIncrement.plugin, {
    model: "statistic",
    field: "statistic_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("statistic", statistic);
