const express = require("express");
const router = express.Router();

const { getGiftQuestion, addGiftResult, getGiftResult, reviseGiftFeedback, getRandomGift, createGift, createGiftQuestions, createStatistic } = require("./controllers/gifts");
const { getMoneyQuestion, moneyQuestionAnswer } = require("./controllers/money");
const { getMenu, likeMenu, createMenu } = require("./controllers/menus");
const { createBoard, getSelectedBoards } = require("./controllers/boards");

const upload = require("../middleware/upload");
const imgUpload = require("./controllers/imgUpload");
const {

} = require("../middleware/statistic");

router.get("/gifts", updateSurveyUsersCnt, getGiftQuestion);
router.post("/gifts", addGiftResult);
router.get("/gifts/result", getGiftResult); // addGiftResult 로 함께 처리
router.put("/gifts/result", reviseGiftFeedback);
router.get("/gifts/random", updateRandomUsersCnt, getRandomGift);

router.post("/admin/menu", upload.single("img"), createMenu);
router.post("/admin/money", createMoneyQuestions);
router.post("/admin/gifts/questions", createGiftQuestions);

router.get("/money", getMoneyQuestion);
router.get("/money/:menuQuestion", moneyQuestionAnswer);

router.get("/menu", getMenu);
router.put("/menu", likeMenu);

router.post("/comments", updateBoardWriteUsersCnt, createBoard);
router.get("/comments/:commentIdx", updateBoardUsersCnt, getSelectedBoards);
router.post("/admin/gifts", upload.single("img"), createGift);
// router.post("/admin/image", upload.single("img"), imgUpload); 이미지 업로드를 위한 admin용 api

module.exports = router;
