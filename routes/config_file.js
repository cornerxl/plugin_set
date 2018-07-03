var config = {
    /**
     *
     * @param obj
     * @param path
     */
    init: function(obj, path) {
        var fs = require("fs");
        var str_old = fs.readFileSync(path + '/css/page.css', 'utf-8');
        var me = this;
        var tem = Object.getOwnPropertyNames(obj);
        var config = [];
        var count = 0;
        for (var k in obj) {
            if (count !== 0) {
                config.push(';' + tem[count] + ':' + obj[k]);
            } else {
                config.push(tem[count] + ':' + obj[k]);
            }
            count++;
        }
        var str_start = str_old + '.a {';
        var str_end = '}';
        config.forEach(function(i) {
            str_start += i;
        });
        str_start += str_end;
        fs.writeFileSync(path + '/css/page.css', str_start, 'utf-8');
    }
};
module.exports = config;