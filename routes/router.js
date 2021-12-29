const express = require("express");
const router = express.Router();
const { createBoard, getBoards } = require("./controllers/boards");
// const createGift = require("./controllers/gifts");
// const createMenu = require("./controllers/menus");
const { getGiftQuestion, addGiftResult, getGiftResult, reviseGiftFeedback, getRandomGift, createGift, createGiftQuestions, createStatistic } = require("./controllers/gifts");
const { userVisit, useMoney, useMenu } = require("./controllers/main");
const { getMoneyQuestion, moneyQuestionAnswer } = require("./controllers/money");
const { getMenu, likeMenu } = require("./controllers/menus");

router.get("/gifts", getGiftQuestion);
router.post("/gifts", addGiftResult);
router.get("/gifts/result", getGiftResult); // addGiftResult 로 함께 처리
router.put("/gifts/result", reviseGiftFeedback);
router.get("/gifts/random", getRandomGift);

router.post("/comments", createBoard);
router.get("/comments/:commentIdx", getBoards);
// router.post("/admin/gifts", createGift);
// router.post("/admin/menus", createMenu);

router.put("/main", userVisit);
router.put("/main/money", useMoney);
router.put("/main/menu", useMenu);

router.get("/money", getMoneyQuestion);
router.get("/money/:menuQuestion", moneyQuestionAnswer);

router.get("/menu", getMenu);
router.put("/menu", likeMenu);

/* admin 초기 DB 셋팅 
router.post("/admin/gifts", createGift);
router.post("/admin/gifts/questions", createGiftQuestions);
router.post("/admin/gifts/statistics", createStatistic);
*/

module.exports = router;
