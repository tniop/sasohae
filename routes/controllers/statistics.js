const statistic = require("../../models/statistics");

// 방문자수
async function userVisit(req, res) {
    try {
        const statistic_id = 1;
        let statisticExist = await statistic.find({}).sort('-statistic_id').limit(1);
        if (statisticExist.length == 0) {
            await statistic.create({
                statistic_id,
                totVisitorCnt,
                giftSurveyUsersCnt,
                giftRandomUsersCnt,
                moneyUsersCnt,
                menuUsersCnt,
                boardUsersCnt,
                boardWriteUsersCnt,
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

// 축의금 추천 기능 사용자 수
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

// 음식 메뉴 추천 기능 사용자 수
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
