const gifts = require("../models/gifts");
const giftQuestions = require("../models/giftQuestions");
const MoneyQuestions = require("../models/moneyQuestions");
const menus = require("../models/menus");

async function createGift(req, res) {
    try {
        const giftUrl = req.file.location;
        const {
            giftName,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerExpensive,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
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
            giftAnswerExpensive,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
            giftLikeCnt,
            giftResultCnt,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function createGiftQuestions(req, res) {
    try {
        const { giftQuestion, giftQuestionType } = req.body;
        await giftQuestions.create({
            giftQuestion,
            giftQuestionType,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function createMoneyQuestions(req, res) {
    try {
        const {
            moneyQuestion_id,
            moneyQuestion,
            positiveAnswerQuestion,
            negativeAnswerQuestion,
            positiveChangeValue,
        } = req.body;
        await MoneyQuestions.create({
            moneyQuestion_id,
            moneyQuestion,
            positiveAnswerQuestion,
            negativeAnswerQuestion,
            positiveChangeValue,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function createMenu(req, res) {
    try {
        const menuUrl = req.file.location;
        const { menuName, menuType, menuStyle, menuWith } = req.body;
        await menus.create({
            menuName,
            menuUrl,
            menuType,
            menuStyle,
            menuWith,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = {
    createGift,
    createGiftQuestions,
    createMoneyQuestions,
    createMenu,
};
