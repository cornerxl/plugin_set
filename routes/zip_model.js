var zip_model = {
    zip: function() {
        //随机数用来生成文件使用
        var random = ~~(Math.random() * 10000);
        var fs = require("fs");
        var path = '../plugin_set/public/plugin/';
        var archive = require('archiver');
        //生成压缩文件的地址
        var zipPath = path + 'plugin_down/' + random + '.zip';
        var output = fs.createWriteStream(zipPath);
        var zipar = archive('zip');
        //要压缩的文件
        zipar.directory(path+"/plugin_tem", '/');
        zipar.pipe(output);
        //压缩
        zipar.finalize();
        //返回路径;
        return zipPath;
    }
};
module.exports = zip_model;