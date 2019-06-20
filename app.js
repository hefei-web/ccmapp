//引入express模块
const express = require("express");
//引入body-parser模块
const bodyParser = require("body-parser");
//引入路由器
const editRouter = require("./router/edit");
//创建web服务器
var server = express();
//监听端口
server.listen(8080);
//托管静态资源
server.use(express.static("public"));
//将post请求转换为对象
server.unsubscribe(bodyParser.urlencoded({
    extended: false
}))
//挂载路由
server.use("/edit", editRouter);