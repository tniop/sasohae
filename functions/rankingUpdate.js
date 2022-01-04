const gifts = require("../models/gifts");
const menus = require("../models/menus");
const rankings = require("../models/rankings");
const cron = require("node-cron");

cron.schedule("0 */3 * * * *", updateGiftRanking);
cron.schedule("0 */3 * * * *", updateMenuRanking);

// 선물 랭킹을 생성하는 함수
async function createGiftRanking() {
    const top10Ranked = await gifts
        .find({})
        .limit(10)
        .sort({ giftLikeCnt: -1 });

    const tempRankingArr = [];

    const rankingDB = await rankings.findOne({ ranking_Id: 1 });

    if (!rankingDB) {
        for (let i = 0; i < top10Ranked.length; i++) {
            tempRankingArr[i] = {};
            const rank = i + 1;
            const title = top10Ranked[i].giftName;
            const imgUrl = top10Ranked[i].giftUrl;
            const likeCnt = top10Ranked[i].giftLikeCnt;
            tempRankingArr[i].rank = rank;
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
        const pastRankingInDB = rankingDB.pastRanking;

        for (let i = 0; i < top10Ranked.length; i++) {
            tempRankingArr[i] = {};
            const rank = i + 1;
            const title = top10Ranked[i].giftName;
            const imgUrl = top10Ranked[i].giftUrl;
            const likeCnt = top10Ranked[i].giftLikeCnt;
            tempRankingArr[i].rank = rank;
            tempRankingArr[i].title = title;
            tempRankingArr[i].imgUrl = imgUrl;
            tempRankingArr[i].likeCnt = likeCnt;
            tempRankingArr[i].variance = "New";
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

// 메뉴 랭킹을 생성하는 함수
async function createMenuRanking() {
    const top10Ranked = await menus
        .find({})
        .limit(10)
        .sort({ menuLikeCnt: -1 });

    const tempRankingArr = [];

    const rankingDB = await rankings.findOne({ ranking_Id: 2 });

    if (!rankingDB) {
        for (let i = 0; i < top10Ranked.length; i++) {
            tempRankingArr[i] = {};
            const rank = i + 1;
            const title = top10Ranked[i].menuName;
            const imgUrl = top10Ranked[i].menuUrl;
            const likeCnt = top10Ranked[i].menuLikeCnt;
            tempRankingArr[i].rank = rank;
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
        const pastRankingInDB = rankingDB.pastRanking;

        for (let i = 0; i < top10Ranked.length; i++) {
            tempRankingArr[i] = {};
            const rank = i + 1;
            const title = top10Ranked[i].menuName;
            const imgUrl = top10Ranked[i].menuUrl;
            const likeCnt = top10Ranked[i].menuLikeCnt;
            tempRankingArr[i].rank = rank;
            tempRankingArr[i].title = title;
            tempRankingArr[i].imgUrl = imgUrl;
            tempRankingArr[i].likeCnt = likeCnt;
            tempRankingArr[i].variance = "New";
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
    const tempRankingArr = await giftRanking();
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
    const tempRankingArr = await menuRanking();
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

module.exports = { createGiftRanking, createMenuRanking };
