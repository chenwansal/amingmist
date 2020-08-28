const az = "abcdefghijklmnopqrstuvwxyz";
const onenine = "0123456789";

function UidMaker() {
    let _str = "";
    for (let i = 0; i < 4; i += 1) {
        let _index = Math.floor(Math.random() * az.length);
        _str += az[_index];
    }
    for (let i = 0; i < 4; i += 1) {
        let _index = Math.floor(Math.random() * onenine.length);
        _str += onenine[_index];
    }
    return _str;
}

module.exports = UidMaker;