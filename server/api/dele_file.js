var dele = {
    /**
     * 删除的文件目录
     * @param path文件夹类型的参数
     */
    dele: function(path) {
        var me = this;
        var fs = require('fs');
        //files是path下面的文件集合形成的数组
        var files = fs.readdirSync(path);
        files.forEach(function(file) {
            //不是文件夹
            if (file.indexOf('.') !== -1) {
                fs.unlinkSync(path + '/' + file);
            } else {
                //文件夹类型就递归调用dele
                me.dele(path + "/" + file);
            }
        });
        fs.rmdirSync(path);
    }
};
module.exports = dele;