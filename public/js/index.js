
new Vue({
    el: "#table1",
    data: {
        drfts: {},
        news: {},
    },
    watch: {
    },
    methods: {
        edit() {
            var checkeds = document.querySelectorAll("#table1 input[type=checkbox]")
            var lid = "";
            for (var checked of checkeds) {
                if (checked.checked) {
                    lid = checked.id
                    window.open(`editdrafts.html?lid=${lid}`, '_blank')
                }
            }

        }
    },
    created() {
        axios.get("http://127.0.0.1:8080/index/drfts").then(result => {
            console.log(result);
            this.drfts = result.data
        })
        axios.get("http://127.0.0.1:8080/index/news").then(result => {
            this.news = result.data;
        })
    }
})
new Vue({
    el: "#table2",
    data: {
        news: {},
        picnews: {},
        artnews: {}
    },
    methods: {
        edit() {
            var checkeds = document.querySelectorAll("#table2 input[type=checkbox]")
            var lid = "";
            for (var checked of checkeds) {
                if (checked.checked) {
                    lid = checked.id
                    window.open(`edit.html?lid=${lid}`, '_blank')
                }
            }

        }
    },
    created() {
        axios.get("http://127.0.0.1:8080/index/news").then(result => {
            this.news = result.data;
            var picarr = [];
            var artarr = [];
            for (var obj in result.data) {
                if (result.data[obj].thumb != "") {
                    picarr.push(result.data[obj])
                } else {
                    artarr.push(result.data[obj])
                }

            }
            this.picnews = picarr;
            this.artnews = artarr;
        })
    },
    mounted() {
        //选项卡
        (function () {
            function table(arr, idname) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].index = i;
                    arr[i].onclick = function () {
                        var p = 68 * this.index + "px";
                        var underline = document.querySelector(`section #${idname} .underline`);
                        underline.style.transform = `translateX(${p})`;
                        var id = this.getAttribute("data-id");
                        var div = document.getElementById(id);
                        var show = document.querySelector(`section #${idname} li a.show`);
                        var open = document.querySelector(`section #${idname} .content>div.active`)

                        if (this.className == "") {
                            open != null && (open.className = "");
                            div.className = "active";
                            show != null && (show.className = "");
                            this.className = "show";
                        } else {
                            div.className == ""
                        }
                    }
                }
            }
            var as1 = document.querySelectorAll("section #table1 li>[data-toggle=tab]");
            table(as1, "table1");
            var as2 = document.querySelectorAll("section #table2 li>[data-toggle=tabl]");
            table(as2, "table2");
            var as3 = document.querySelectorAll("section #table3 li>[data-toggle=tabl]");
            table(as3, "table3");
        })();
        //滚动条样式
        (function () {
            var contents = document.querySelectorAll("section .box .content>div");
            for (var content of contents) {
                content.onmouseover = function () {
                    this.style.overflow = "auto";
                }
                content.onmouseout = function () {
                    this.style.overflow = "hidden";
                }
            }
        })();
    }
})




