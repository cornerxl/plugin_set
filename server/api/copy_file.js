//由于各种原因可能导致压缩的文件夹存在故要在新建文件夹之前删掉
//加载删除模块
var dele = require('./dele_file');
var compLess = require('./less');
var copy = {
    //由于主模块要使用 故全部采用了同步读取和写入的方式
    /**
     * @param from 源文件目录
     * @param to   目标文件目录
     * @param isLess Less下载还是Css下载
     */
    copyFile: function(from, to, isLess) {
        var me = this;
        //创建文件夹
        me.fs.mkdirSync(to);
        //tem是读取文件夹下面的文件组成的一个数组
        var tem = me.fs.readdirSync(from);
        tem.forEach(function(item) {
            //如果是图片就特殊处理base64编码
            if (item.indexOf("js") === -1 && item.indexOf('css') === -1 && item.indexOf('html') === -1 && item.indexOf('less') === -1) {
                var str = me.fs.readFileSync(from + '/' + item, 'base64');
                me.fs.writeFileSync(to + '/' + item, str, 'base64');
            } else {
                if (isLess == 'true') {   //下载Less
                    if (item.indexOf('css') === -1) {
                        var str = me.fs.readFileSync(from + '/' + item, 'utf-8');
                        me.fs.writeFileSync(to + '/' + item, str);
                    }
                } else {   // 下载Css

                    if (item === 'index.less') {  //less文件编译
                        compLess.compileLess(from + '/index.less', to + '/index.css');
                    } else {
                        if(item.indexOf('less') === -1) {
                            var str = me.fs.readFileSync(from + '/' + item, 'utf-8');
                            me.fs.writeFileSync(to + '/' + item, str);
                        }
                    }
                }
            }
        });
    },
    /**
     * form 原路经,to 目的路径
     * @param from
     * @param to
     * @param isLess 下载Less还是Css
     * @returns {{name: *, file: (string|*)}}
     */
    init: function(from, to, isLess) {
        var me = this;
        //随机创建一个文件夹默认60个 如有需求可以改
        me.file_name = 'plugin' + new Date().getSeconds();
        me.fs = require("fs");
        var des_path = to + me.file_name;
        //如果文件夹已存在 先删除
        if (me.fs.existsSync(des_path)) {
            dele.dele(des_path);
        }
        //开始创建一个文件夹
        me.fs.mkdirSync(des_path);
        me.name = des_path;
        //插件下面的css.js.img文件夹
        var tem = me.fs.readdirSync(from);
        tem.forEach(function(i) {
            //如果发现是文件夹调用copyfile函数
            if (i.indexOf(".") === -1) {
                me.copyFile(from + '/' + i, des_path + '/' + i, isLess);
            } else {
                var str = me.fs.readFileSync(from + '/' + i, 'utf-8');
                me.fs.writeFileSync(des_path + '/' + i, str);
            }
        });
        //最后返回文件名字和路径名称
        return { name: me.name, file: me.file_name };
    }
};
module.exports = copy;