var config = {
    /**
     *obj指req.query path是拷贝生成的文件路径，name是插件名字
     * 在这里 /r/n是生成的文件换行处理
     * @param obj
     * @param path
     * @param name
     */
    init: function (obj, path, name) {
        var me = this;
        var fs = require("fs");
        var str_old = fs.readFileSync(path + '/css/index' + '.css', 'utf-8');
        var str = '';
        for (var i = 0; i < parseInt(obj.total); i++) {
            var tem = [];
            var object = JSON.parse(obj["class" + i]);
            for (var j in object) {
                if (typeof object[j] === "object") {
                    var add_str = "";
                    if (object[j].names.indexOf("color") !== -1)
                        add_str = "#";
                    tem.push("  " + object[j].names + ":" + add_str + object[j].values + '!important;\r\n');
                }
            }
            str += me.config(object.names, tem);
        }
        fs.writeFileSync(path + '/css/' + "index" + '.css', str + str_old, 'utf-8');
        //flag为1代表有js数据需要修改,0代表没有需要修改
        if (JSON.parse(obj.flag) === 1) {
            me.jsconfig(obj, path, "index");
        }
    },
    /**
     *
     * @param class_name
     * @param arr
     * @returns {string}
     */
    config: function (class_name, arr) {
        var str_start = class_name + '\r\n{\r\n';
        var str_end = '}\r\n';
        arr.forEach(function (i) {
            str_start += i;
        });
        str_start += str_end;
        return str_start;
    },
    /**
     * js文件最后写在windoow.data下面
     * @param obj 传来的req.query
     * @param path
     * @param name
     */
    jsconfig: function (obj, path, name) {
        var me = this;
        var fs = require("fs");
        var str_old = fs.readFileSync(path + '/js/' + name + '.js', 'utf-8');
        var object = JSON.parse(obj["js"]);
        var tem = [];
        for (var k in object) {

            if (k.indexOf("color") !== -1) {

                tem.push("    " + k + ":'#" + object[k] + "',\r\n");
            }else{
                tem.push("    " + k + ':' +  + object[k] + ',\r\n');
            }

        }
        var str = 'window.data={\r\n';
        tem.forEach(function (i) {
            str += i;
        });
        str += '};\r\n';
        fs.writeFileSync(path + '/js/' + name + '.js', str + str_old, 'utf-8');
    }
};
module.exports = config;