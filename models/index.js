const mongoose = require("mongoose");

const connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/sasohae", {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // ignoreUndefined: true,
        })
        .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
    console.error("몽고DB 연결 에러", err);
});

// 몽고디비 연결이 끊겼을 때
mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊김. 연결을 재시도함");
    connect();
});

module.exports = connect;
