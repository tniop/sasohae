const menus = require("../../models/menus");

async function getMenu(req, res) {
    try {
        const { menuType, menuStyle, menuWith } = req.body;
        const menuList = await menus.find({
            menuType: menuType,
            menuStyle: menuStyle,
            menuWith: menuWith,
        });

        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

async function likeMenu(req, res) {
    try {
        const { menuName } = req.body;
        const likeMenuInfo = await menus.findOne({ menuName: menuName });
        await menus.updateOne(
            { menuName },
            {
                $set: {
                    menuLikeCnt: menuLikeCnt + 1,
                },
            }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

module.exports = { getMenu, likeMenu };
