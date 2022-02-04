const gifts = require("../models/gifts");
const menus = require("../models/menus");
const rankings = require("../models/rankings");
const cron = require("node-cron");

cron.schedule("0 0 * * *", updateGiftRanking, {
    scheduled: true,
    timezone: "Asia/Seoul",
});
cron.schedule("0 0 * * *", updateMenuRanking, {
    scheduled: true,
    timezone: "Asia/Seoul",
});

async function createGiftRanking() {
    const top10Ranked = await gifts
        .find({})
        .limit(10)
        .sort({ giftRecommendCnt: -1 });

    const tempRankingArr = [];
    let rank = 1;

    const rankingDB = await rankings.findOne({ ranking_Id: 1 });

    if (!rankingDB) {
        // 최초랭킹
        for (let i = 0; i < top10Ranked.length; i++) {
            tempRankingArr[i] = {};
            tempRankingArr[i].rank = rank;

            if (i > 0) {
                // 추천 수가 같을 때 랭킹처리
                let tempValue = top10Ranked[i - 1].giftRecommendCnt;
                if (tempValue == top10Ranked[i].giftRecommendCnt) {
                    tempRankingArr[i].rank = tempRankingArr[i - 1].rank;
                    rank++;
                } else {
                    rank++;
                    tempRankingArr[i].rank = rank;
                }
            }

            const title = top10Ranked[i].giftName;
            const imgUrl = top10Ranked[i].giftUrl;
            const likeCnt = top10Ranked[i].giftRecommendCnt;

            tempRankingArr[i].title = title;
            tempRankingArr[i].imgUrl = imgUrl;
            tempRankingArr[i].likeCnt = likeCnt;
            tempRankingArr[i].variance = "New";
        }

        await rankings.create({
            pastRanking: tempRankingArr,
            currentRanking: tempRankingArr,
        });
    } else {
        // 최초랭킹 이후
        const pastRankingInDB = rankingDB.pastRanking;

        for (let i = 0; i < top10Ranked.length; i++) {
            tempRankingArr[i] = {};
            tempRankingArr[i].rank = rank;

            if (i > 0) {
                // 추천 수가 같을 때 랭킹처리
                let tempValue = top10Ranked[i - 1].giftRecommendCnt;
                if (tempValue == top10Ranked[i].giftRecommendCnt) {
                    tempRankingArr[i].rank = tempRankingArr[i - 1].rank;
                    rank++;
                } else {
                    rank++;
                    tempRankingArr[i].rank = rank;
                }
            }

            const title = top10Ranked[i].giftName;
            const imgUrl = top10Ranked[i].giftUrl;
            const likeCnt = top10Ranked[i].giftRecommendCnt;

            tempRankingArr[i].title = title;
            tempRankingArr[i].imgUrl = imgUrl;
            tempRankingArr[i].likeCnt = likeCnt;

            // 새로 랭킹에 들어온 경우 New
            tempRankingArr[i].variance = "New";
            // 과거와 현재 랭킹변화량
            for (let k = 0; k < pastRankingInDB.length; k++) {
                if (tempRankingArr[i].title == pastRankingInDB[k].title) {
                    tempRankingArr[i].variance =
                        pastRankingInDB[k].rank - tempRankingArr[i].rank;
                }
            }
        }
    }
    return tempRankingArr;
}

async function createMenuRanking() {
    const top10Ranked = await menus
        .find({})
        .limit(10)
        .sort({ menuRecommendCnt: -1 });

    const tempRankingArr = [];
    let rank = 1;

    const rankingDB = await rankings.findOne({ ranking_Id: 2 });

    if (!rankingDB) {
        // 최초랭킹
        for (let i = 0; i < top10Ranked.length; i++) {
            tempRankingArr[i] = {};
            tempRankingArr[i].rank = rank;

            if (i > 0) {
                // 추천 수가 같을 때 랭킹처리
                let tempValue = top10Ranked[i - 1].menuRecommendCnt;
                if (tempValue == top10Ranked[i].menuRecommendCnt) {
                    tempRankingArr[i].rank = tempRankingArr[i - 1].rank;
                    rank++;
                } else {
                    rank++;
                    tempRankingArr[i].rank = rank;
                }
            }

            const title = top10Ranked[i].menuName;
            const imgUrl = top10Ranked[i].menuUrl;
            const likeCnt = top10Ranked[i].menuRecommendCnt;

            tempRankingArr[i].title = title;
            tempRankingArr[i].imgUrl = imgUrl;
            tempRankingArr[i].likeCnt = likeCnt;
            tempRankingArr[i].variance = "New";
        }

        await rankings.create({
            pastRanking: tempRankingArr,
            currentRanking: tempRankingArr,
        });
    } else {
        // 최초랭킹 이후
        const pastRankingInDB = rankingDB.pastRanking;

        for (let i = 0; i < top10Ranked.length; i++) {
            tempRankingArr[i] = {};
            tempRankingArr[i].rank = rank;

            if (i > 0) {
                // 추천 수가 같을 때 랭킹처리
                let tempValue = top10Ranked[i - 1].menuRecommendCnt;
                if (tempValue == top10Ranked[i].menuRecommendCnt) {
                    tempRankingArr[i].rank = tempRankingArr[i - 1].rank;
                    rank++;
                } else {
                    rank++;
                    tempRankingArr[i].rank = rank;
                }
            }

            const title = top10Ranked[i].menuName;
            const imgUrl = top10Ranked[i].menuUrl;
            const likeCnt = top10Ranked[i].menuRecommendCnt;

            tempRankingArr[i].title = title;
            tempRankingArr[i].imgUrl = imgUrl;
            tempRankingArr[i].likeCnt = likeCnt;

            // 새로 랭킹에 들어온 경우 New
            tempRankingArr[i].variance = "New";
            // 과거와 현재 랭킹변화량
            for (let k = 0; k < pastRankingInDB.length; k++) {
                if (tempRankingArr[i].title == pastRankingInDB[k].title) {
                    tempRankingArr[i].variance =
                        pastRankingInDB[k].rank - tempRankingArr[i].rank;
                }
            }
        }
    }
    return tempRankingArr;
}

// 선물 랭킹 업데이트를 위한 함수
async function updateGiftRanking() {
    const tempRankingArr = await createGiftRanking();
    const rankingDB = await rankings.findOne({ ranking_Id: 1 });
    const currentRankinginDB = rankingDB.currentRanking;

    await rankings.updateOne(
        { ranking_Id: 1 },
        { $set: { pastRanking: currentRankinginDB } }
    );
    await rankings.updateOne(
        { ranking_Id: 1 },
        { $set: { currentRanking: tempRankingArr } }
    );
}

// 메뉴 랭킹 업데이트를 위한 함수
async function updateMenuRanking() {
    const tempRankingArr = await createMenuRanking();
    const rankingDB = await rankings.findOne({ ranking_Id: 2 });
    const currentRankinginDB = rankingDB.currentRanking;

    await rankings.updateOne(
        { ranking_Id: 2 },
        { $set: { pastRanking: currentRankinginDB } }
    );
    await rankings.updateOne(
        { ranking_Id: 2 },
        { $set: { currentRanking: tempRankingArr } }
    );
}

module.exports = {
    createGiftRanking,
    createMenuRanking,
};
