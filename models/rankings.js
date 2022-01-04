const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const rankings = new mongoose.Schema(
    {
        pastRanking: {
            type: Array,
            default: [],
        },
        currentRanking: {
            type: Array,
            default: [],
        },
        ranking_Id: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

rankings.plugin(autoIncrement.plugin, {
    model: "rankings",
    field: "ranking_Id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("rankings", rankings);
