const MoneyQuestions = require("../../models/moneyQuestions");

// admin : 축의금 질문을 위한 db 등재용 함수
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

module.exports = createMoneyQuestions;
