const MoneyQuestions = require("../../models/moneyQuestions");

async function createMoneyQuestions(req, res) {
    try {
        const {
            moneyQuestionNum,
            moneyQuestion,
            positiveAnswerQuestion,
            negativeAnswerQuestion,
            positiveChangeValue,
        } = req.body;
        await MoneyQuestions.create({
            moneyQuestionNum,
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

module.exports = createMoneyQuestions;
