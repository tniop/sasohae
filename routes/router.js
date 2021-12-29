const express = require("express");
const router = express.Router();

/* 성진님 부분 주석 처리해둠 
// const { createBoard, getBoards } = require("./controllers/boards");
//const createGift = require("./controllers/gifts");
// const createMenu = require("./controllers/menus");

// router.post("/comments", createBoard);
// router.get("/comments/:commentIdx", getBoards);
//router.post("/admin/gifts", createGift);
// router.post("/admin/menu", createMenu);
*/

const { getGiftQuestion, addGiftResult, getGiftResult, reviseGiftFeedback, getRandomGift, createGift, createGiftQuestions, createStatistic } = require("./controllers/gifts");

router.get("/gifts", getGiftQuestion);
router.post("/gifts", addGiftResult);
router.get("/gifts/result", getGiftResult); // addGiftResult 로 함께 처리
router.put("/gifts/result", reviseGiftFeedback);
router.get("/gifts/random", getRandomGift);

/* admin 초기 DB 셋팅 */
router.post("/admin/gifts", createGift);
router.post("/admin/gifts/questions", createGiftQuestions);
router.post("/admin/gifts/statistics", createStatistic);


/* 은지 담당*/
// getGiftQuestion 선물추천 옵션 받기(설문): get  /api/gifts
// addGiftResult 선물추천(결과) "POST":     post /api/gifts
// getGiftResult 선물추천(결과) "GET":      get  /api/gifts/result
// reviseGiftFeedback 선물추천 좋아요 반영:  put  /api/gifts/result
// getRandomGift 선물추천 랜덤:             get  /api/gifts/random
 
module.exports = router;
