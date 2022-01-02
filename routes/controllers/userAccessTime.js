const userAccessTime = require("../../models/userAccessTime");

async function createAccessTime(req, res) {
    await userAccessTime.create({});
    res.status(200).send();
}

module.exports = createAccessTime;
