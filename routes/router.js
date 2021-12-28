const express = require("express");
const router = express.Router();
const { createBoard, getBoards } = require("./controllers/boards");
const createGift = require("./controllers/gifts");
const createMenu = require("./controllers/menus");
const createGiftQuestions = require("./controllers/giftQuestions");
const createMoneyQuestions = require("./controllers/moneyQuestions");
const upload = require("../middleware/upload");
const imgUpload = require("./controllers/imgUpload");

router.post("/comments", createBoard);
router.get("/comments/:commentIdx", getBoards);
router.post("/admin/gifts", createGift);
router.post("/admin/menu", createMenu);
router.post("/admin/gifts/questions", createGiftQuestions);
router.post("/admin/money", createMoneyQuestions);
router.post("/admin/image", upload.single("img"), imgUpload);

module.exports = router;
