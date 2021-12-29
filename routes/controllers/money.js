const moneyQuestions = require("../../models/moneyQuestions");

async function getMoneyQuestion(req, res) {
    try {
        const moneyQuestion_id = req.params;
        
        const curruntMoneyQuestion = await moneyQuestions.findOne({moneyQuestion_id : moneyQuestion_id});
        res.status(200).send(curruntMoneyQuestion);
    } catch (err) {
        console.log("Error : " + err);
    }
}

async function moneyQuestionAnswer(req, res) {
    try {
        const moneyQuestion_id = req.params;
        const { answer } = req.body;

        const { positiveAnswerQuestion, negativeAnswerQuestion } = await moneyQuestions.findOne({moneyQuestion_id : moneyQuestion_id});

        if(answer) {
            const nextPositiveAnswerQuestion = await moneyQuestions.findOne({moneyQuestion_id : Number(positiveAnswerQuestion)});
            res.status(200).send(nextPositiveAnswerQuestion);
        } else {
            const nextNegativeAnswerQuestion = await moneyQuestions.findOne({moneyQuestion_id : Number(negativeAnswerQuestion)});
            res.status(200).send(nextNegativeAnswerQuestion);
        }
    } catch (err) {
        console.log("Error : " + err);
    }
}

module.exports = { getMoneyQuestion, moneyQuestionAnswer };