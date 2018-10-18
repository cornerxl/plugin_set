var config = {
    /**
     *obj指req.query path是拷贝生成的文件路径，name是插件名字
     * 在这里 /r/n是生成的文件换行处理
     * @param obj
     * @param path 基础路径
     * @param name 文件名字
     * @param isLess Less下载还是Css下载
     */
    init: function(obj, path, name, isLess) {
        var me = this;
        var fs = require("fs");
        // var str_old = fs.readFileSync(path + '/css/index.css', 'utf-8');
        // var str = '';
        // //class从class0开始 使用tatal计算数量
        // for (var i = 0; i < parseInt(obj.total); i++) {
        //     //tem为键值对组成的数组
        //     var tem = [];
        //     var object = JSON.parse(obj["class" + i]);
        //     for (var j in object) {
        //         if (typeof object[j] === "object") {
        //             var add_str = "";
        //             //前端传递#会down掉 只要key检测出了color就加上#
        //             if (object[j].names.indexOf("color") !== -1)
        //                 add_str = "#";
        //             tem.push("  " + object[j].names + ":" + add_str + object[j].values + '!important;\r\n');
        //         }
        //     }
        //     //str累加
        //     str += me.config(object.names, tem);
        // }
        // //由于css存在覆盖问题,故将新形成的class放在前面
        // fs.writeFileSync(path + '/css/index.css', str + str_old, 'utf-8');
        if(isLess == 'true') {
            var str_html_old = fs.readFileSync(path + '/index.html', 'utf-8');
            var str = str_html_old;
            if(str_html_old.indexOf('<link rel="stylesheet" href="css/index.css">') > -1) {
                str = str_html_old.replace('<link rel="stylesheet" href="css/index.css">', '<link rel="stylesheet/less" href="css/index.less"><script type="text/javascript" src="js/less.min.js"></script>');
            }
            fs.writeFileSync(path + '/index.html', str, 'utf-8');
        } else {
            var str_html_old = fs.readFileSync(path + '/index.html', 'utf-8');
            var str = str_html_old;
            if(str_html_old.indexOf('<link rel="stylesheet/less" href="css/index.less">') > -1) {
                str = str_html_old.replace('<link rel="stylesheet/less" href="css/index.less">', '<link rel="stylesheet" href="css/index.css">');
                str = str.replace('<script type="text/javascript" src="js/less.min.js"></script>', '');
            }
            fs.writeFileSync(path + '/index.html', str, 'utf-8');
        }
        //flag为1代表有js数据需要修改,0代表没有需要修改
        if (JSON.parse(obj.flag) === 1) {
            me.jsconfig(obj, path, "index");
        }
    },
    /**
     *
     * @param class_name
     * @param arr
     * @returns str_start 为读取的get形成的字符串
     */
    config: function(class_name, arr) {
        var str_start = class_name + '\r\n{\r\n';
        var str_end = '}\r\n';
        arr.forEach(function(i) {
            str_start += i;
        });
        str_start += str_end;
        return str_start;
    },
    /**
     * js文件最后写在window.data下面
     * @param obj 传来的req.query
     * @param path
     * @param name
     */
    jsconfig: function(obj, path, name) {
        var me = this;
        var fs = require("fs");
        var str_old = fs.readFileSync(path + '/js/' + name + '.js', 'utf-8');
        var object = JSON.parse(obj["js"]);
        var tem = [];
        for (var k in object) {
            if (k.indexOf("color") !== -1 || k.indexOf("Color") !== -1) {
                tem.push("    " + k + ":'#" + object[k] + "',\r\n");
            } else {
                if (k.indexOf("legend")!==-1||(object[k]+"").indexOf("rgba")!==-1||(object[k]+"").indexOf("rgb")!==-1) {
                    tem.push("    " + k + ":'" + object[k] + "',\r\n");
                } else {
                    if (!object[k]) {
                        tem.push("    " + k + ":'',\r\n");
                    } else {
                        tem.push("    " + k + ':' + object[k] + ',\r\n');
                    }
                }
            }
        }
        var str = 'window.data={\r\n';
        tem.forEach(function(i) {
            str += i;
        });
        str += '};\r\n';
        fs.writeFileSync(path + '/js/' + name + '.js', str + str_old, 'utf-8');
    }
};
module.exports = config;