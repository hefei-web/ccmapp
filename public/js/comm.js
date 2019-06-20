        //侧边栏高度自适应
        (function () {
            var aside = document.getElementsByTagName("aside")[0];
            aside.style.height = document.body.clientHeight;
        })();
        //侧边栏隐藏
        (function () {
            var nav = document.querySelector("header .nav");
            var section = document.querySelector(".main section");
            var prev = document.querySelector("header>.nav>.left>li:first-child");
            prev.onclick = function () {
                var aside = this.parentNode.parentNode.parentNode.nextElementSibling.children[0];
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
                    nav.style.width = section.style.width = "85%";
                }
            }
            if(window.matchMedia('(max-width:550px)').matches){
                prev.className = "right";
                var aside = prev.parentNode.parentNode.parentNode.nextElementSibling.children[0];
                aside.className = "close";
                var logo = prev.parentNode.parentNode.previousElementSibling;
                logo.className = "logo close";
                nav.style.width = section.style.width = "100%";
            }
        })();
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
        })();


