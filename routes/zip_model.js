var zip_model = {
    zip: function() {
        //随机数用来生成文件使用
        var random = ~~(Math.random() * 10000);
        var fs = require("fs");
        var path = '../plugin_set/public/plugin/';
        var archive = require('archiver');
        var zipPath = path + 'plugin_down/plugin' + random + '.zip';
        var output = fs.createWriteStream(zipPath);
        var zipar = archive('zip');
        zipar.directory(path+"/plugin_tem", '/');
        zipar.pipe(output);
        zipar.finalize();
        return zipPath;
    }
};
module.exports = zip_model;