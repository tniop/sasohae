const boards = require("../../models/boards");

// 고민 끄나풀 작성을 위한 함수
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

// 무한 스크롤 사용을 위한 함수 > 요청에 대하여 10개씩 db로부터 잘라 보낸다.
async function getSelectedBoards(req, res) {
    try {
        const board_id = req.query.commentIdx;
        const startNumber = Number(board_id);
        const selectedBoards = await boards
            .find({})
            .limit(10)
            .skip(startNumber)
            .sort({ _id: -1 });
        res.status(200).send(selectedBoards);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { createBoard, getSelectedBoards };
