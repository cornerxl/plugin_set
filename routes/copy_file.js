var copy = {
    //由于主模块要使用 故全部采用了同步读取和写入的方式
    copyFile: function(from, to) {
        var tem=['/index.js','/index.css',"/index.js",'/nodom-full.js','/index.html']；
        var fs = require("fs");
        var buffer=new Buffer(65535);
        var des_path=to+'plugin';
        fs.mkdirSync(des_path);
        tem.forEach(function(item,index,arr){
            var str=fs.readFileSync(from+item,'utf-8');
            fs.writeFileSync(des_path+item,str);
        });
    }
}
module.exports = copy;