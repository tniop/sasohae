const gifts = require("../../models/gifts");
const menus = require("../../models/menus");
const rankings = require("../../models/rankings");

async function getTopRankedGifts(req, res) {
    try {
        const top10Ranked = await gifts
            .find({})
            .limit(10)
            .sort({ giftLikeCnt: -1 });

        const tempRankingArr = [];
        const currentRankingSet = new Set();
        const pastRankingSet = new Set();

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
                // currentRankingSet.add(title);
                // currentRankingSet.add(rank);
                tempRankingArr[i].rank = rank;
                tempRankingArr[i].title = title;
                // currentRankingSet.add(tempRankingArr[i]);
                // pastRankingSet.add(pastRankingInDB[i]);
                for (let k = 0; k < pastRankingInDB.length; k++) {
                    if (tempRankingArr[i].title == pastRankingInDB[k].title) {
                        tempRankingArr[i].variance =
                            tempRankingArr[i].rank - pastRankingInDB[k].rank;
                        break;
                    } else {
                        tempRankingArr[i].variance = "New";
                        break;
                    }
                }
            }

            // for (let i = 0; i < tempRankingArr.length; i++) {}
            // const currentRankingArray = Array.from(currentRankingSet);

            // const intersectionSet = currentRankingArray.filter((x) =>
            //     pastRankingSet.has(x)
            // );
            // const differenceSet = currentRankingArray.filter(
            //     (x) => !pastRankingSet.has(x)
            // );

            // console.log(intersectionSet, differenceSet);

            // console.log(intersectionSet, differenceSet);

            // const currentRankingArr = [];
            // for(let i=0; i<differenceSet.length; i++) {
            //     const currentRankinInfo = {};
            //     currentRankinInfo.title = differenceSet[i];
            //     currentRankingInfo.rank =
            // }

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

module.exports = getTopRankedGifts;
