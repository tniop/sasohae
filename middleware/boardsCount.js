const statistics = require("../models/statistic");

async function updateBoardUsersCnt(req, res, next) {
    try {
        const countData = await statistics.findOne({ statistic_id: 1 });
        if (!countData) {
            await statistics.create({});
        }
        let boardUsersCnt = countData.boardUsersCnt;
        boardUsersCnt++;
        console.log(boardUsersCnt);
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { boardUsersCnt: boardUsersCnt } }
        );
        next();
    } catch (err) {
        console.log(err);
    }
}

async function updateBoardWriteUsersCnt(req, res, next) {
    try {
        const countData = await statistics.findOne({ statistic_id: 1 });
        if (!countData) {
            await statistics.create({});
        }
        let boardWriteUsersCnt = countData.boardWriteUsersCnt;
        boardWriteUsersCnt++;
        console.log(boardWriteUsersCnt);
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { boardWriteUsersCnt: boardWriteUsersCnt } }
        );
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = { updateBoardUsersCnt, updateBoardWriteUsersCnt };
