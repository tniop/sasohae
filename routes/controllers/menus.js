const menus = require("../../models/menus");

async function getMenu(req, res) {
    try {
        const all = "*"; // 전체 항목

        const { menuType, menuStyle, menuWith } = req.body;
        let tempMenuList = [];

        if(menuStyle === all) {
            const menuList = await menus.find({
                menuType: { $elemMatch: { $in: [all, menuType] } }, 
                menuWith: { $elemMatch: { $in: [all, menuWith] } }, 
            }, {
                _id: false,
                menuType: false,
                menuStyle: false,
                menuWith: false,
                menuResultCnt: false,
                menu_id: false,
                __v: false
            });
            menuList.sort(() => Math.random() - Math.random());
            tempMenuList.push(menuList[Object.keys(menuList)[0]]);
            tempMenuList.push(menuList[Object.keys(menuList)[1]]);
            tempMenuList.push(menuList[Object.keys(menuList)[2]]);
            
            res.status(200).send(tempMenuList);
        } else {
            const menuList = await menus.find({
                menuType: { $elemMatch: { $in: [all, menuType] } }, 
                menuStyle: menuStyle,
                menuWith: { $elemMatch: { $in: [all, menuWith] } }, 
            }, {
                _id: false,
                menuType: false,
                menuStyle: false,
                menuWith: false,
                menuResultCnt: false,
                menu_id: false,
                __v: false
            });
            menuList.sort(() => Math.random() - Math.random());
            tempMenuList.push(menuList[Object.keys(menuList)[0]]);
            tempMenuList.push(menuList[Object.keys(menuList)[1]]);
            tempMenuList.push(menuList[Object.keys(menuList)[2]]);
            
            res.status(200).send(tempMenuList);
        }
    } catch (err) {
        console.log("Error : " + err);
    }
}

async function likeMenu(req, res) {
    try {
        const { menuName } = req.body;
        const likeMenuExist = await menus.findOne({ menuName: menuName });
        if (likeMenuExist) {
            const menuLikeCnt = likeMenuExist.menuLikeCnt;
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

async function recommendMenu(req, res) {
    try {
        const { menuName } = req.body;
        const { menuRecommendCnt } = await menus.findOne({ menuName: menuName });
        await menus.updateOne(
            { menuName: menuName },
            { $set: { menuRecommendCnt: menuRecommendCnt + 1 } }
        );
        res.status(200).send();
    } catch (err) {
        console.log("Error : " + err);
    }
}

module.exports = { getMenu, likeMenu, recommendMenu };
