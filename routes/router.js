const express = require("express");
const router = express.Router();
const { createBoard, getBoards } = require("./controllers/boards");
// const createGift = require("./controllers/gifts");
// const createMenu = require("./controllers/menus");
const { userVisit, useMoney, useMenu } = require("./controllers/main");
const { getMoneyQuestion, moneyQuestionAnswer } = require("./controllers/money");
const { getMenu, likeMenu } = require("./controllers/menus");

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

module.exports = router;
