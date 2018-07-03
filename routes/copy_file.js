//由于各种原因可能导致压缩的文件夹存在故要在新建文件夹之前删掉
//加载删除模块
var dele=require('./dele_file');
var copy = {
    //由于主模块要使用 故全部采用了同步读取和写入的方式
    /**
     *
     * @param from 源文件目录
     * @param to   目标文件目录
     */
    copyFile: function(from, to) {
        var tem=['/index.js','/index.css',"/index.js",'/nodom-full.js','/index.html'];
        var fs = require("fs");
        var des_path=to+'plugin';
        if(fs.existsSync(des_path)){
            dele.dele(des_path);
        }
        fs.mkdirSync(des_path);
        tem.forEach(function(item){
            var str=fs.readFileSync(from+item,'utf-8');
            fs.writeFileSync(des_path+item,str);
        });
        //由于太慢了所以返回一个值
        return true;
    }
};
module.exports = copy;