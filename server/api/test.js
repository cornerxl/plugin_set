/**
 * Created by xll on 2018/6/28.
 */
var mysql = require('mysql');
var models = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/query', function (req, res, next) {
    var connection = mysql.createConnection(models.mysql);
    // 连接
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }
    });
    // 前台传给后台的参数  例子
    var condition = {
        'jsId': req.query.js_id,
        'jsPath': req.query.js_path
    };
    // 查询
    var sql = 'select * from js where js_id=? and js_path=?';
    var params = [condition.jsId, condition.jsPath];
    connection.query(sql, params, function (err, result) {
        res.send(result);
    });
    // 关闭
    connection.end();
});

module.exports = router;
