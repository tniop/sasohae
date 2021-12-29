const menus = require("../../models/menus");

async function getMenu(req, res) {
    try {
        const { menuType, menuStyle, menuWith } = req.body;
        const menuList = await menus.find({
            menuType: menuType,
            menuStyle: menuStyle,
            menuWith: menuWith,
        });
        res.status(200).send(menuList);
    } catch (err) {
        console.log("Error : " + err);
    }
}

async function likeMenu(req, res) {
    try {
        const { menuName } = req.body;
        const likeMenuExist = await menus.findOne({ menuName: menuName });
        if (!likeMenuExist) {
            await menus.updateOne(
                { menuName },
                { $set: { menuLikeCnt: menuLikeCnt + 1 } }
            );
        } else {
            console.log(menuName + "없는 메뉴 입니다. error!")
        }
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}


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

module.exports = { getMenu, likeMenu, createMenu };
