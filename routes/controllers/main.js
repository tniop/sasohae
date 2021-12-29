const statistic = require("../../models/statistics");

async function userVisit(req, res) {
    try {
        const statistic_id = 1;
        let statisticExist = await statistic.find({}).sort('-statistic_id').limit(1);
        if (statisticExist.length == 0) {
            await statistic.create({
                statistic_id : 1,
                totVisitorCnt : 0,
                giftSurveyUsersCnt : 0,
                giftRandomUsersCnt : 0,
                moneyUsersCnt : 0,
                menuUsersCnt : 0,
                boardUsersCnt : 0,
                boardWriteUsersCnt : 0,
              });
        }
        else {
            const {totVisitorCnt} = await statistic.findOne({statistic_id:statistic_id})
            await statistic.updateOne(
                { statistic_id },
                { $set: { totVisitorCnt: totVisitorCnt + 1 } }
            );
        }
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

async function useMoney(req, res) {
    try {
        const statistic_id = 1;
        const {moneyUsersCnt} = await statistic.findOne({statistic_id:statistic_id})
        await statistic.updateOne(
            { statistic_id : 1 },
            { $set: { moneyUsersCnt: moneyUsersCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

async function useMenu(req, res) {
    try {
        const statistic_id = 1;
        const {menuUsersCnt} = await statistic.findOne({statistic_id:statistic_id})
        await statistic.updateOne(
            { statistic_id : 1 },
            { $set: { menuUsersCnt: menuUsersCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

module.exports = { userVisit, useMoney, useMenu };
