const userAccessTime = require("../models/userAccessTime");

async function createAccessTime(req, res) {
    try {
        await userAccessTime.create({});
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = createAccessTime;
