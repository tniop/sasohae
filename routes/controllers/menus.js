const menus = require("../../models/menus");

async function createMenu(req, res) {
    try {
        const {
            menuType,
            menuStyle,
            menuWith,
            menuName,
            menuLikeCnt,
            menuResultCnt,
        } = req.body;
        await menus.create({
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
