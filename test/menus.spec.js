const {
    getMenu,
    likeMenu,
    recommendMenu,
} = require("../controllers/menus");
const menus = require("../models/menus");

// const req = {
//     body: { menuType: "1", menuStyle: "1", menuWith: "2" },
// };
// const res = {
//     status: jest.fn(() => res),
//     send: jest.fn(),
// };

// test("메뉴 추천이 정상적일 경우 200", async () => {
//     await getMenu(req, res);
//     console.log(res.send)
//     expect(res.status).toBeCalledWith(200);
// });
