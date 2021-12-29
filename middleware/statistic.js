const statistics = require("../models/statistics");

// 사이트 방문자 집계함수
async function userVisit(req, res) {
    try {
        const statisticExist = await statistics.find({}).sort("-statistic_id").limit(1);
        if (!statisticExist) {
            await statistics.create({});
        } else {
            const { totVisitorCnt } = await statistics.findOne({statistic_id: 1});
            await statistics.updateOne(
                { statistic_id: 1 },
                { $set: { totVisitorCnt: totVisitorCnt + 1 } }
            );
        }
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 선물추천 이용자 집계함수
async function useGift(req, res, next) {
    try {
        const statisticExist = await statistics.findOne({ statistic_id: 1 });
        if (!statisticExist) {
            await statistics.create({});
            const {giftSurveyUsersCnt} = await statistics.findOne({ statistic_id: 1 });
            await statistics.updateOne(
                { statistic_id: 1 },
                { $set: { giftSurveyUsersCnt: giftSurveyUsersCnt + 1 } }
            );
            next();
        } else {
            let giftSurveyUsersCnt = countData.giftSurveyUsersCnt;
            giftSurveyUsersCnt++;
            await statistics.updateOne(
                { statistic_id: 1 },
                { $set: { giftSurveyUsersCnt: giftSurveyUsersCnt } }
            );
            next();
        }
    } catch (err) {
        console.log(err);
    }
}

// 랜덤선물추천 이용자 집계함수
async function useRandomGift(req, res, next) {
    try {
        console.log("updateRandomUsersCnt 미들웨어 들어옴");

        const countData = await statistics.findOne({ statistic_id: 1 });
        console.log("countData: " + countData);
        if (!countData) {
            await statistics.create({});
            const countData = await statistics.findOne({ statistic_id: 1 });
            let giftRandomUsersCnt = countData.giftRandomUsersCnt;
            giftRandomUsersCnt++;
            await statistics.updateOne(
                { statistic_id: 1 },
                { $set: { giftRandomUsersCnt: giftRandomUsersCnt } }
            );
            next();
        } else {
            let giftRandomUsersCnt = countData.giftRandomUsersCnt;
            giftRandomUsersCnt++;
            await statistics.updateOne(
                { statistic_id: 1 },
                { $set: { giftRandomUsersCnt: giftRandomUsersCnt } }
            );
            next();
        }
    } catch (err) {
        console.log(err);
    }
}

// 축의금추천 이용자 집계함수
async function useMoney(req, res) {
    try {
        const statistic_id = 1;
        const { moneyUsersCnt } = await statistic.findOne({
            statistic_id: statistic_id,
        });
        await statistic.updateOne(
            { statistic_id: 1 },
            { $set: { moneyUsersCnt: moneyUsersCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 음식메뉴추천 이용자 집계함수
async function useMenu(req, res) {
    try {
        const statistic_id = 1;
        const { menuUsersCnt } = await statistic.findOne({
            statistic_id: statistic_id,
        });
        await statistic.updateOne(
            { statistic_id: 1 },
            { $set: { menuUsersCnt: menuUsersCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}
// 고민끄나풀 방문자 집계함수
async function userVisitBoard(req, res, next) {
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

// 고민끄나풀 게시글작성자 집계함수
async function writeBoard(req, res, next) {
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

module.exports = {};
