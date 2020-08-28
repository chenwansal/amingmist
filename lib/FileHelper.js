let fs = require("fs");

function SaveData(user, cb) {

    // 判断是否存在
    
    // 存在则覆盖

    // 不存在则新增

}

function HasExist(uid, cb) {

    // 寻找文件夹
    fs.exists("./data/" + uid, (_exist) => {
        cb(_exist);
    });

}

function LoadData(uid, cb) {

    // 判断uid是否存在

    // 存在则返回user(有缓存则返回缓存，无缓存则new 一个)

}

exports.SaveData = SaveData;
exports.HasExist = HasExist;
exports.LoadData = LoadData;