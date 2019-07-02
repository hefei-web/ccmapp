//引入express模块
const express = require("express");
//引入连接池
const pool = require("../pool");
//创建路由器对象
var router = express.Router();
//添加路由

//获取草稿箱文章列表
router.get("/drfts", (req, res) => {
    var sql =  "SELECT * FROM `ccmit_drafts` ORDER BY `ccmit_drafts`.`id` DESC";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        //console.log(result)
        res.send(result);
    })
})
//获取已发布文章列表
router.get("/news", (req, res) => {
    var sql =  "SELECT * FROM `ccmit_news` ORDER BY `ccmit_news`.`id` DESC";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);

    })
})
//图集列表
router.get("/picnews", (req, res) => {
    var sql = "SELECT * FROM `ccmit_news` ORDER BY `ccmit_news`.`id` DESC";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);

    })
})
//用户登录
router.get("/login", (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    console.log(username,password)
    pool.query("select * from ccmit_admin where username=? and password=?", [username,password], function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            res.send({code:1,result});
        }else{
            res.send({code:-1,msg:"登录失败"});
        }
    })
})
//查询用户名
router.get("/user", (req, res) => {
    var userid = req.query.lid;
    console.log(userid)
    var sql = `select * from ccmit_admin where userid = ?`;
    pool.query(sql,[userid], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(result);
    })
})

//获取栏目列表
router.get("/cate", (req, res) => {
    var sql = `select * from ccmit_category`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//获取评论信息
router.get("/comment", (req, res) => {
    var sql = `select * from ccmit_comment`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//删除草稿箱内容
router.get("/deleDrfts", (req, res) => {
    var lid = req.query.lid;
    console.log(lid)
    var sql =  `DELETE FROM ccmit_drafts WHERE id = ?`;
    pool.query(sql,[lid],(err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(result);
    })
})

//删除已发稿件
router.get("/delenews", (req, res) => {
    var lid = req.query.lid;
    console.log(lid)
    var sql =  `DELETE FROM ccmit_news WHERE id = ?`;
    pool.query(sql,[lid],(err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(result);
    })
})

//删除栏目
router.get("/deleColumn", (req, res) => {
    var lid = req.query.lid;
    console.log(lid)
    var sql =  `DELETE FROM ccmit_category WHERE id = ?`;
    pool.query(sql,[lid],(err, result) => {
        if (err) throw err;
        console.log(result)
        res.send(result);
    })
})

//导出路由器对象
module.exports = router;