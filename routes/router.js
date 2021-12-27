const express = require("express");
const router = express.Router();
const { createBoard, getBoards } = require("./controllers/boards");
const createGift = require("./controllers/gifts");
const createMenu = require("./controllers/menus");

router.post("/comments", createBoard);
router.get("/comments/:commentIdx", getBoards);
router.post("/admin/gifts", createGift);
router.post("/admin/menu", createMenu);

module.exports = router;
