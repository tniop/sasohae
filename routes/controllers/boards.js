const boards = require("../../models/boards");

async function createBoard(req, res) {
    try {
        const { comment } = req.body;
        if (!comment) {
            res.status(400).send("내용을 입력해주세요!");
            return;
        }
        await boards.create({ comment });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function getBoards(req, res) {
    try {
        // const board_id = req.params;
        const allBoards = await boards.find({});
        res.status(200).send(allBoards);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { createBoard, getBoards };
