const boards = require("../models/boards");
const fs = require("fs");
require("dotenv").config();

async function createBoard(req, res) {
    try {
        const { comment } = req.body;
        if (!comment) {
            res.status(400).send({
                errorMessage: "내용을 입력해주세요!",
            });
            return;
        } else if (forbiddenWordTest(comment)) {
            res.status(400).send({
                errorMessage: "내용에 부적절한 단어가 포함되어 있습니다.",
            });
            return;
        }
        await boards.create({ comment });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

// 무한 스크롤 : 요청에 대하여 20개씩 db로부터 잘라 보낸다.
async function getSelectedBoards(req, res) {
    try {
        const board_id = req.query.commentIdx;
        const startNumber = Number(board_id);
        const selectedBoards = await boards
            .find({})
            .limit(20)
            .skip(startNumber)
            .sort({ _id: -1 });
        res.status(200).send(selectedBoards);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

function forbiddenWordTest(str) {
    const input = fs.readFileSync(process.env.FW_TXT).toString().split("\n");

    let result = false;
    var reg = /[\{\}\[\]\/?.,;:\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; // 특수문자 제거

    const tempStr = str.replace(reg, "");

    for (let i = 0; i < input.length; i++) {
        if (tempStr.includes(input[i])) {
            result = true;
            break;
        }
    }
    return result;
}

module.exports = { createBoard, getSelectedBoards };
