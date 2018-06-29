/**
 * Created by xll on 2018/6/28.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connect = mysql.createConnection({
    host     : '10.10.4.162',
    user     : 'root',
    password : 'xll',
    port: '3306',
    database: 'plugin'
});
/* GET home page. */
router.get('/', function(req, res, next) {
    var sql = 'select * from js';
    connect.query(sql,function (err, result) {
        res.send(result);
    })
});

module.exports = router;
