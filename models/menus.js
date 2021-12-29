const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const menusSchema = new mongoose.Schema({
    menu_id: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    menuType: {
        type: String,
        required: true,
    },
    menuStyle: {
        type: String,
        required: true,
    },
    menuWith: {
        type: String,
        required: true,
    },
    menuName: {
        type: String,
        required: true,
    },
    menuLikeCnt: {
        type: Number,
        required: true,
    },
    menuResultCnt: {
        type: Number,
        required: true,
    },
});

menusSchema.plugin(autoIncrement.plugin, {
    model: "menusSchema",
    field: "menu_id",
    startAt: 1,
    increment: 1,
});

module.exports = mongoose.model("menus", menusSchema);
