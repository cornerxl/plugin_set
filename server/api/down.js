/**
 * Created by xll on 2018/6/28.
 */
var mysql = require('mysql');
var model = require('../db');
var express = require('express');
var router = express.Router();
//加载拷贝文件模块
var copy = require('./copy_file');
//加载配置样式和js模块
var config = require('./config_file');
//基础路径指向plugin
const tem_path = '../plugin_set/public/plugins/';
//加载压缩文件模块
var zip = require('./zip_model');
/* GET home page. */
router.get('/', function(req, res, next) {
    var connection = mysql.createConnection(model.mysql);
    //连接
    connection.connect(function(err) {
        if (err) {
            console.log(err);
        }
    });
    //前段传给后台的参数
    var plugin_id = req.query.plugin_id;
    var isLess = req.query.isLess;
    //查询
    var sql = 'select js_path from js where js_id=?';
    var js_id = plugin_id;
    var params = [js_id];
    connection.query(sql, params, function(err, result) {
        var plugin_name = JSON.parse(JSON.stringify(result))[0].js_path;
        //name是复制的文件的路径
        var copy_info = copy.init(tem_path + 'plugin_file/' + plugin_name, tem_path + 'plugin_tem/', isLess);
        //配置文件
        config.init(req.query, copy_info.name, plugin_name, isLess);
        //文件压缩并且发送
        var name = zip.zip(copy_info.file);
        //避免报错的情况,故return
        return res.send({
            result: true,
            name: name,
        });
    });
    //关闭
    connection.end();
});
module.exports = router;