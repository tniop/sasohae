const {
    updateGiftRanking,
    updateMenuRanking,
} = require("../../functions/rankingUpdate");

// const cron = require("node-cron");

// cron.schedule("0 */2 * * * *", updateGiftRanking);
// cron.schedule("0 */2 * * * *", updateMenuRanking);

async function getTopRankedGifts(req, res) {
    try {
        updateGiftRanking();
        res.status(200).send(tempRankingArr);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
}

async function getTopRankedMenus(req, res) {
    try {
        updateMenuRanking();
        res.status(200).send(tempRankingArr);
    } catch (err) {
        console.log(err);
        res.status(400);
    }
}

module.exports = { getTopRankedGifts, getTopRankedMenus };
