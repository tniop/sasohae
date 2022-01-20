const moneyQuestions = require("../models/moneyQuestions");

async function getMoneyQuestion(req, res) {
    try {
        const curruntMoneyQuestion = await moneyQuestions.findOne({
            moneyQuestion_id: 1,
        });
        res.status(200).send(curruntMoneyQuestion);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function moneyQuestionAnswer(req, res) {
    try {
        const { moneyQuestion_id, answer } = req.body;

        const { positiveAnswerQuestion, negativeAnswerQuestion } =
            await moneyQuestions.findOne({
                moneyQuestion_id: Number(moneyQuestion_id),
            });

        if (answer === "O") {
            const nextPositiveAnswerQuestion = await moneyQuestions.findOne({
                moneyQuestion_id: Number(positiveAnswerQuestion),
            });
            res.status(200).send(nextPositiveAnswerQuestion);
        } else {
            const nextNegativeAnswerQuestion = await moneyQuestions.findOne({
                moneyQuestion_id: Number(negativeAnswerQuestion),
            });
            res.status(200).send(nextNegativeAnswerQuestion);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { getMoneyQuestion, moneyQuestionAnswer };
