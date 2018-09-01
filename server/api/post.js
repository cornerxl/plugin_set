var express = require('express');
var fs=require('fs');

var routers_post = express.Router();
routers_post.post("/",function(req,res){
    var str=req.body.font;
    var tem=[];
    var s=`{\r\n"font":[\r\n`;
    tem=str.substr(0,str.length-1).split(",");
    //形成json文件
    tem.forEach(function(i){
        s+=`{"font":`+`"`+i+`"},`;
    });
    //去除最后一个","加上]}
    s=s.replace(/\,$/,"")+"]}";
    fs.writeFileSync('test.json',s);
    res.end(s);
});
module.exports=routers_post;