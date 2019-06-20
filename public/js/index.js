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

//全选框
(function () {
    //DOM 4步：
    //1.找到触发事件的元素
    //查找table下的thead下的唯一的input
    var checkAll = document.querySelector("table>thead input");
    //查找table下tbody下的所有input
    var checkboxs = document.querySelectorAll("table>tbody input");
    //2.绑定事件处理函数
    checkAll.onclick = function () {
        //3.查找触发事件的元素
        //遍历checkboxs中的每个checkbox
        for (var check of checkboxs) {
            //4.修改元素
            //获得当前单击的checkbox
            var checkAll = this;
            //每遍历一个，就让他的checked和checkbox的保持一致
            check.checked = checkAll.checked;
        }
    }
    //DOM 4步
    //1. 查找触发事件的元素
    //2. 绑定事件处理函数
    for (var checkbox of checkboxs) {
        //3.查找要修改的元素
        checkbox.onclick = function () {
            var check = this;
            //4.修改元素
            //如果当前check取消选中
            if (check.checked == false) {
                //则checkAll一定不全选
                checkAll.checked = false
            } else {
                //先查找tbody下未选中的input
                var unchecked = document.querySelector("table>tbody input:not(:checked)")
                //找不到未选中的check,就全选
                if (unchecked == null) {
                    checkAll.checked = true;
                }
            }
        }
    }
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