var mysql = require('mysql');
var model = require('../db');
var express = require('express');
var fs=require("fs");
var routers_json = express.Router();
routers_json.get("/", function(req, res, next) {
    var connection = mysql.createConnection(model.mysql);
    //连接
    connection.connect(function(err) {
        if (err) {
            console.log(err);
        }
    });
    var sql = 'select json_path from json where json_name=?';
    var json_name=req.query.name;
    var params = [json_name];
    connection.query(sql, params, function(err, result) {
       var str=JSON.parse(JSON.stringify(result));
       str=str[0]["json_path"];
        var str_r=fs.readFileSync("../"+str,"utf-8");
        return res.send({
            result: true,
            font:JSON.parse(str_r)
        });
    });
    //关闭
    connection.end();
});
module.exports=routers_json;