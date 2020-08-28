let r1 = new Dialog("2020-07-12", "阿明探长", "");

function CheckKey(key) {

    if (key === "见") {
        return r1;
    }

    return false;

}

class Dialog {

    constructor(date, talker, text) {
        this.date = date;
        this.talker = talker;
        this.text = text;
    }

}

module.exports = CheckKey;