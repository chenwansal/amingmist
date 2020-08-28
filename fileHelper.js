let fs = require("fs");
let User = require("../models/user");

function SaveData(user, cb) {

    // 判断是否存在
    fs.writeFile(__dirname + "/data/" + user.uid, JSON.stringify(user), { flag: "w", encoding:"utf-8"}, (err) => {

        if (err) {
            cb(false);
            console.log(err);
        } else {
            cb(true);
        }

    });
    
}

function HasExist(uid, cb) {

    // 寻找文件夹
    fs.exists(__dirname + "/data/" + uid, (_exist) => {

        cb(_exist);

    });

}

function LoopCheck(newUid, cb) {
    HasExist(newUid, (hasSame) => {
        if (hasSame) {
            newUid = uidMaker();
            LoopCheck(newUid, cb);
        } else {
            cb(newUid);
        }
    });
}

function LoadData(uid, cb) {

    // 判断uid是否存在
    HasExist(uid, (hasExist) => {

        if (hasExist) {

            fs.readFile(__dirname + "/data/" + uid, {encoding: "utf-8"}, (err, data) => {

                if (err) {

                    cb(null);

                } else {

                    let _obj = JSON.parse(data);
                    _obj = User.LoadUser(_obj);
                    cb(_obj);

                }

            });

        } else {

            cb(null);

        }

    })

}

exports.SaveData = SaveData;
exports.HasExist = HasExist;
exports.LoadData = LoadData;
exports.LoopCheck = LoopCheck;