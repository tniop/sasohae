const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const userAccessTime = new mongoose.Schema(
    {
        userCnt: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

userAccessTime.plugin(autoIncrement.plugin, {
    model: "userAccessTime",
    field: "userCnt",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("userAccessTime", userAccessTime);
