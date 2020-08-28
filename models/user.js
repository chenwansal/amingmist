class User {

    constructor(uid) {

        this.uid = uid;
        this.keys = [];

    }

    AddKeys(newkey) {

        let _hasKey = this.keys.includes(newkey);

        if (!_hasKey) {

            this.keys.push(newkey);

        }

    }

}