const menus = require("../../models/menus");

// admin : 메뉴 db 등재용 함수
async function createMenu(req, res) {
    try {
        const menuUrl = req.file.location;
        const {
            menuType,
            menuStyle,
            menuWith,
            menuName,
            menuLikeCnt,
            menuResultCnt,
        } = req.body;
        await menus.create({
            menuUrl,
            menuType,
            menuStyle,
            menuWith,
            menuName,
            menuLikeCnt,
            menuResultCnt,
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = createMenu;
