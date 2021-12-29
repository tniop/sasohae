const express = require("express");
const router = express.Router();
const { createBoard, getSelectedBoards } = require("./controllers/boards");
const createGift = require("./controllers/gifts");
const createMenu = require("./controllers/menus");
const createGiftQuestions = require("./controllers/giftQuestions");
const createMoneyQuestions = require("./controllers/moneyQuestions");
const upload = require("../middleware/upload");
const imgUpload = require("./controllers/imgUpload");
const {
    updateBoardUsersCnt,
    updateBoardWriteUsersCnt,
} = require("../middleware/boardsCount");
const { getGiftQuestion, addGiftResult, getGiftResult, reviseGiftFeedback, getRandomGift, createGift, createGiftQuestions, createStatistic } = require("./controllers/gifts");



router.post("/comments", updateBoardWriteUsersCnt, createBoard);
router.get("/comments/:commentIdx", updateBoardUsersCnt, getSelectedBoards);
router.post("/admin/gifts", upload.single("img"), createGift);
// router.post("/admin/image", upload.single("img"), imgUpload); 이미지 업로드를 위한 admin용 api
router.post("/admin/menu", upload.single("img"), createMenu);
router.post("/admin/money", createMoneyQuestions);
router.post("/admin/gifts/questions", createGiftQuestions);

router.get("/gifts", getGiftQuestion);
router.post("/gifts", addGiftResult);
router.get("/gifts/result", getGiftResult); // addGiftResult 로 함께 처리
router.put("/gifts/result", reviseGiftFeedback);
router.get("/gifts/random", getRandomGift);

module.exports = router;
