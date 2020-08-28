const pages = {
    titlePage: 0,
    mainPage: 1
}

var vm = new Vue({

    el: "#mist",

    data: {

        page: pages.titlePage,
        loadingWhat: 0,

        typeUid: "",

        uid: "",
        key: "",
        dialogs: [],

        isNewGame: false,

    },

    created() {

    },
    
    methods: {

        PostNewGame() {

            this.loadingWhat = 1

            let _data = {}

            // 发送
            axios.post('/newGame', _data)
                .then((response) => {
                    if (response && response.data) {
                        if (response.data.result === false) {
                            alert(response.data.msg);
                        } else {
                            let user = response.data.user;
                            this.loadingWhat = 0;
                            this.uid = user.uid;
                            this.keys = user.keys;
                            this.dialogs = user.dialogs;
                            this.page = pages.mainPage;
                            this.TransAllDialogs();
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
            });

        },

        TransAllDialogs() {

            for (let i = 0; i < this.dialogs.length; i += 1) {

                this.dialogs[i].text = this.dialogs[i].text.replace("[换行]", "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");

            }

        },

        TransDialog() {

        },

        PostLoadGame() {

            this.loadingWhat = 1

            let _data = {
                uid: this.typeUid
            }

            // 发送
            axios.post('/loadGame', _data)
                .then((response) => {
                    if (response && response.data) {
                        if (response.data.result === false) {
                            alert(response.data.msg);
                        } else {
                            let user = response.data.user;
                            this.loadingWhat = 0;
                            this.uid = user.uid;
                            this.keys = user.keys;
                            this.dialogs = user.dialogs;
                            this.page = pages.mainPage;
                            this.TransAllDialogs();
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
            });

        },

        PostAction() {

            // 前端先验证
            if (this.key == "") {
                alert("请输入线索 或 想了解的信息");
                return;
            }

            if (this.uid == "") {
                alert("未登录存档号");
                // 跳转
                return;
            }

            // 数据
            let _data = {
                uid: this.uid,
                key: this.key
            }

            // 发送
            axios.post('/nextAction', _data)
                .then((response) => {
                    if (response && response.data) {
                        if (response.data.result === false) {
                            alert(response.data.msg);
                        } else {
                            if (response.data.msg) {
                                alert(response.data.msg);
                            } else {
                                this.dialogs.push(response.data.dialog);
                                console.log(JSON.stringify(response.data.dialog));
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
            });

        }

    }
})