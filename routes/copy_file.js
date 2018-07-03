//由于各种原因可能导致压缩的文件夹存在故要在新建文件夹之前删掉
//加载删除模块
var dele = require('./dele_file');
var copy = {
    //由于主模块要使用 故全部采用了同步读取和写入的方式
    /**
     * @param from 源文件目录
     * @param to   目标文件目录
     */
    copyFile: function(from, to) {
        var me = this;
        me.fs.mkdirSync(to);
        var tem = me.fs.readdirSync(from);
        tem.forEach(function(item) {
            //如果是图片就特殊处理
            if (item.indexOf("js") === -1 || item.indexOf('css') === -1 || item.indexOf('html') === -1) {
                var str = me.fs.readFileSync(from + '/' + item, 'base64');
                me.fs.writeFileSync(to + '/' + item, str, 'base64');
            } else {
                var str = me.fs.readFileSync(from + '/' + item, 'utf-8');
                me.fs.writeFileSync(to + '/' + item, str);
            }
        });
    },
    init: function(from, to) {
        var me = this;
        me.fs = require("fs");
        var des_path = to + 'plugin';
        if (me.fs.existsSync(des_path)) {
            dele.dele(des_path);
        }
        me.fs.mkdirSync(des_path);
        me.name=des_path;
        var tem = me.fs.readdirSync(from);
        tem.forEach(function(i) {
            if (i.indexOf(".") === -1) {
                me.copyFile(from + '/' + i, des_path + '/' + i);
            } else {
                var str = me.fs.readFileSync(from + '/' + i, 'utf-8');
                me.fs.writeFileSync(des_path + '/' + i, str);
            }
        });
        return me.name;
    }
};
module.exports = copy;