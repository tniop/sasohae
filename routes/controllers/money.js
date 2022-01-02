const moneyQuestions = require("../../models/moneyQuestions");

async function getMoneyQuestion(req, res) {
    try {
        const curruntMoneyQuestion = await moneyQuestions.findOne({moneyQuestion_id : 1});
        res.status(200).send(curruntMoneyQuestion);
    } catch (err) {
        console.log("Error : " + err);
    }
}

async function moneyQuestionAnswer(req, res) {
    try {
        const { moneyQuestion_id, answer } = req.body;
        console.log("money id : "+moneyQuestion_id)
        console.log("answer : "+answer)

        const { positiveAnswerQuestion, negativeAnswerQuestion } = await moneyQuestions.findOne({moneyQuestion_id : Number(moneyQuestion_id)});

        console.log(positiveAnswerQuestion+":"+negativeAnswerQuestion)
        if(answer==="O") {
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