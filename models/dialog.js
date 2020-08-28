class Dialog {

    constructor(requireKeys, date, talker, text) {
        this.requireKeys = requireKeys;
        this.date = date;
        this.talker = talker;
        this.text = text;
    }

    CompletedBeforeKey(user) {

        let _keys = user.keys;

        let _compareCount = 0;

        for (let i = 0; i < _keys.length; i += 1) {

            let _key = _keys[i];

            if (this.requireKeys.includes(_key)) {

                _compareCount += 1;

            }

        }

        if (_compareCount == this.requireKeys.length) {

            return true;

        } else {

            return false;

        }
    }

}

module.exports = Dialog;