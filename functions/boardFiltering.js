const fs = require("fs");

function forbiddenWordTest(str) {
    const input = fs.readFileSync(process.env.FW_TXT).toString().split("\n");

    let result = false;
    var reg = /[\{\}\[\]\/?.,;:\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; // 특수문자 제거

    const tempStr = str.replace(reg, "");

    for (let i = 0; i < input.length; i++) {
        if (tempStr.includes(input[i])) {
            result = true;
            break;
        }
    }
    return result;
}

module.exports = { forbiddenWordTest };
