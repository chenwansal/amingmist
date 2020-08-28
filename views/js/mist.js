var vm = new Vue({

    el: "#mist",

    data: {

        typeUid: "",

        uid: "mistss",
        currentAction: "",

        isNewGame: false,

    },

    created() {

    },
    
    methods: {

        PostNewGame() {

            let _data = {}

            // 发送
            axios.post('/newGame', _data)
                .then((response) => {
                    if (response && response.data) {
                        this.uid = response.data.uid
                    }
                })
                .catch((error) => {
                    console.log(error);
            });

        },

        PostLoadGame() {

            let _data = {
                typeUid: this.typeUid
            }

            // 发送
            axios.post('/loadGame', _data)
                .then((response) => {
                    if (response && response.data) {
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
            });

        },

        PostHelper() {

            // 前端先验证
            if (this.currentAction == "") {
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
                currentAction: this.currentAction
            }

            // 发送
            axios.post('/nextAction', _data)
                .then((response) => {
                    if (response && response.data) {
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
            });

        }

    }
})