const gifts = require("../../models/gifts");

async function createGift(req, res) {
    try {
        const {
            giftName,
            giftUrl,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerPerson,
            giftAnswerEmotion,
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
            giftAnswerPerson,
            giftAnswerEmotion,
            giftAnswerTrendy,
            giftAnswerExpensive,
            giftLikeCnt,
            giftResultCnt,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
    }
}

module.exports = createGift;
