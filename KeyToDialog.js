let Dialog = require("./models/dialog.js");

let r000 = new Dialog([], "2020-08-28", "阿明", "新来的，今天有个案子要交给你，听好咯。[换行]本地富豪宋老板早上委托我们寻找他的千金阿丽。");
let r001 = new Dialog([], "2020-08-28", "[内心独白]", "阿明是阿明侦探所的老板，也是我的老板，前辈们都说他获取情报的能力非常强，天生就是干这行的料。");
let r002 = new Dialog([], "2020-08-28", "阿明", "");

let r999 = new Dialog([], "2020-08-28", "阿明", "宋老板为了感谢你，特地开了一张支票给你，[换行]支票编码是: ww82q369zzhd3848033 别弄丢了！");

function KeyToDialog(user, key) {

    switch(key) {
        case "游戏正式开始":
            return r000;
        case "阿明":
            if (r001.CompletedBeforeKey(user)) return r001;
            break;
        case "见":
            if (r002.CompletedBeforeKey(user)) return r002;
            break;
    }

    return null;

}

module.exports = KeyToDialog;
