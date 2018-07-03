var dele = {
    /**
     * 删除的文件目录
     * @param path
     */
    dele: function(path) {
        var fs = require('fs');
           var files = fs.readdirSync(path);
           files.forEach(function(file){
           	fs.unlinkSync(path+'/'+file);
           });
           fs.rmdirSync(path);
    }
};
module.exports=dele;