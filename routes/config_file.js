var config = {
    /**
     *
     * @param obj
     * @param path
     * @param class_str
     */
    init: function(obj, path, class_str,name) {
        var me = this;
        var fs = require("fs");
        var str_old = fs.readFileSync(path + '/css/'+name+'.css', 'utf-8');
        var tem = Object.getOwnPropertyNames(obj);
        var config = [];
        var count = 0;
        for (var k in obj) {
            config.push(tem[count] + ':' + obj[k] + ';');
            count++;
        }
        var str_start = str_old + class_str + '{';
        var str_end = '}';
        config.forEach(function(i) {
            str_start += i;
        });
        str_start += str_end;
        fs.writeFileSync(path + '/css/'+name+'.css', str_start, 'utf-8');
    }
};
module.exports = config;