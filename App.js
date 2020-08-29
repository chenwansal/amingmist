// 引用express
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
var upload = multer();
var app = express();

var uidMaker = require("./UidMaker.js");
var fileHelper = require("./fileHelper.js");
var User = require("./models/user.js");
var KeyToDialog = require("./KeyToDialog.js");

let users = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(require('path').join(__dirname, 'views')));

app.set("views", __dirname);

app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express);

// 监听首页
app.get("/", function(req, res) {

    res.render("views/index.html")

});

app.post("/newGame", function(req, res) {

    // 生成唯一uid
    fileHelper.LoopCheck(uidMaker(), (diffUid) => {

        let _newUid = diffUid;

        let _user = new User(req.ip, _newUid);
        _user.AddKeys("开始");
        let _dialog = KeyToDialog(_user, "开始");
        _user.dialogs.push(_dialog);

        // 建档
        fileHelper.SaveData(_user, (result) => {

            if (result === true) {

                // 缓存
                users[_newUid] = _user;

                // 返回新数据
                res.json({
                    result: true,
                    user: _user
                });

            } else {

                res.json({
                    result: false,
                    msg: "错误的请求"
                });

            }

        });

    })

});

app.post("/loadGame", function(req, res) {

    if (req.body) {

        let _uid = req.body.uid;

        // 从文件读档
        if (users[_uid] === null || users[_uid] === undefined) {

            fileHelper.LoadData(_uid, (user) => {

                if (user === null || user === undefined) {
    
                    res.json({
                        result: false,
                        msg: "用户不存在, 请重新输入。"
                    })
    
                } else {
    
                    res.json({
                        result: true,
                        user: user
                    })
                }
    
            });

        // 从缓存读档
        } else {

            res.json({
                result: true,
                user: users[_uid]
            })

        }

    } else {

        res.json({
            result: false,
            msg: "错误的请求。"
        })

    }
    
});

app.post("/nextAction", function(req, res) {

    // console.log(req.body);

    if (req.body) {

        let _uid = req.body.uid;
        let _key = req.body.key;
        if (_key) {
            _key = _key.trim();
        }

        // 不存在uid
        let _user = users[_uid];
        if (!_uid || !_user) {
            res.json({
                result: false,
                msg: "用户不存在, 请重新开始游戏。"
            });
            return;
        }

        // 判断是否已探索过
        let _hasGet = _user.keys.includes(_key);
        if (_hasGet) {
            res.json({
                result: true,
                msg: _key + " 信息已经获取过了。"
            });
            return;
        }

        // 判断是否是正确的线索 && 判断前置线索是否完成
        let _dialog = KeyToDialog(_user, _key);

        if (_dialog == null) {

            res.json({
                result: false,
                msg: "未找到相关信息: " + _key + "。"
            })

        } else {

            // 推进下一步，并缓存
            users[_uid].AddKeys(_key);
            users[_uid].dialogs.push(_dialog);
            
            // 存档
            fileHelper.SaveData(users[_uid], (result) => {

                // 返回数据
                res.json({
                    dialog: _dialog
                })

            })

        }

    } else {

        res.json({
            result: false,
            msg: "错误的请求。"
        })

    }

});

// 载入数据
function LoadAllData() {

    users = {};

    let _filenames = fs.readdirSync(__dirname + "/data/", { encoding: "utf-8" });

    for (let i = 0; i < _filenames.length; i += 1) {

        let _uid = _filenames[i];

        if (_uid == ".keepgitemptydir") continue;

        let _user = fs.readFileSync(__dirname + "/data/" + _uid, { encoding: "utf-8"});
        _user = JSON.parse(_user);
        _user = User.LoadUser(_user);

        users[_uid] = _user;

    }

}

LoadAllData();

// 监听端口
let port = 9105;
app.listen(port, () => {
    console.log("正在监听" + port);
})
