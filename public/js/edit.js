/* 获取栏目列表、分类信息和标签 */
/* $(function () {
    var getmsg = function (elem) {
        $.ajax({
            url: `http://127.0.0.1:8080/edit/${elem}`,
            type: "get",
            dataType: "json",
            success: function (result) {
                var html = "";
                var i = 0;
                for (var msgs of result) {
                    for (var msg in msgs) {
                        i++;
                        html += `<label> <input type="checkbox" name="${elem}" id="${i}"><span>${msgs[msg]}</span></label>`
                    }
                }
                $(`#${elem}`).html(html)
            }
        })
    }
    getmsg("cate");
    getmsg("type");
    getmsg("label");
}) */

/* 稿件发布 */
$(function () {
    //富文本编辑器
    var thumb = "";
    var E = window.wangEditor;
    var editor = new E('#editorElem');
    let uploadUrl = 'http://127.0.0.1:8080/edit/uploadImg';


    editor.customConfig.onchange = (html) => {
        this.editorContent = html
    };
    //图片上传
    editor.customConfig = {
        uploadImgServer: uploadUrl,//配置上传图片的接口api
        uploadImgMaxSize: 5 * 1024 * 1024,//图片大小限制为 5M
        uploadImgMaxLength: 10,// 限制一次最多上传 10 张图片
        uploadImgShowBase64: true,
        uploadFileName: 'myFileName',//配置文件参数名（这个参数必需配置，后台用这个值接收图片）
        uploadImgHeaders: { 'Accept': 'multipart/form-data' },
        showLinkImg: true, //隐藏网络图片tab
        debug: true,//开启debug模式
        withCredentials: true,
        uploadImgTimeout: 50000
    }
    //监听函数在上传图片的不同阶段做相应处理
    editor.customConfig.uploadImgHooks = {
        success: function (xhr, editor, result) {
            console.log('图片上传并返回结果,图片插入成功')
        },
        fail: function (xhr, editor, result) {
            console.log('图片上传并返回结果，但图片插入错误')
        },
        error: function (xhr, editor) {
            console.log('图片上传出错')
        },
        timeout: function (xhr, editor) {
            console.log('图片上传超时')
        },
        customInsert: function (insertImg, result, editor) {
            console.log(' 图片上传并返回结果');
            console.log(result);
            var url = result.data;
            insertImg(url)
            alert(url);
        }
    };
    editor.create();
    //提取编辑器中的图片为缩略图
    $("#thumbbtn").click(function () {
        var html = editor.txt.html();
        if (html.indexOf(`<img`) != -1) {
            var arr = html.split(` src="`);
            thumb = arr[1].toString().split(`"`)[0];
        }
        $(this).parent().parent().children("img").attr("src", thumb).show()
    })
    $("#del").click(function () {
        $(this).parent().parent().children("img").hide()
    })

    //输入非空提示
    var $title = $("input[name=title]");
    var $description = $("textarea[name=description]");
    var $subtitle = $("input[name=subtitle]");
    var $keywords = $("input[name=keywords]");
    var $source = $("input[name=source]");
    var $author = $("input[name=author]");
    $title.blur(function () {
        if ($(this).val() == "") {
            $(this).addClass("warn")
        } else {
            $(this).removeClass("warn")
        }
    })
    $("#cate").parent().on("click", "input", function (e) {
        $("#cate").parent().removeClass("warn")
    })
    //输入字数判断
    var getnum = function (sele, leng) {
        sele.keyup(function () {
            $(this).next().html(`${$(this).val().length}/${leng}`)
        })
    }
    getnum($title, 50);
    getnum($description, 500);
    getnum($subtitle, 50);
    getnum($keywords, 50);
    //发送请求
    var $ajax = function (url, data) {
        $.ajax({
            url: `http://127.0.0.1:8080/edit/${url}`,
            type: "post",
            data: data,
            dataType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'  //multipart/form-data;boundary=--xxxxxxx   application/json
            },
            success: function (result) {
                console.log(result);
            }
        })
    }
    //稿件发布
    $("section .submit a.pub").click(function () {
        var content = editor.txt.text();
        var title = $title.val();
        var description = $description.val();
        var subtitle = $subtitle.val();
        var keywords = $keywords.val();
        var source = $source.val();
        var author = $author.val();
        var inputtime = new Date().toLocaleString();
        function checkeds(checkname) {
            var checkedarr = [];
            var checkedid = "";
            $(`input[name="${checkname}"]:checked`).each(function () {
                checkedarr.push($(this).prop("id"));
                checkedid = checkedarr.toString()
            })
            return checkedid;
        }
        var cate = checkeds("cate");
        var type = checkeds("type");
        var label = checkeds("label");
        if (title == "") {
            alert("标题不能为空")
            $title.addClass("warn")

        } else if (content == "") {
            alert("内容不能为空")
            $("section").animate({
                scrollTop: 500
            }, 500)
        }
        else if (cate == "") {
            alert("请选择栏目")
            $("#cate").parent().addClass("warn");
            var TOP = $("#cate").offset().top;
            $("section").animate({
                scrollTop: TOP
            }, 500)
        } else {
            $ajax("pub", { title, description, subtitle, keywords, thumb, content, cate, type, label, source, author, inputtime })
            alert("发布成功")
            window.location.href = "../public/content.html"
        }
    })
    //稿件存入草稿箱
    $("section .submit a.ts").click(function () {
        var content = editor.txt.text();
        var title = $title.val();
        var description = $description.val();
        var subtitle = $subtitle.val();
        var keywords = $keywords.val();
        var source = $source.val();
        var author = $author.val();
        var inputtime = new Date().toLocaleString();
        function checkeds(checkname) {
            var checkedarr = [];
            var checkedid = "";
            $(`input[name="${checkname}"]:checked`).each(function () {
                checkedarr.push($(this).prop("id"));
                checkedid = checkedarr.toString()
            })
            return checkedid;
        }
        var cate = checkeds("cate");
        var type = checkeds("type");
        var label = checkeds("label");
        if (title == "") {
            alert("标题不能为空")
            $title.addClass("warn")
        } else {
            $ajax("drafts", { title, description, subtitle, keywords, thumb, content, cate, type, label, source, author, inputtime })
            alert("保存成功")
            window.location.href = "../public/drafts.html"
        }
    })
})
