const express = require("express");
const router = express.Router();
const { createBoard, getBoards } = require("./controllers/boards");
// const createGift = require("./controllers/gifts");
// const createMenu = require("./controllers/menus");
const { getMoneyQuestion, moneyQuestionAnswer } = require("./controllers/money");
const { getMenu, likeMenu } = require("./controllers/menus");

router.post("/comments", createBoard);
router.get("/comments/:commentIdx", getBoards);
// router.post("/admin/gifts", createGift);
// router.post("/admin/menus", createMenu);

router.get("/money", getMoneyQuestion);
router.get("/money/:menuQuestion", moneyQuestionAnswer);

router.get("/menu", getMenu);
router.put("/menu", likeMenu);

module.exports = router;
