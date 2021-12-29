const statistics = require("../models/statistics");

// statistics의 고민 끄나풀 단순 이용자 집계를 위한 함수
async function updateBoardUsersCnt(req, res, next) {
    try {
        const params = req.params.commentIdx;
        if (params == "0") {
            const countData = await statistics.findOne({ statistic_id: 1 });
            if (!countData) {
                await statistics.create({});
                const countData = await statistics.findOne({ statistic_id: 1 });
                let boardUsersCnt = countData.boardUsersCnt;
                boardUsersCnt++;
                await statistics.updateOne(
                    { statistic_id: 1 },
                    { $set: { boardUsersCnt: boardUsersCnt } }
                );
            } else {
                let boardUsersCnt = countData.boardUsersCnt;
                boardUsersCnt++;
                await statistics.updateOne(
                    { statistic_id: 1 },
                    { $set: { boardUsersCnt: boardUsersCnt } }
                );
            }
        }
        next();
    } catch (err) {
        console.log(err);
    }
}

// statistics의 고민 끄나풀 실 이용자(게시글 작성자) 집계를 위한 함수
async function updateBoardWriteUsersCnt(req, res, next) {
    try {
        const countData = await statistics.findOne({ statistic_id: 1 });
        if (!countData) {
            await statistics.create({});
            const countData = await statistics.findOne({ statistic_id: 1 });
            let boardWriteUsersCnt = countData.boardWriteUsersCnt;
            boardWriteUsersCnt++;
            await statistics.updateOne(
                { statistic_id: 1 },
                { $set: { boardWriteUsersCnt: boardWriteUsersCnt } }
            );
        } else {
            let boardWriteUsersCnt = countData.boardWriteUsersCnt;
            boardWriteUsersCnt++;
            await statistics.updateOne(
                { statistic_id: 1 },
                { $set: { boardWriteUsersCnt: boardWriteUsersCnt } }
            );
        }
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = { updateBoardUsersCnt, updateBoardWriteUsersCnt };
