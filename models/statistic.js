const mongoose = require("mongoose");

const StatisticSchema = new mongoose.Schema({
    statistic_id: {
        type: Number,
        required: true,
        unique: true,
    },
    totVisitorCnt: {
        type: Number,
        required: true,
    },
    giftSurveyUsersCnt: {
        type: Number,
        required: true,
    },
    giftRandomUsersCnt: {
        type: Number,
        required: true,
    },
    moneyUsersCnt: {
        type: Number,
        required: true,
    },
    menuUsersCnt: {
        type: Number,
        required: true,
    },
    boardUsersCnt: {
        type: Number,
        required: true,
    },
    boardWriteUsersCnt: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Statistic", StatisticSchema);
