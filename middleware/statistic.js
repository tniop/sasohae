const statistics = require("../models/statistics");

async function userVisit(req, res, next) {
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
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function useGift(req, res, next) {
    try {
        const { giftSurveyUsersCnt } = await statistics.findOne({
            statistic_id: 1,
        });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { giftSurveyUsersCnt: giftSurveyUsersCnt + 1 } }
        );
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function useRandomGift(req, res, next) {
    try {
        const { giftRandomUsersCnt } = await statistics.findOne({
            statistic_id: 1,
        });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { giftRandomUsersCnt: giftRandomUsersCnt + 1 } }
        );
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function useMoney(req, res) {
    try {
        const { moneyUsersCnt } = await statistics.findOne({ statistic_id: 1 });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { moneyUsersCnt: moneyUsersCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function useMenu(req, res, next) {
    try {
        const { menuUsersCnt } = await statistics.findOne({ statistic_id: 1 });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { menuUsersCnt: menuUsersCnt + 1 } }
        );
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function userVisitBoard(req, res, next) {
    try {
        const counter = req.query.visited;
        if (!counter) {
            next();
        } else if (counter == "up") {
            // 오늘 고민게시판 첫 방문자일 때만 count++
            const { boardUsersCnt } = await statistics.findOne({
                statistic_id: 1,
            });
            await statistics.updateOne(
                { statistic_id: 1 },
                { $set: { boardUsersCnt: boardUsersCnt + 1 } }
            );
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function writeBoard(req, res, next) {
    try {
        const { boardWriteUsersCnt } = await statistics.findOne({
            statistic_id: 1,
        });
        await statistics.updateOne(
            { statistic_id: 1 },
            { $set: { boardWriteUsersCnt: boardWriteUsersCnt + 1 } }
        );
        next();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
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
