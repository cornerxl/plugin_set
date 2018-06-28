var BASEURL = "/plugin_set";
var HTMLURL = BASEURL + "/public/view";
var JSURL = BASEURL + '/public/js';
var CSSURL = BASEURL + '/public/css';
(function () {
    DD.createModule({
        name: 'm_plugin_set',
        el: '.el-plugin-set',
        root: true,
        requires: [
            BASEURL + '/public/route/route.js',
        ],
        data: {
            active: true
        }
    });
    DD.createModule({
        name: 'm_index',
        templateUrl: HTMLURL + '/plugin_set.html',
        requires: [
            HTMLURL + '/home/home.js',
            HTMLURL + '/plugin_list/plugin_list.js',
            HTMLURL + '/plugin_download/plugin_download.js'
        ],
        data: {
            nav_list: [
                {
                    name: '首页',
                    path: '/route/home',
                    active: true
                },{
                    name: '插件列表',
                    path: '/route/plugin_list',
                    active: false
                },{
                    name: '配置并下载',
                    path: '/route/plugin_download',
                    active: false
                }
            ]
        },
    });
}());