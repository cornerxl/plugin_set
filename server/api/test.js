/**
 * Created by xll on 2018/6/28.
 */
var mysql = require('mysql');
var models = require('../db');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var sql = 'select * from js';
    var connect = mysql.createConnection(models.mysql);
    connect.connect();
    connect.query(sql, function (err, result) {
        res.send(result);
    })
});

module.exports = router;
