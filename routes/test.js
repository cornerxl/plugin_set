/**
 * Created by xll on 2018/6/28.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var module = require('db');
/* GET home page. */
router.get('/', function(req, res, next) {
    var sql = 'select * from js';
    var connect = mysql.createConnection(module.mysql);
    connect.connect();
    connect.query(sql,function (err, result) {
        res.send(result);
    })
});

module.exports = router;
