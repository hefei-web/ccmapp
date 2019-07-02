Vue.filter("cateFilter", function (cate) {
    let catearr = cate.split(",");
    let arr = ["首页", "发现", "政务", "数据", "推荐", "关注", "新时代"];
    cate = "";
    for (var i = 0; i < catearr.length; i++) {
        cate += arr[parseInt(catearr[i])] + " "
    }
    return cate
})
new Vue({
    el: "#header",
    data: {
        header
    },
    watch: {

    },
    created() {
        axios.get("header.html").then(result => {
            this.header = result.data;
        })
/*         axios.get(`http://127.0.0.1:8080/index/user`, {
            params: {
                lid: location.search.split("=")[1]
            }
        }).then(result => {
            this.realname = result.data[0].realname;
        }) */
    },
    updated() {
    
        (function () {
        var nav = document.querySelector("header .nav");
        var section = document.querySelector("section");
        var prev = document.querySelector("header>.nav>.left>li:first-child");
        prev.onclick = function () {
            var aside = document.querySelector("aside");

            var logo = this.parentNode.parentNode.previousElementSibling;
            if (this.className == "left") {
                aside.className = "close";
                logo.className = "logo close";
                this.className = "right";
                nav.style.width = section.style.width = "100%";
            } else {
                aside.className = "";
                logo.className = "logo";
                this.className = "left";
                nav.style.width = section.style.width = "84%";
            }
        }
        if (window.matchMedia('(max-width:992px)').matches) {
            prev.className = "right";
            var aside = document.querySelector("aside");
            aside.className = "close";
            var logo = prev.parentNode.parentNode.previousElementSibling;
            logo.className = "logo close";
            nav.style.width = section.style.width = "100%";
        }
    }());
//全屏
(function () {
    var fullScreen = document.querySelector("header a.fullScreen");
    if (fullScreen.innerHTML == "全屏") {
        fullScreen.onclick = function (e) {
            e.preventDefault();
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el);
            };
            return
        }
    }
})();
//退出登录
(function () {
    var layout = document.querySelector("header a.layout");
    layout.onclick = function (e) {
        e.preventDefault();
        console.log(123)
        if (confirm("确认退出吗？")) {
            window.location.href = "login.html"
        }
    }
})();
//侧边栏高度自适应
(function () {
    var aside = document.getElementsByTagName("aside")[0];
    aside.style.height = document.body.clientHeight;
}());
//侧边栏手风琴
(function () {
    //查找要触发事件的元素
    var spans = document.querySelectorAll("aside>.menu>ul>li span");
    //遍历元素，绑定事件监听函数
    for (var span of spans) {
        span.onclick = function () {
            //查找要修改的元素
            var span = this;
            if (span.className == "") {
                var open = document.querySelector("aside>.menu>ul>li>span.open");
                open != null && (open.className = "");
                span.className = "open";
            } else {
                span.className = ""
            }
        }
    }
}());
    }
})

