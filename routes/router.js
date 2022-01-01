const express = require("express");
const router = express.Router();

/* ==================== controllers ====================*/
const {
    getGiftQuestion,
    addGiftResult,
    reviseGiftFeedback,
    getRandomGift,
} = require("./controllers/gifts");
const {
    getMoneyQuestion,
    moneyQuestionAnswer,
} = require("./controllers/money");
const { getMenu, likeMenu } = require("./controllers/menus");
const { createBoard, getSelectedBoards } = require("./controllers/boards");
const {
    createMoneyQuestions,
    createMenu,
    createGift,
    createGiftQuestions,
} = require("./controllers/admin");
const imgUpload = require("./controllers/imgUpload");
/* ==================================================*/

/* ==================== middleware ====================*/
const upload = require("../middleware/upload");
const {
    userVisit,
    useGift,
    useRandomGift,
    useMoney,
    useMenu,
    userVisitBoard,
    writeBoard,
} = require("../middleware/statistic");
/* ==================================================*/

/* ==================== router ====================*/
router.put("/main", userVisit);
router.put("/money", useMoney);
// router.put("/comments", userVisitBoard);

router.get("/gifts", useGift, getGiftQuestion);
router.post("/gifts", addGiftResult);
router.put("/gifts/result", reviseGiftFeedback);
router.get("/gifts/random", useRandomGift, getRandomGift);

router.get("/money", getMoneyQuestion);
router.get("/money/:menuQuestion", moneyQuestionAnswer);

router.post("/menu", getMenu);
router.put("/menu", useMenu, likeMenu);

router.post("/comments", writeBoard, createBoard);
router.get("/comments", userVisitBoard, getSelectedBoards);

// router.post("/admin/image", upload.single("img"), imgUpload);

router.post("/admin/gifts", upload.single("img"), createGift);
router.post("/admin/gifts/questions", createGiftQuestions);
router.post("/admin/money", createMoneyQuestions);
router.post("/admin/menu", upload.single("img"), createMenu);
/* ==================================================*/

module.exports = router;
