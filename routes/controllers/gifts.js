const gifts = require("../../models/gifts");
const giftQuestions = require("../../models/giftQuestions");
const giftUserData = require("../../models/giftUserData");

// 선물추천 옵션 받기(설문) => DONE
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

// 선물추천(결과) "POST"
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
                $or: [{ giftTarget: giftTarget }, { giftTarget: all }],
                $or: [{ giftEvent: giftEvent }, { giftEvent: all }],
                $or: [{ sex: sex }, { sex: all }],
                $or: [{ age: age }, { age: all }],
                $or: [
                    { giftAnswerTrendy: giftAnswerTrendy },
                    { giftAnswerTrendy: all },
                ],
                $or: [
                    { giftAnswerPersonality: [giftAnswerPersonality[1]] },
                    { giftAnswerPersonality: all },
                ],
                $or: [
                    { giftAnswerEmotional: [giftAnswerEmotional[1]] },
                    { giftAnswerEmotional: all },
                ],
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

// 선물추천(결과) "GET" : giftSurveyUsersCnt++ => 이 코드 미사용
async function getGiftResult(req, res) {
    try {
        // 위에서 POST 로 처리
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청을 처리하지 못했습니다.",
        });
    }
}

// 선물추천 Like 반영 (giftUserData의 selectedGift, gifts의 giftLikeCnt 업데이트)
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
        console.log(giftName);
        const likeGiftExist = await gifts.findOne({ giftName: giftName });
        console.log("likeGiftExist: " + likeGiftExist);

        await gifts.updateOne(
            { giftName },
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

// 선물추천 랜덤 => DONE
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
    getGiftResult,
    reviseGiftFeedback,
    getRandomGift,
};
