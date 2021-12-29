const statistics = require("../models/statistics");

// 사이트 방문자 집계함수
async function userVisit(req, res) {
    try {
        const statisticExist = await statistics.findOne({ statistic_id: 1 });
        if (!statisticExist) {
            await statistics.create({});
        }
        const { totVisitorCnt } = await statistics.findOne({ statistic_id: 1 });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { totVisitorCnt: totVisitorCnt + 1 } }
        );
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
        }
        const { giftSurveyUsersCnt } = await statistics.findOne({
            statistic_id: 1,
        });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { giftSurveyUsersCnt: giftSurveyUsersCnt + 1 } }
        );
        next();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 랜덤선물추천 이용자 집계함수
async function useRandomGift(req, res, next) {
    try {
        const statisticExist = await statistics.findOne({ statistic_id: 1 });
        if (!statisticExist) {
            await statistics.create({});
        }
        const { giftRandomUsersCnt } = await statistics.findOne({
            statistic_id: 1,
        });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { giftRandomUsersCnt: giftRandomUsersCnt + 1 } }
        );
        next();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 축의금추천 이용자 집계함수
async function useMoney(req, res) {
    try {
        const statisticExist = await statistics.findOne({ statistic_id: 1 });
        if (!statisticExist) {
            await statistics.create({});
        }
        const { moneyUsersCnt } = await statistics.findOne({ statistic_id: 1 });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { moneyUsersCnt: moneyUsersCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 음식메뉴추천 이용자 집계함수
async function useMenu(req, res, next) {
    try {
        const statisticExist = await statistics.findOne({ statistic_id: 1 });
        if (!statisticExist) {
            await statistics.create({});
        }
        const { menuUsersCnt } = await statistics.findOne({ statistic_id: 1 });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { menuUsersCnt: menuUsersCnt + 1 } }
        );
        next();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 고민끄나풀 방문자 집계함수
async function userVisitBoard(req, res) {
    try {
        const statisticExist = await statistics.findOne({ statistic_id: 1 });
        if (!statisticExist) {
            await statistics.create({});
        }
        const { boardUsersCnt } = await statistics.findOne({ statistic_id: 1 });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { boardUsersCnt: boardUsersCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 고민끄나풀 게시글작성자 집계함수
async function writeBoard(req, res, next) {
    try {
        const statisticExist = await statistics.findOne({ statistic_id: 1 });
        if (!statisticExist) {
            await statistics.create({});
        }
        const { boardWriteUsersCnt } = await statistics.findOne({
            statistic_id: 1,
        });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { boardWriteUsersCnt: boardWriteUsersCnt + 1 } }
        );
        next();
    } catch (err) {
        console.log("Error : " + err);
    }
}

module.exports = {
    userVisit,
    useGift,
    useRandomGift,
    useMoney,
    useMenu,
    userVisitBoard,
    writeBoard,
};
