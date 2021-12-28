async function imgUpload(req, res) {
    try {
        const imgInfo = req.file;
        console.log(imgInfo);
        res.send("성공");
    } catch (err) {
        res.send(err);
    }
}

module.exports = imgUpload;
