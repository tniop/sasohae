const gifts = require("../../models/gifts");
const giftQuestions = require("../../models/giftQuestions");
const giftUserData = require("../../models/giftUserData");

// 선물추천 옵션 받기(설문) 
async function getGiftQuestion(req, res) {
    try {
        const giftQuestionPersonality = await giftQuestions.find({
            giftQuestionType: "personality",
        });
        const giftQuestionEmotional = await giftQuestions.find({
            giftQuestionType: "emotional",
        });
        const giftQuestionTrendy = await giftQuestions.find({
            giftQuestionType: "trendy",
        });

        // giftQuestionPersonality: [”질문1”, ”질문2”, ...], giftQuestionEmotion, giftQuestionTrendy
        res.status(200).send({
            success: true,
            giftQuestionPersonality,
            giftQuestionEmotional,
            giftQuestionTrendy,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청을 처리하지 못했습니다.",
        });
    }
}

// 선물추천(결과)
async function addGiftResult(req, res) {
    try {
        // 참고: selectedGift는 null로 들어가고, 좋아요 피드백을 받으면 해당 선물 이름으로 update됨
        const {
            selectedGift,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerExpensive,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
        } = req.body;

        // giftUserData 컬렉션의 선물추천 데이터 수집용 답변 저장
        await giftUserData.create({
            selectedGift,
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerExpensive,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
        });

        // gifts 컬렉션에서 답변에 맞는 선물 리스트 담기
        if (giftEvent == "하찮은선물") {
            const surveyGifts = await gifts.find({
                giftEvent: giftEvent,
            });
            res.status(200).send({
                success: true,
                selectedGift_id: null,
                surveyGifts,
            });
        } else {
            const all = "무관"; //엑셀 테이블에서 "*"

            const surveyGifts = await gifts.find({
              
                    // giftTarget: "무관",
                    // giftTarget: { $elemMatch: { $in: [giftTarget] } } 배열 내부 값 비교 가능
                $and: [{
                    giftTarget: { $elemMatch: { $in: [giftTarget, all] } }, 
                    giftEvent: { $elemMatch: { $in: [giftEvent, all] } } 
                }],

                // $and: [{
                //     giftTarget: { $in: [all, giftTarget] },
                //     giftEvent: { $in: [all, giftEvent] },
                //     sex: { $in: [all, sex] },
                //     age: { $in: [all, age] },
                //     giftAnswerTrendy: { $in: [all, giftAnswerTrendy[1]] },
                //     giftAnswerPersonality: { $in: [all, giftAnswerPersonality[1]] },
                //     giftAnswerEmotional: { $in: [all, giftAnswerEmotional[1]] },

                // }],
               
            });
            res.status(200).send({
                success: true,
                selectedGift_id: null,
                surveyGifts,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청을 처리하지 못했습니다.",
        });
    }
}


// 선물추천 Like 반영 
async function reviseGiftFeedback(req, res) {
    try {
        // giftUserData 테이블에 Like 반영
        const { selectedGift_id, selectedGift } = req.body;
        // console.log(selectedGift_id, selectedGift); // body에서 전달 받는 데이터 selectedGift_id: 2, selectedGift: "지갑"
        await giftUserData.updateOne(
            { selectedGift_id },
            { $set: { selectedGift: selectedGift } }
        );

        // gifts 테이블에 Like 반영
        const giftName = selectedGift;

        const likeGiftExist = await gifts.findOne({ giftName: giftName }); // 해당 라인 지우고 아래 코드로 실행하면 될듯?
        const { giftLikeCnt } = await gifts.findOne({ giftName: giftName });

        await gifts.updateOne(
            { giftName: giftName },
            { $set: { giftLikeCnt: giftLikeCnt + 1 } }
        );

        res.status(200).send({ success: true });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청을 처리하지 못했습니다.",
        });
    }
}

// 선물추천 랜덤 
async function getRandomGift(req, res) {
    try {
        const randomGifts = await gifts.find({});

        res.status(200).send({ success: true, randomGifts });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getGiftQuestion,
    addGiftResult,
    reviseGiftFeedback,
    getRandomGift,
};
