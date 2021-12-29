const statistics = require("../models/statistics");

// statistic의 설문을 통한 선물추천 이용자 집계함수
async function updateSurveyUsersCnt(req, res, next) {
    try {
        console.log("updateSurveyUsersCnt 미들웨어 들어옴")

        const countData = await statistics.findOne({ statistic_id: 1 });
        console.log("countData: " + countData);
            if (!countData) {
                await statistics.create({});
                const countData = await statistics.findOne({ statistic_id: 1 });
                let giftSurveyUsersCnt = countData.giftSurveyUsersCnt;               
                giftSurveyUsersCnt++;
                await statistics.updateOne(
                    { statistic_id: 1 },
                    { $set: { giftSurveyUsersCnt: giftSurveyUsersCnt } }
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


// statistic의 랜덤을 통한 선물추천 이용자 집계함수
async function updateRandomUsersCnt(req, res, next) {
    try {
        console.log("updateRandomUsersCnt 미들웨어 들어옴")

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

module.exports = { updateSurveyUsersCnt, updateRandomUsersCnt };