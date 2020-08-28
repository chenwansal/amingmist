class User {

    constructor(ip, uid) {

        this.ip = ip;
        this.uid = uid;
        this.keys = [];
        this.dialogs = [];

    }

    static LoadUser(user) {

        let _n = new User(user.ip, user.uid);
        _n.keys = user.keys;
        _n.dialogs = user.dialogs;
        return _n;

    }

    AddKeys(newkey) {

        let _hasKey = this.keys.includes(newkey);

        if (!_hasKey) {

            this.keys.push(newkey);

        }

    }

}

module.exports = User;