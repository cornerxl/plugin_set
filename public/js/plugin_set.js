var BASEURL = "/plugin_set";
var HTMLURL = BASEURL + "/public/view";
var JSURL = BASEURL + '/public/js';
var CSSURL = BASEURL + '/public/css';
(function() {
    //最开始动画效果
    DD.createModule({
        name:"m_home_loading",
        el: '.el-loading',
        template: `<div class="nd-plugin-loading-2" x-show="show">
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
</div>`,
        onBeforeFirstRender: function() {
            var me = this;
            me.data.show = true;
        },
        onReceive: function (){
            var me = this;
            me.data.show = false;
        },
        data: {
            show: true
        }
    });
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
            nav_list: [{
                name: '首页',
                path: '/route/home',
                active: true
            }, {
                name: '插件列表',
                path: '/route/plugin_list',
                active: false
            }, {
                name: '配置并下载',
                path: '/route/plugin_download',
                active: false
            }],
            img_log: '',
        },
        onBeforeFirstRender: function() {
            var me = this;
            var params = {
                id_1: 1001,
                id_2: 1001,
            };
            DD.request({
                params: params,
                rand: true,
                url: "http://localhost:3000/api/imgs?",
                successFunc: function(r) {
                    var imgs = JSON.parse(r);
                    me.data.img_log = imgs[0].img_path;
                }
            });
        }
    });
}());