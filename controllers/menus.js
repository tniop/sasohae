const menus = require("../models/menus");

async function getMenu(req, res) {
    try {
        const all = "*"; // 전체 항목

        const { menuType, menuStyle, menuWith } = req.body;
        let tempMenuList = [];

        if (menuStyle === all) {
            // 종류가 전체인 경우
            const menuList = await menus.find(
                {
                    menuType: { $elemMatch: { $in: [all, menuType] } },
                    menuWith: { $elemMatch: { $in: [all, menuWith] } },
                },
                {
                    _id: false,
                    menuType: false,
                    menuStyle: false,
                    menuWith: false,
                    menuResultCnt: false,
                    menu_id: false,
                    __v: false,
                }
            );
            menuList.sort(() => Math.random() - Math.random());
            tempMenuList.push(menuList[Object.keys(menuList)[0]]);
            tempMenuList.push(menuList[Object.keys(menuList)[1]]);
            tempMenuList.push(menuList[Object.keys(menuList)[2]]);

            // 추천된 선물 카운트 증가
            const tempMenu_0 = await menus.findOne({
                menuName: tempMenuList[0].menuName,
            });
            await menus.updateOne(
                { menuName: tempMenuList[0].menuName },
                { $set: { menuRecommendCnt: tempMenu_0.menuRecommendCnt + 1 } }
            );
            const tempMenu_1 = await menus.findOne({
                menuName: tempMenuList[1].menuName,
            });
            await menus.updateOne(
                { menuName: tempMenuList[1].menuName },
                { $set: { menuRecommendCnt: tempMenu_1.menuRecommendCnt + 1 } }
            );
            const tempMenu_2 = await menus.findOne({
                menuName: tempMenuList[2].menuName,
            });
            await menus.updateOne(
                { menuName: tempMenuList[2].menuName },
                { $set: { menuRecommendCnt: tempMenu_2.menuRecommendCnt + 1 } }
            );

            res.status(200).send(tempMenuList);
        } else {
            // 종류 전체가 아닐 경우
            const menuList = await menus.find(
                {
                    menuType: { $elemMatch: { $in: [all, menuType] } },
                    menuStyle: menuStyle,
                    menuWith: { $elemMatch: { $in: [all, menuWith] } },
                },
                {
                    _id: false,
                    menuType: false,
                    menuStyle: false,
                    menuWith: false,
                    menuResultCnt: false,
                    menu_id: false,
                    __v: false,
                }
            );
            menuList.sort(() => Math.random() - Math.random());
            tempMenuList.push(menuList[Object.keys(menuList)[0]]);
            tempMenuList.push(menuList[Object.keys(menuList)[1]]);
            tempMenuList.push(menuList[Object.keys(menuList)[2]]);

            // 추천된 선물 카운트 증가
            const tempMenu_0 = await menus.findOne({
                menuName: tempMenuList[0].menuName,
            });
            await menus.updateOne(
                { menuName: tempMenuList[0].menuName },
                { $set: { menuRecommendCnt: tempMenu_0.menuRecommendCnt + 1 } }
            );
            const tempMenu_1 = await menus.findOne({
                menuName: tempMenuList[1].menuName,
            });
            await menus.updateOne(
                { menuName: tempMenuList[1].menuName },
                { $set: { menuRecommendCnt: tempMenu_1.menuRecommendCnt + 1 } }
            );
            const tempMenu_2 = await menus.findOne({
                menuName: tempMenuList[2].menuName,
            });
            await menus.updateOne(
                { menuName: tempMenuList[2].menuName },
                { $set: { menuRecommendCnt: tempMenu_2.menuRecommendCnt + 1 } }
            );

            res.status(200).send(tempMenuList);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

async function likeMenu(req, res) {
    try {
        const { menuName } = req.body;
        const likeMenu = await menus.findOne({ menuName: menuName });

        const menuLikeCnt = likeMenu.menuLikeCnt;
        await menus.updateOne(
            { menuName },
            { $set: { menuLikeCnt: menuLikeCnt + 1 } }
        );

        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { getMenu, likeMenu };
