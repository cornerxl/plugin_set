/**
 * Created by xll on 2018/6/28.
 * 插件列表
 */
(function () {
    DD.createModule({
        name: 'm_plugin_list',
        el: '.el-plugin-list',
        templateUrl: HTMLURL + '/plugin_list/plugin_list.html',
        requires: [HTMLURL + '/plugin_list/plugin_type/plugin_type.js', HTMLURL + '/plugin_list/plugin_instruction/plugin_instruction.js'],
        data: {
            plugin_list: [
                {
                    name: "插件使用说明",
                    path: "/route/plugin_list/instruction",
                    active: true
                },{
                    name: "地址",
                    path: "/route/plugin_list/address",
                    active: false
                },{
                    name: "缓冲",
                    path: "/route/plugin_list/buffering",
                    active: false
                }, {
                    name: "轮播图",
                    path: "/route/plugin_list/carousel",
                    active: false
                }, {
                    name: "选择框",
                    path: "/route/plugin_list/checkBox",
                    active: false
                }, {
                    name: "颜色选择",
                    path: "/route/plugin_list/colorPicker",
                    active: false
                }, {
                    name: "日期选择",
                    path: "/route/plugin_list/dateInput",
                    active: false
                }, {
                    name: "折叠",
                    path: "/route/plugin_list/foldCollapse",
                    active: false
                }, {
                    name: "图片放大",
                    path: "/route/plugin_list/imgShow",
                    active: false
                }, {
                    name: "自动补全",
                    path: "/route/plugin_list/inputAuto",
                    active: false
                }, {
                    name: "分页",
                    path: "/route/plugin_list/paging",
                    active: false
                }, {
                    name: "进度条",
                    path: "/route/plugin_list/progress",
                    active: false
                }, {
                    name: "滑动菜单",
                    path: "/route/plugin_list/slideImg",
                    active: false
                }, {
                    name: "开关",
                    path: "/route/plugin_list/switcher",
                    active: false
                }, {
                    name: "表格",
                    path: "/route/plugin_list/table",
                    active: false
                }, {
                    name: "菜单树",
                    path: "/route/plugin_list/tree",
                    active: false
                }
            ]
        },
        onBeforeFirstRender: function () {
            var me = this;
            me.data.plugin_list.forEach(function (item) {
                item.active = false;
            });
            me.data.plugin_list[0].active = true;
        }
    })
}())
