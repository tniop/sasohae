const express = require("express");
const router = express.Router();
const { createBoard, getSelectedBoards } = require("./controllers/boards");
const { getGiftQuestion, addGiftResult, getGiftResult, reviseGiftFeedback, getRandomGift, createGift, createGiftQuestions, createStatistic } = require("./controllers/gifts");
const { userVisit, useMoney, useMenu } = require("./controllers/statistics");
const { getMoneyQuestion, moneyQuestionAnswer } = require("./controllers/money");
const { getMenu, likeMenu, createMenu } = require("./controllers/menus");

const createMoneyQuestions = require("./controllers/moneyQuestions");

const upload = require("../middleware/upload");
const imgUpload = require("./controllers/imgUpload");
const {
    updateBoardUsersCnt,
    updateBoardWriteUsersCnt,
} = require("../middleware/boardsCount");
const {
    updateSurveyUsersCnt,
    updateRandomUsersCnt,
} = require("../middleware/giftsCount");


router.post("/comments", updateBoardWriteUsersCnt, createBoard);
router.get("/comments/:commentIdx", updateBoardUsersCnt, getSelectedBoards);
router.post("/admin/gifts", upload.single("img"), createGift);
// router.post("/admin/image", upload.single("img"), imgUpload); 이미지 업로드를 위한 admin용 api
router.post("/admin/menu", upload.single("img"), createMenu);
router.post("/admin/money", createMoneyQuestions);
router.post("/admin/gifts/questions", createGiftQuestions);

router.get("/gifts", updateSurveyUsersCnt, getGiftQuestion);
router.post("/gifts", addGiftResult);
router.get("/gifts/result", getGiftResult); // addGiftResult 로 함께 처리
router.put("/gifts/result", reviseGiftFeedback);
router.get("/gifts/random", updateRandomUsersCnt, getRandomGift);

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
