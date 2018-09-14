/**
 * Created by xll on 2018/6/28.
 */
(function() {
    var canvas = {
        dom: document.querySelector(".mycanvas"),
        partical: [],
        ctx: '',
        color: "#0077b375",
        count: 400,
        width: window.innerWidth,
        height: window.innerHeight,
        target: {
            x: "",
            y: "",
            max: 20000
        },
        flag: true,
        init: function(data) {
            var me = this;
            me.show = data;
            me.dom = document.querySelector(".mycanvas");
            me.ctx = me.dom.getContext("2d");
            me.partical = [];
            me.config();
            me.getData();
            me.draw();
            me.dom.addEventListener("mousemove", function(e) {
                me.set(e);
            }, false);
            me.dom.addEventListener("mouseover", function() {
                me.reset();
            }, false);
            me.ctx.clearRect(0, 0, me.width, me.height);
            me.flag = true;
        },
        config: function() {
            var me = this;
            me.dom.setAttribute("width", me.width + 'px');
            me.dom.setAttribute("height", me.height + 'px');
            document.querySelector('.canvas-ct').style.width = me.width + 'px';
            document.querySelector('.canvas-ct').style.height = me.height + 'px';
        },
        getData: function() {
            var me = this;
            for (var i = 0; i < me.count; i++) {
                me.partical.push({
                    x: Math.random() * me.width,
                    y: Math.random() * me.height,
                    sx: Math.random() * 2 - 1,
                    sy: Math.random() * 2 - 1,
                    max: 12000
                });
            }
        },
        draw: function() {
            var me = this;
            if (!me.show) {
                me.ctx.clearRect(0, 0, me.width, me.height);
                return;
            }
            me.ctx.clearRect(0, 0, me.width, me.height);
            var tem = me.partical.slice(0);
            tem.unshift(me.target);
            me.ctx.strokeStyle = me.color;
            me.partical.forEach(function(i, index) {
                i.x += i.sx;
                i.y += i.sy;
                //反弹
                i.sx *= i.x > me.width || i.x < 0 ? -1 : 1;
                i.sy *= i.y > me.height || i.y < 0 ? -1 : 1;
                me.ctx.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
                var x, y;
                for (var j = 0; j < tem.length; j++) {
                    t = tem[j];
                    if (i !== t && t.x && t.y) {
                        //找到距离小于一定的点,链接起来
                        x = (i.x - t.x) * (i.x - t.x);
                        y = (i.y - t.y) * (i.y - t.y);
                        if ((x + y) < t.max) {
                            me.ctx.beginPath();
                            me.ctx.lineWidth = (t.max - (x + y)) / t.max;
                            me.ctx.moveTo(i.x, i.y);
                            me.ctx.lineTo(t.x, t.y);
                            me.ctx.stroke();
                            me.ctx.closePath();
                        }
                    }
                };
                //删去当前的点减少性能浪费以及颜色更浅
                tem.splice(tem.indexOf(i), 1);
            });
            if (me.flag) {
                window.requestAnimationFrame(me.draw.bind(me));
            }
        },
        set: function(e) {
            var me = this;
            me.target.x = e.offsetX;
            me.target.y = e.offsetY;
        },
        reset: function() {
            var me = this;
            me.target.x = "";
            me.target.y = "";
        },
        resize: function() {
            var me = this;
            me.flag = false;
            me.width = window.innerWidth;
            me.height - window.innerHeight;
            me.init();
        }
    };
    window.canvas = canvas;
    // window.onresize = function() {
    //     canvas.resize();
    // };
    window.onkeydown = function(e) {
        if (e.keyCode == 123) {
            e.preventDefault();
            alert("请尊重劳动成果")
            return;
        }
    }
})();
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
            HTMLURL + '/plugin_download/progress_3/js/index.js',
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
            HTMLURL + '/plugin_download/checkbox_3/js/index.js',
            HTMLURL + '/plugin_download/checkbox_4/js/index.js',
            HTMLURL + '/plugin_download/checkbox_5/js/index.js',
            HTMLURL + '/plugin_download/button_1/js/index.js',
            HTMLURL + '/plugin_download/icon_1/js/index.js',
            HTMLURL + '/plugin_download/colorPicker_1/js/index.js',
            HTMLURL + '/plugin_download/tree_1/js/index.js',
            HTMLURL + '/plugin_download/chart_1/js/index.js',
            HTMLURL + '/plugin_download/chart_2/js/index.js',
            HTMLURL + '/plugin_download/chart_3/js/index.js',
            HTMLURL + '/plugin_download/chart_4/js/index.js',
            HTMLURL + '/plugin_download/chart_5/js/index.js',
        ],
        data: {
            public_path: '/plugin_set/public/plugins/plugin_down/',
            down: false,
            src: '',
            name: '',
            show: true,
            route_height: '',
            route: "/greet",
            first_type: [{
                first_name: '图表',
                show: true,
                plugin: [{ name: '折线图', route: "/route/plugin_download/Chart_1", active: true }, { name: "直方图", route: "/route/plugin_download/Chart_2", active: false }, { name: '饼状图图', route: "/route/plugin_download/Chart_3", active: false }, { name: '散点图', route: "/route/plugin_download/Chart_4", active: false }, { name: '雷达图', route: "/route/plugin_download/Chart_5", active: false }]
            }, {
                first_name: '缓冲动画',
                show: false,
                plugin: [{ name: '泡泡动画', route: "/route/plugin_download/Animation_1", active: false }, { name: '方块动画', route: "/route/plugin_download/Animation_2", active: false }, { name: '圆环动画', route: "/route/plugin_download/Animation_3", active: false }, { name: '闪烁动画', route: "/route/plugin_download/Animation_4", active: false }, { name: '水滴动画', route: "/route/plugin_download/Animation_5", active: false }]
            }, {
                first_name: '轮播图',
                show: false,
                plugin: [{ name: '常用轮播图', route: "/route/plugin_download/Carousel_1", active: false }, { name: "水平旋转", route: "/route/plugin_download/Carousel_2", active: false }, { name: '垂直轮播图', route: "/route/plugin_download/Carousel_3", active: false }, { name: '3d轮播图', route: "/route/plugin_download/Carousel_4", active: false }]
            }, {
                first_name: '分页',
                show: false,
                plugin: [{ name: "常见", route: "/route/plugin_download/Page_1", active: false }, { name: "酷炫", route: "/route/plugin_download/Page_2", active: false }]
            }, {
                first_name: '选择框',
                show: false,
                plugin: [{ name: "常见", route: "/route/plugin_download/Checkbox_1", active: false },{ name: "方形", route: "/route/plugin_download/Checkbox_3", active: false }, { name: "眼睛", route: "/route/plugin_download/Checkbox_4", active: false }, { name: "心形", route: "/route/plugin_download/Checkbox_5", active: false }]
            }, {
                first_name: '日期选择',
                show: false,
                plugin: [{ name: "星期", route: "/route/plugin_download/Date_1", active: false }, { name: "年月日", route: "/route/plugin_download/Date_2", active: false }]
            }, {
                first_name: '折叠',
                show: false,
                plugin: [{ name: '普通折叠', route: "/route/plugin_download/foldCollapse_1", active: false }]
            }, {
                first_name: '图片放大镜',
                show: false,
                plugin: [{ name: '高清版本', route: "/route/plugin_download/Magn_1", active: false }]
            }, {
                first_name: "自动补全",
                show: false,
                plugin: [{ name: '多用补全', route: "/route/plugin_download/Complete_1", active: false }]
            }, {
                first_name: '进度条',
                show: false,
                plugin: [{ name: '普通', route: "/route/plugin_download/Progress_2", active: false }, { name: "横向拖动", route: "/route/plugin_download/Progress_1", active: false }, { name: "圆环", route: "/route/plugin_download/Progress_3", active: false }]
            }, {
                first_name: '开关',
                show: false,
                plugin: [{ name: '3D按钮开关', route: "/route/plugin_download/Switch_3", active: false }, { name: '3D开关', route: "/route/plugin_download/Switch_2", active: false }, { name: "普通开关", route: "/route/plugin_download/Switch_1", active: false }]
            }, {
                first_name: '地址',
                show: false,
                plugin: [{ name: '多用地址', route: "/route/plugin_download/Location_1", active: false }]
            }, {
                first_name: '表格',
                show: false,
                plugin: [{ name: '多用表格', route: "/route/plugin_download/Table_1", active: false }]
            }, {
                first_name: '菜单树',
                show: false,
                plugin: [{ name: "数组件", route: "/route/plugin_download/Tree_1", active: false }]
            }, {
                first_name: '颜色选择器',
                show: false,
                plugin: [{ name: "选择器", route: "/route/plugin_download/ColorPicker_1", active: false }]
            }, {
                first_name: '按钮',
                show: false,
                plugin: [{ name: "按钮列表", route: "/route/plugin_download/Button_1", active: false }]
            }, {
                first_name: '图标库',
                show: false,
                plugin: [{ name: "图标列表", route: "/route/plugin_download/Icon_1", active: false }]
            }]
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.route_height = window.innerHeight - 80;
            me.data.show = true;
            setTimeout(canvas.init.bind(canvas, me.data.show), 2000);
            me.data.first_type.forEach(i=>{
                i.plugin.forEach(it=>{
                    it.active=false;
                });
                i.show=false;
            })
             me.data.first_type[0].show=true;
            me.data.first_type[0].plugin[0].active=true;
        },
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
            if (m === 'm_plugin_download_Progress_3') {
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
             if (m === 'm_plugin_download_Checkbox_3') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
             if (m === 'm_plugin_download_Checkbox_4') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
             if (m === 'm_plugin_download_Checkbox_5') {
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
            if (m === 'm_plugin_download_ColorPicker_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Tree_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Table_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }
            if (m === 'm_plugin_download_Chart_1') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }

            if (m === 'm_plugin_download_Chart_2') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }

            if (m === 'm_plugin_download_Chart_3') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }

            if (m === 'm_plugin_download_Chart_4') {
                if (data.upload) {
                    var params = data.obj;
                    me.module.methodFactory.methods.upload.call(me, params);
                }
            }

            if (m === 'm_plugin_download_Chart_5') {
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
            active: function(e, data, view) {
                var me = this;
                me.data.first_type.forEach(function(i) {
                    i.plugin.forEach(function(item) {
                        item.active = false;
                    });
                });
                data.active = true;
                me.data.show = false;
                canvas.show = false;
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
})();