const gifts = require("../models/gifts");
const giftQuestions = require("../models/giftQuestions");
const giftUserData = require("../models/giftUserData");

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

        const giftAnswerP = giftAnswerPersonality[1];
        const giftAnswerE = giftAnswerEmotional[1];
        const giftAnswerT = giftAnswerTrendy[1];
        let surveyGifts = [];

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

            const tempGiftList = await gifts.find({
                    giftEvent: { $elemMatch: { $in: [ "9" ] } },
            }, {
                _id: false, giftName: true, giftUrl: true, giftLikeCnt: true, gift_id: true
            });

            tempGiftList.sort(() => Math.random() - Math.random());
            surveyGifts.push(tempGiftList[Object.keys(tempGiftList)[0]]);
            surveyGifts.push(tempGiftList[Object.keys(tempGiftList)[1]]);
            surveyGifts.push(tempGiftList[Object.keys(tempGiftList)[2]]);

            // 하찮은 선물 카테고리의 추천된 선물 카운트 증가
            const { giftRecommendCnt } = await gifts.updateMany(
                {
                    giftName: { $in: [surveyGifts[0].giftName, surveyGifts[1].giftName, surveyGifts[2].giftName] },
                },
                { $set: { giftRecommendCnt: giftRecommendCnt + 1 } }
            );

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

        // 하찮은 선물이 아닌 경우
        } else {
            const all = "*"; // 전체 항목

            const tempGiftList = await gifts.find({
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

            tempGiftList.sort(() => Math.random() - Math.random());
            surveyGifts.push(tempGiftList[Object.keys(tempGiftList)[0]]);
            surveyGifts.push(tempGiftList[Object.keys(tempGiftList)[1]]);
            surveyGifts.push(tempGiftList[Object.keys(tempGiftList)[2]]);

            // 추천된 선물 카운트 증가
            const { giftRecommendCnt }  = await gifts.updateMany(
                {
                    giftName: { $in: [surveyGifts[0].giftName, surveyGifts[1].giftName, surveyGifts[2].giftName] },
                },
                { $set: { giftRecommendCnt: giftRecommendCnt + 1  } }
            );

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
        // giftUserData 테이블에 like한 선물 이름 반영
        const { selectedGift_id, selectedGift } = req.body;

        await giftUserData.updateOne(
            { selectedGift_id },
            { $push: { selectedGift: selectedGift } } 
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

// 선물추천 giftRecommendCnt 반영  -> 이 부분 주석 처리? (RecommendCnt addGiftResult 에서 처리)
async function giftRecommend(req, res) {
    try {
        const { selectedGift } = req.body;
        const { giftRecommendCnt } = await gifts.findOne({ giftName: selectedGift });
        // await gifts.updateOne(
        //     { giftName: selectedGift },
        //     { $set: { giftRecommendCnt: giftRecommendCnt + 1 } }
        // );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

// 선물추천 랜덤 
async function getRandomGift(req, res) {
    try {
        const randomGifts = await gifts.aggregate([
            { $sample: { size: 3 } },
            { $project: { _id: false, giftName: true, giftUrl: true, giftLikeCnt: true, gift_id: true } },
        ]);

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
