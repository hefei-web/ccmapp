//引入express模块
const express = require("express");
const formidable = require('formidable');
const fs = require('fs');
//引入连接池
const pool = require("../pool");
//创建路由器对象
var router = express.Router();
//添加路由

//获取栏目列表
router.get("/cate", (req, res) => {
    var sql = `select * from ccmit_category`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
//获取分类信息
router.get("/type", (req, res) => {
    var sql = `select * from ccmit_type`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
//获取标签信息
router.get("/label", (req, res) => {
    var sql = `select * from ccmit_label`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//稿件发布
router.post("/pub", (req, res) => {
    var obj = req.body;
    pool.query("INSERT INTO ccmit_news SET ?", [obj], function (err, result) {
        if (err) throw err;
        console.log(result)
        if (result.affectedRows == 1) {
            res.send("发布成功")
        }
    })
})
//存入草稿箱
router.post("/drafts", (req, res) => {
    var obj = req.body;
    pool.query("INSERT INTO ccmit_drafts SET ?", [obj], function (err, result) {
        if (err) throw err;
        console.log(result)
        if (result.affectedRows == 1) {
            res.send("保存成功")
        }
    })
})
//编辑稿件
router.get("/edit", (req, res) => {
    var id=req.query.lid;
    console.log(id)
    var sql = `select * from ccmit_news where id = ?`;
    pool.query(sql,[id], (err, result) => {
        console.log(result)
        if (err) throw err;
        res.send(result);
    })
})
//编辑草稿
router.get("/editdrafts", (req, res) => {
    var id=req.query.lid;
    console.log(id)
    var sql = `select * from ccmit_drafts where id = ?`;
    pool.query(sql,[id], (err, result) => {
        console.log(result)
        if (err) throw err;
        res.send(result);
    })
})


//图片上传

router.post('/uploadImg', function (req, res, next) {
    let form = new formidable.IncomingForm();
    let dir = "./uploadImgs/";
    form.uploadDir = dir;
    form.parse(req, function (err, fields, files) {
        let oldPath = files.myFileName.path; //fileName就是我们刚在前台模板里面配置的后台接受的名称；
        let extname = files.myFileName.name; //获取图片名称
        //新的路径由组成：原父路径 + 拓展名
        let newPath = dir + extname;
        //改名把之前存的图片换成真的图片的完整路径
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                res.send({ isOk: false, err });
            } else {
                let resPath = newPath.replace("./uploadImgs", "http://127.0.0.1:8080"); //处理图片路径  让前端能访问
                console.log(resPath)
                res.send({ isOk: true, data: [resPath] }) //返回图片路径
            }
        });
    })
}); 

/* 
// 文件将要上传到哪个文件夹下面
var uploadfolderpath = 'uploadImgs';
router.post("/uploadImg", function (req, res) {
    var reqMethod = req.method.toLowerCase();
    // ----------------------用 '/upload' 这个路由来处理文件上传----------------------
    if (reqMethod === 'post' || reqMethod === 'options') {
        // ----- 情况1：跨域时，先发送一个options请求，此处要返回200 -----
        if (reqMethod === 'options') {
            console.log('options 请求时，返回 200');
            // 返回结果
            res.send('options OK');
            return;
        } else {
            // ----- 情况2：发送post请求，上传图片 -----
            console.log('定位到 /uploadImgs 路由');
            // 使用第三方的 formidable 插件初始化一个 form 对象
            var form = new formidable.IncomingForm();
            let dir = "./uploadImgs/";
            form.uploadDir = dir;
            form.parse(req, function (err, fields, files) {
                if (err) {
                    return console.log('formidable, form.parse err');
                }
                console.log('formidable, form.parse ok');
                var item;
                // 计算 files 长度
                var length = 0;
                for (item in files) {
                    length++;
                }
                if (length === 0) {
                    console.log('files no data');
                    return;
                }

                for (item in files) {
                    var file = files[item];
                    // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
                    var tempfilepath = file.path;
                    // 获取文件类型
                    var type = file.type;
                    console.log(type);
                    // 获取文件名，并根据文件名获取扩展名
                    var filename = file.name;
                    var extname = filename.lastIndexOf('.') >= 0
                        ? filename.slice(filename.lastIndexOf('.') - filename.length)
                        : '';
                    console.log(filename);
                    // 文件名没有扩展名时候，则从文件类型中取扩展名
                    if (extname === '' && type.indexOf('/') >= 0) {
                        extname = '.' + type.split('/')[1];
                    }
                    // 将文件名重新赋值为一个随机数（避免文件重名）
                    filename = Math.random().toString().slice(2) + extname;
                    console.log(filename);
                    // 构建将要存储的文件的路径
                    var filenewpath = uploadfolderpath + '/' + filename;
                    console.log(filenewpath);
                    // 将临时文件保存为正式的文件
                    fs.rename(tempfilepath, filenewpath, function (err) {
                        // 存储结果
                        var result = '';

                        if (err) {
                            // 发生错误
                            console.log('fs.rename err');
                            result = 'error|save error';
                        } else {
                            // 保存成功
                            console.log('fs.rename done');
                            // 拼接图片url地址
                            result = 'http://127.0.0.1:8080' + '/' + filename;
                            console.log(result);
                        }
                        // 返回结果
                        res.send({ isOk: true, data: [result] })
                        console.log(result);
                    });
                }
            });
        }
    }
}); */

//保存图片地址


//导出路由器对象
module.exports = router;