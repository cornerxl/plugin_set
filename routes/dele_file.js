var dele = {
    /**
     * 删除的文件目录
     * @param path
     */
    dele: function(path) {
      var me=this;
        var fs = require('fs');
        var files = fs.readdirSync(path);
        files.forEach(function(file) {
            if (file.indexOf('.') !== -1)
                {fs.unlinkSync(path + '/' + file);}
              else{
                me.dele(path+"/"+file);
              }
        });
        fs.rmdirSync(path);
    }
};
module.exports = dele;