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
            HTMLURL + '/plugin_download/Magn_1/js/index.js',
            HTMLURL + '/plugin_download/switcher_1/js/index.js',
            HTMLURL + '/plugin_download/switcher_2/js/index.js',
            HTMLURL + '/plugin_download/switcher_3/js/index.js',
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
                plugin: [{ name: '3D开关', route: "/route/plugin_download/Switch_3" },{ name: '3D开关', route: "/route/plugin_download/Switch_2" }, { name: "普通开关", route: "/route/plugin_download/Switch_1" }]
            }, {
                first_name: '表格',
                show: false,
                plugin: [{ name: '多用表格', route: "/plugin_download/Boot_1" }]
            }, {
                first_name: '分页',
                show: false,
                plugin: [{ name: '普通', route: "/plugin_download/Page_1" }, { name: "多功能分页", route: "/plugin_download/Page_2" }, { name: '常见', route: "/plugin_download/Page_3" }]
            }, {
                first_name: '地址',
                show: false,
                plugin: [{ name: '多用地址', route: "/plugin_download/Address_1" }]
            }, {
                first_name: "自动补全",
                show: false,
                plugin: [{ name: '多用补全', route: "/plugin_download/Complete_1" }]
            }, {
                first_name: '折叠',
                show: false,
                plugin: [{ name: '普通折叠', route: "/plugin_download/Fold_1" }]
            }],
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.route_height = window.innerHeight - 80;
        },
        onReceive: function(m, data) {
            var me = this;
            if (m === 'm_plugin_download_Carousel_1') {
                if (!data.upload) {
                    me.data.route_height = data.height;
                    return;
                }
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Carousel_2') {
                if (!data.upload) {
                    me.data.route_height = data.height;
                    return;
                }
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Carousel_3') {
                if (!data.upload) {
                    me.data.route_height = data.height;
                    return;
                }
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Carousel_4') {
                if (!data.upload) {
                    me.data.route_height = data.height;
                    return;
                }
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Magn_1') {
                if (!data.upload) {
                    me.data.route_height = data.height;
                    return;
                }
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
                DD.request({
                    params: data,
                    url: "http://localhost:3000/api/test?",
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