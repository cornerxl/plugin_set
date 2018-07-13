var zip_model = {
    zip: function(name) {
        //随机数用来生成文件使用
        var random = ~~(Math.random() * 10000);
        var fs = require("fs");
        var path = '../plugin_set/public/plugins/';
        var archive = require('archiver');
        //生成压缩文件的地址
        var zipPath = path + 'plugin_down/' + name + '.zip';
        var output = fs.createWriteStream(zipPath);
        var zipar = archive('zip');
        //要压缩的文件为plugin_tem+name文件夹
        zipar.directory(path+"/plugin_tem/"+name, '/');
        zipar.pipe(output);
        //压缩
        zipar.finalize();
        //返回路径;
        return zipPath;
    }
};
module.exports = zip_model;