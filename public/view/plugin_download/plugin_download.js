/**
 * Created by xll on 2018/6/28.
 */
(function() {
    DD.createModule({
        name: 'm_plugin_download',
        el: '.el-downlist',
        templateUrl: HTMLURL + '/plugin_download/plugin_download.html',
        requires: [
            HTMLURL + '/plugin_download/carouse_1/js/index.js',
            HTMLURL + '/plugin_download/carouse_2/js/index.js',
            HTMLURL + '/plugin_download/carouse_3/js/index.js',
            HTMLURL + '/plugin_download/carouse_4/js/index.js',
            HTMLURL + '/plugin_download/magn_1/js/index.js',
            HTMLURL + '/plugin_download/switcher_1/js/index.js',
            HTMLURL + '/plugin_download/switcher_2/js/index.js',
            HTMLURL + '/plugin_download/switcher_3/js/index.js',
            HTMLURL + '/plugin_download/table_1/js/index.js',
            HTMLURL + '/plugin_download/progress_1/js/index.js',
            HTMLURL + '/plugin_download/progress_2/js/index.js',
            HTMLURL + '/plugin_download/inputAuto_1/js/index.js',
            HTMLURL + '/plugin_download/animation_1/js/index.js',
            HTMLURL + '/plugin_download/animation_2/js/index.js',
            HTMLURL + '/plugin_download/animation_3/js/index.js',
            HTMLURL + '/plugin_download/animation_4/js/index.js',
            HTMLURL + '/plugin_download/animation_5/js/index.js',
            HTMLURL + '/plugin_download/foldCollapse_1/js/index.js',
            HTMLURL + '/plugin_download/location_1/js/index.js',
            HTMLURL + '/plugin_download/dateInput_1/js/index.js',
            HTMLURL + '/plugin_download/dateInput_2/js/index.js',
            HTMLURL + '/plugin_download/page_1/js/index.js',
            HTMLURL + '/plugin_download/page_2/js/index.js',
            HTMLURL + '/plugin_download/checkbox_1/js/index.js',
            HTMLURL + '/plugin_download/checkbox_2/js/index.js',
            HTMLURL + '/plugin_download/button_1/js/index.js',
            HTMLURL + '/plugin_download/icon_1/js/index.js',

        ],
        data: {
            public_path: '/plugin_set/public/plugins/plugin_down/',
            down: false,
            src: '',
            name: '',
            route_height: '',
            first_type: [{
                    first_name: '轮播图',
                    show: false,
                    plugin: [{ name: '常用轮播图', route: "/route/plugin_download/Carousel_1", active: false }, { name: "水平旋转", route: "/route/plugin_download/Carousel_2", active: false }, { name: '垂直轮播图', route: "/route/plugin_download/Carousel_3", active: false }, { name: '3d轮播图', route: "/route/plugin_download/Carousel_4", active: false }]
                }, {
                    first_name: '放大镜',
                    show: false,
                    plugin: [{ name: '高清版本', route: "/route/plugin_download/Magn_1", active: false }]
                }, {
                    first_name: '开关',
                    show: false,
                    plugin: [{ name: '3D按钮开关', route: "/route/plugin_download/Switch_3" }, { name: '3D开关', route: "/route/plugin_download/Switch_2" }, { name: "普通开关", route: "/route/plugin_download/Switch_1" }]
                }, {
                    first_name: '表格',
                    show: false,
                    plugin: [{ name: '多用表格', route: "/route/plugin_download/Table_1", active: false }]
                }, {
                    first_name: '进度条',
                    show: false,
                    plugin: [{ name: '普通', route: "/route/plugin_download/Progress_2", activ: false }, { name: "多功能", route: "/route/plugin_download/Progress_1" }]
                }, {
                    first_name: '地址',
                    show: false,
                    plugin: [{ name: '多用地址', route: "/route/plugin_download/Location_1" }]
                }, {
                    first_name: "自动补全",
                    show: false,
                    plugin: [{ name: '多用补全', route: "/route/plugin_download/Complete_1" }]
                }, {
                    first_name: '折叠',
                    show: false,
                    plugin: [{ name: '普通折叠', route: "/route/plugin_download/foldCollapse_1" }]
                }, {
                    first_name: '过渡动画',
                    show: false,
                    plugin: [{ name: '泡泡动画', route: "/route/plugin_download/Animation_1" }, { name: '方块动画', route: "/route/plugin_download/Animation_2" }, { name: '圆环动画', route: "/route/plugin_download/Animation_3" }, { name: '闪烁动画', route: "/route/plugin_download/Animation_4" },{ name: '水滴动画', route: "/route/plugin_download/Animation_5"}]
                }, {
                    first_name: '日期',
                    show: false,
                    plugin: [{ name: "星期", route: "/route/plugin_download/Date_1" }, { name: "年月日", route: "/route/plugin_download/Date_2" }]
                },
                {
                    first_name: '分页',
                    show: false,
                    plugin: [{ name: "常见", route: "/route/plugin_download/Page_1" }, { name: "酷炫", route: "/route/plugin_download/Page_2" }]
                },
                {
                    first_name: '选择框',
                    show: false,
                    plugin: [{ name: "常见", route: "/route/plugin_download/Checkbox_1" },{ name: "酷炫", route: "/route/plugin_download/Checkbox_2" }]
                },
                {
                    first_name: '按钮',
                    show: false,
                    plugin: [{ name: "按钮列表", route: "/route/plugin_download/Button_1" }]
                },
                {
                    first_name: '图标库',
                    show: false,
                    plugin: [{ name: "图标列表", route: "/route/plugin_download/Icon_1" }]
                }
            ]
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.route_height = window.innerHeight - 80;
        },
        onRender: function() {},
        onReceive: function(m, data) {
            var me = this;
            if (m === 'm_plugin_download_Carousel_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Carousel_2') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Carousel_3') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Carousel_4') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Magn_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Switch_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Switch_2') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Switch_3') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Progress_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
             if (m === 'm_plugin_download_Progress_2') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Animation_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Animation_2') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Animation_3') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Animation_4') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Animation_5') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Location_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Date_2') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Date_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Page_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Page_2') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_foldCollapse_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Complete_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Checkbox_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Checkbox_2') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
             if (m === 'm_plugin_download_Button_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Icon_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }

        },
        methods: {
            routeItem: function(e, data, view) {
                var me = this;
                var tem = !data.show;
                me.data.first_type.forEach(function(i) {
                    i.show = false;
                });
                data.show = tem;
            },
            getName: function(e, data, view) {
                var me = this;
                me.data.name = data.name;
            },
            close: function() {
                var me = this;
                me.data.down = false;
            },
            upload: function(data) {
                var me = this;
                //下载url
                DD.request({
                    params: data,
                    url: "http://localhost:3000/api/down?",
                    successFunc: function(r) {
                        var name = JSON.parse(r).name;
                        me.data.down = true;
                        me.data.src = me.data.public_path + name.split("/")[name.split('/').length - 1];
                    }
                });
            }
        }
    });
}())