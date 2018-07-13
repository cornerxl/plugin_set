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
            hasCreated:false,
            plugin_list: [
                {
                    name: "分页",
                    path: "/route/plugin_list/pages",
                    active: true,
                    plugins: [{
                        plugin_name: "plugin_01001",
                        plugin_explain: "本插件是第一个分页插件",
                        data: {
                            page: 1,
                            row: 10,
                            total: 0,
                            to_page: 1,
                            allpage: 0,
                        }
                    },{
                        plugin_name: "plugin_01002",
                        plugin_explain: "本插件是第二个分页插件",
                        data: {
                            page: {
                                pre_page: 1,
                                go_page:1,
                                all_page:100,
                                page_rows: []
                            }
                        }
                    }]
                }, {
                    name: "开关",
                    path: "/route/plugin_list/switcher",
                    active: false,
                    plugins: []
                }, {
                    name: "缓冲",
                    path: "/route/plugin_list/calendar",
                    active: false,
                    plugins: []
                }, {
                    name: "折叠",
                    path: "/route/plugin_list/fold",
                    active: false,
                    plugins: []
                }, {
                    name: "自动补全",
                    path: "/route/plugin_list/auto-complete",
                    active: false,
                    plugins: []
                }, {
                    name: "地址",
                    path: "/route/plugin_list/address",
                    active: false,
                    plugins: []
                }, {
                    name: "进度条",
                    path: "/route/plugin_list/ProgressBar",
                    active: false,
                    plugins: []
                }, {
                    name: "轮播图",
                    path: "/route/plugin_list/carousel",
                    active: false,
                    plugins: []
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
            }, {
                type: 'css',
                path: PLUGINURL + '/page1/css/page1.css'
            },
            {
                type: 'js',
                path: PLUGINURL + '/page1/js/page1.js'
            }],
        onBeforeFirstRender: function () {
            var me = this;
            me.data.plugin_list.forEach(function (item) {
                item.active = DD.Router.currentPath === item.path
            });
            me.module.methodFactory.methods.createModules.call(me);
        },
        methods: {
            createModules: function () {
                var me = this;
                console.log(DD);
                if(me.data.hasCreated){
                    return ;
                }
                for (var i = 0; i < me.data.plugin_list.length; i++) {
                    for (var j = 0; j < me.data.plugin_list[i].plugins.length; j++) {
                        DD.createModule({
                            name: me.data.plugin_list[i].plugins[j].plugin_name,
                            el: ".el-" + me.data.plugin_list[i].plugins[j].plugin_name,
                            data: me.data.plugin_list[i].plugins[j].data
                        })
                    }
                }
                me.data.hasCreated=true;
            }
        }
    });
}());