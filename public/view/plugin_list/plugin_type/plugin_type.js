/**
 * @author cfx
 * @date 2018/7/6
 * @Description:按分类展示插件
 */
var PLUGINURL = BASEURL + "/public/plugins";

(function () {
    DD.createModule({
        name: "m_plugin_type",
        el: '.el-plugin-type',
        templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
        data: {
            plugin_list: [
                {
                    name: "分页",
                    path: "/route/plugin_list/pages",
                    active: true,
                    plugins: [{
                        plugin_name: "paging"
                    }]
                }, {
                    name: "开关",
                    path: "/route/plugin_list/switcher",
                    active: false
                }, {
                    name: "缓冲",
                    path: "/route/plugin_list/calendar",
                    active: false
                }, {
                    name: "折叠",
                    path: "/route/plugin_list/fold",
                    active: false
                }, {
                    name: "自动补全",
                    path: "/route/plugin_list/auto-complete",
                    active: false
                }, {
                    name: "地址",
                    path: "/route/plugin_list/address",
                    active: false
                }, {
                    name: "进度条",
                    path: "/route/plugin_list/ProgressBar",
                    active: false
                }, {
                    name: "轮播图",
                    path: "/route/plugin_list/carousel",
                    active: false
                }
            ],
        },
        requires: [
            {
                type: 'css',
                path: PLUGINURL + '/page/css/page.css'
            },
            {
                type: 'js',
                path: PLUGINURL + '/page/js/paging.js'
            }],
        // requires:[PLUGINURL+'/page/js/paging.js'],
        onBeforeFirstRender: function () {
            var me = this;
            me.data.plugin_list.forEach(function (item) {
                item.active = DD.Router.currentPath === item.path
            });
        }
    });
}());