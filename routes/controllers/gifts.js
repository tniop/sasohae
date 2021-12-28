const gifts = require("../../models/gifts");

async function createGift(req, res) {
    try {
        const giftUrl = req.file.location;
        const {
            giftName,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
            giftAnswerExpensive,
            giftLikeCnt,
            giftResultCnt,
        } = req.body;
        await gifts.create({
            giftName,
            giftUrl,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
            giftAnswerExpensive,
            giftLikeCnt,
            giftResultCnt,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = createGift;
