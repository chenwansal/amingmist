// 引用express
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var app = express();

var uidMaker = require("./lib/UidMaker");

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

    // 生成uid
    let _newUid = uidMaker();

    // 建档 / 存档

    // 返回uid

});

app.post("/loadGame", function(req, res) {

    // 判断uid是否存在

    // 读档

    // 返回存档的数据
    
});

app.post("/nextAction", function(req, res) {

    // 判断是否是正确的线索

    // 判断前置线索是否完成

    // 推进下一步并存档

    // 返回数据

});

// 载入数据

// 监听端口
let port = 9105;
app.listen(port, () => {
    console.log("正在监听" + port);
})
