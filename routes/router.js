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

/* admin 초기 DB 셋팅 
router.post("/admin/gifts", createGift);
router.post("/admin/gifts/questions", createGiftQuestions);
router.post("/admin/gifts/statistics", createStatistic);
*/

module.exports = router;
