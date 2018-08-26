var mysql = require('mysql');
var model = require('../db');
var express = require('express');
var routers = express.Router();
routers.get("/", function(req, res, next) {
    var id = req.query;
    var connection = mysql.createConnection(model.mysql);
    //连接
    connection.connect(function(err) {
        if (err) {
            console.log("img_err");
        }
    });
    var sql = 'select img_path from img where img_id>?&&img_id<?'; 
    var params = [];
    for (var k in id) {
        //由于304缓存的原因加了$rand剔除$rand
        if (k.indexOf("$") === -1) {
        	params.push(parseInt(id[k]));
        }
    }
    if(params.length===1){
    	params.push(params[0]);
    }
    params[0]-=1;
    params[1]+=1;
    connection.query(sql, params, function(err, result) {
        var arr = JSON.parse(JSON.stringify(result));
        res.send(arr);
    });
    connection.end();
});
module.exports = routers;