const gifts = require("../../models/gifts");
const giftQuestions = require("../../models/giftQuestions");
const giftUserData = require("../../models/giftUserData");

// 선물추천 옵션 받기(설문) 
async function getGiftQuestion(req, res) {
    try {
        const giftQuestionPersonality = await giftQuestions.find(
            { giftQuestionType: "personality" },
            { _id: false, giftQuestion: true, giftQuestion_id: true }
        );
        const giftQuestionEmotional = await giftQuestions.find(
            { giftQuestionType: "emotional" },
            { _id: false, giftQuestion: true, giftQuestion_id: true }
        );
        const giftQuestionTrendy = await giftQuestions.find(
            { giftQuestionType: "trendy" },
            { _id: false, giftQuestion: true, giftQuestion_id: true }
        );
        
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
            giftTarget,
            giftEvent,
            sex,
            age,
            giftAnswerExpensive,
            giftAnswerPersonality,
            giftAnswerEmotional,
            giftAnswerTrendy,
        });

        /* gifts 컬렉션에서 답변에 맞는 선물 리스트 담기 */
        // 하찮은 선물인 경우
        if (giftTarget === "8" || giftEvent === "9") {

            const surveyGifts = await gifts.find({
                    giftEvent: { $elemMatch: { $in: [ "9" ] } },
            }, {
                _id: false, giftName: true, giftUrl: true, giftLikeCnt: true, gift_id: true
            });

            // selectedGift_id 찾아서 보냄
            const giftAnswerP = giftAnswerPersonality[1];
            const giftAnswerE = giftAnswerEmotional[1];
            const giftAnswerT = giftAnswerTrendy[1];

            const getSelectedGift_id = await giftUserData.find({
                $and: [{
                    giftTarget: { $in: [giftTarget] },
                    giftEvent: { $in: [giftEvent] },
                    sex: { $in: [sex] },
                    age: { $in: [age] },
                    giftAnswerExpensive: { $in: [giftAnswerExpensive] },
                    giftAnswerPersonality: { $elemMatch: { $in: [giftAnswerP] } },
                    giftAnswerEmotional: { $elemMatch: { $in: [giftAnswerE] } },
                    giftAnswerTrendy: { $elemMatch: { $in: [giftAnswerT] } },
                }],
            }, {
                selectedGift_id: true, _id: false
            }).limit(1).sort({ $natural: -1 });

            const selectedGift_id = getSelectedGift_id[0].selectedGift_id;

            res.status(200).send({
                success: true,
                selectedGift_id: selectedGift_id,
                surveyGifts,
            });

        // 하찮은 선물이 아닌 경우
        } else {
            const all = "*"; // 전체 항목

            const giftAnswerP = giftAnswerPersonality[1];
            const giftAnswerE = giftAnswerEmotional[1];
            const giftAnswerT = giftAnswerTrendy[1];

            const surveyGifts = await gifts.find({
                $and: [{
                    giftTarget: { $elemMatch: { $in: [all, giftTarget] } }, 
                    giftEvent: { $elemMatch: { $in: [all, giftEvent] } }, 
                    sex: { $in: [all, sex]  }, 
                    age: { $elemMatch: { $in: [all, age] } }, 
                    giftAnswerExpensive: { $in: [all, giftAnswerExpensive] },                    
                    giftAnswerPersonality: { $in: [all, giftAnswerP] },
                    giftAnswerEmotional: { $in: [all, giftAnswerE] },
                    giftAnswerTrendy: { $in: [all, giftAnswerT] },
                }],
            }, {
                _id: false, giftName: true, giftUrl: true, giftLikeCnt: true, gift_id: true
            });

            // selectedGift_id 찾아서 보냄
            const getSelectedGift_id = await giftUserData.find({              
                $and: [{
                    giftTarget: { $in: [giftTarget] },
                    giftEvent: { $in: [giftEvent] },
                    sex: { $in: [sex] },
                    age: { $in: [age] },
                    giftAnswerExpensive: { $in: [giftAnswerExpensive] },
                    giftAnswerPersonality: { $elemMatch: { $in: [giftAnswerP] } },
                    giftAnswerEmotional: { $elemMatch: { $in: [giftAnswerE] } },
                    giftAnswerTrendy: { $elemMatch: { $in: [giftAnswerT] } },
                }],
                }, {
                selectedGift_id: true, _id: false
            }).limit(1).sort({ $natural: -1 });

            const selectedGift_id = getSelectedGift_id[0].selectedGift_id;

            res.status(200).send({
                success: true,
                selectedGift_id: selectedGift_id,
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

// 선물추천 giftRecommendCnt 반영 
async function giftRecommend(req, res) {
    try {
        const { selectedGift } = req.body;
        const { giftRecommendCnt } = await gifts.findOne({ giftName: selectedGift });
        await gifts.updateOne(
            { giftName: selectedGift },
            { $set: { giftRecommendCnt: giftRecommendCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 선물추천 랜덤 
async function getRandomGift(req, res) {
    try {
        const randomGifts = await gifts.find({
            },
            {
                _id: false, giftName: true, giftUrl: true, giftLikeCnt: true, gift_id: true
        });

        res.status(200).send({ success: true, randomGifts });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getGiftQuestion,
    addGiftResult,
    reviseGiftFeedback,
    giftRecommend,
    getRandomGift,
};
