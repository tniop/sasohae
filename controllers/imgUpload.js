// 이미지 업로드 확인용 함수
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
