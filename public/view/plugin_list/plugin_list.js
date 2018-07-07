/**
 * Created by xll on 2018/6/28.
 * 插件列表
 */
(function () {
    DD.createModule({
        name: 'm_plugin_list',
        el: '.el-plugin-list',
        templateUrl: HTMLURL + '/plugin_list/plugin_list.html',
        requires: [HTMLURL + '/plugin_list/plugin_type/plugin_type.js'],
        data: {
            plugin_list: [
                {
                    name: "分页",
                    path: "/route/plugin_list/pages",
                    active: true
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
            ]
        },
        onBeforeFirstRender: function () {
            var me = this;
            // me.data.plugin_list.forEach(function (item) {
            //     item.active=false;
            // })
        }
    })
}())
