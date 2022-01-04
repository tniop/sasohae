const gifts = require("../../models/gifts");
const menus = require("../../models/menus");
const rankings = require("../../models/rankings");

// const cron = require("node-cron");

// cron.schedule("0 */2 * * * *", updateGiftRanking);
// cron.schedule("0 */2 * * * *", updateMenuRanking);

async function getTopRankedGifts(req, res) {
    try {
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
                currentRankingSet.add(title);
                tempRankingArr[i].rank = rank;
                tempRankingArr[i].title = title;
                tempRankingArr[i].variance = "New";
            }

            await rankings.create({
                pastRanking: tempRankingArr,
                currentRanking: tempRankingArr,
            });
        } else {
            const pastRankingInDB = rankingDB.pastRanking;
            const currentRankinginDB = rankingDB.currentRanking;

            for (let i = 0; i < top10Ranked.length; i++) {
                //현재 랭킹 생성;
                tempRankingArr[i] = {};
                const rank = i + 1;
                const title = top10Ranked[i].giftName;
                tempRankingArr[i].rank = rank;
                tempRankingArr[i].title = title;
                tempRankingArr[i].variance = "New";
                for (let k = 0; k < pastRankingInDB.length; k++) {
                    if (tempRankingArr[i].title == pastRankingInDB[k].title) {
                        tempRankingArr[i].variance =
                            pastRankingInDB[k].rank - tempRankingArr[i].rank;
                    }
                }
            }

            await rankings.updateOne(
                { ranking_Id: 1 },
                { $set: { pastRanking: currentRankinginDB } }
            );
            await rankings.updateOne(
                { ranking_Id: 1 },
                { $set: { currentRanking: tempRankingArr } }
            );
        }
        res.status(200).send(tempRankingArr);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
}

async function getTopRankedMenus(req, res) {
    try {
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
                tempRankingArr[i].rank = rank;
                tempRankingArr[i].title = title;
                tempRankingArr[i].variance = "New";
            }

            await rankings.create({
                pastRanking: tempRankingArr,
                currentRanking: tempRankingArr,
            });
        } else {
            const pastRankingInDB = rankingDB.pastRanking;
            const currentRankinginDB = rankingDB.currentRanking;

            for (let i = 0; i < top10Ranked.length; i++) {
                //현재 랭킹 생성;
                tempRankingArr[i] = {};
                const rank = i + 1;
                const title = top10Ranked[i].menuName;
                tempRankingArr[i].rank = rank;
                tempRankingArr[i].title = title;
                tempRankingArr[i].variance = "New";
                for (let k = 0; k < pastRankingInDB.length; k++) {
                    if (tempRankingArr[i].title == pastRankingInDB[k].title) {
                        tempRankingArr[i].variance =
                            pastRankingInDB[k].rank - tempRankingArr[i].rank;
                    }
                }
            }

            await rankings.updateOne(
                { ranking_Id: 2 },
                { $set: { pastRanking: currentRankinginDB } }
            );
            await rankings.updateOne(
                { ranking_Id: 2 },
                { $set: { currentRanking: tempRankingArr } }
            );
        }
        res.status(200).send(tempRankingArr);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
}

module.exports = { getTopRankedGifts, getTopRankedMenus };
