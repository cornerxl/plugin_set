/**
 * @author cfx
 * @date 2018/7/6
 * @Description:按分类展示插件
 */
(function () {
    DD.createModule([
        {
            name: "m_plugin_address",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: 'css', path: PLUGINURL + '/plugins_show/address/location_1/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/address/location_1/js/index.js'}
            ],
            onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    </div>`;
                });
                props.template = tem;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "地址",
                plugins: [
                    {
                        name: '01001',
                        explain: "",
                        template: `<div class="position">
		<div class="location" x-plugin="plugin_01001"></div>
	</div>`,
                        data: {
                            location_country: '重庆',
                            popular_country: [
                                {name: '北京'},
                                {name: '重庆'},
                                {name: '四川'},
                                {name: '江西'},
                                {name: '青海'},
                                {name: '重庆'},
                                {name: '江苏'},
                                {name: '天津'},
                                {name: '深圳'},
                                {name: '浙江'},
                                {name: '重庆'},
                                {name: '江苏'},
                                {name: '天津'},
                                {name: '深圳'},
                                {name: '浙江'}
                            ],
                            small_div: {
                                color_1: '#ffffff',
                                color_2: '#66d9ef',
                                color_3: '#457eb1'
                            }

                        },
                        onBeforeFirstRender: function () {
                            var me = this;
                            if (window.data) {
                                if (window.data.color_1) {
                                    me.data.small_div.color_1 = window.data.color_1;
                                }
                                if (window.data.color_2) {
                                    me.data.small_div.color_2 = window.data.color_2;
                                }
                                if (window.data.color_3) {
                                    me.data.small_div.color_3 = window.data.color_3;
                                }
                            }
                        }
                    }
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        },
        {
            name: "m_plugin_buffering",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: 'css', path: PLUGINURL + '/plugins_show/buffering/animation_1/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/buffering/animation_1/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/buffering/animation_2/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/buffering/animation_2/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/buffering/animation_3/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/buffering/animation_3/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/buffering/animation_4/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/buffering/animation_4/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/buffering/animation_5/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/buffering/animation_5/js/index.js'}
            ], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "缓冲",
                plugins: [{
                    name: "02001",
                    explain: "",
                    template: `<div class="plugin-buffering" >
		<div x-plugin='plugin_02001' dataName='preLocation'></div>
	</div>`,
                    data: {
                        small_div: {
                            animation_time: 1,
                            color_1: "#999999999"
                        }
                    }
                }, {
                    name: "02002",
                    explain: "",
                    template: `<div x-plugin="plugin_02002">
        </div>`,
                    data: {
                        show: true,
                        width: 80,
                        height: 100,
                        color_1: '#FDB702',
                        animation_time: 1.2
                    }
                }, {
                    name: "02003",
                    explain: "",
                    template: `<div class="com-loading-animation-3" x-if="datas.show">
    <div class="imgbox">
        <div class="leftbox">
            <div class="left"></div>
        </div>
        <div class="rightbox">
            <div class="right"></div>
        </div>
    </div>
</div>`,
                    data: {
                        datas: {
                            show: true, // 是否显示
                        }
                    }
                }, {
                    name: "02004",
                    explain: "",
                    template: `<div class="el-animation-4">
		<div x-plugin="plugin_02004" style="height:60px"></div>
	</div>`,
                    data: {
                        color: '#00bfff',
                        time: 0.8
                    }
                }, {
                    name: "02005",
                    explain: "",
                    template: `<div class="el-animation-5">
        <div x-plugin="plugin_02005"></div>
    </div>`,
                    data: {
                        name: '水滴动画',
                        color: " #363636",
                        datas: {
                            show: true
                        },
                        time: 2
                    }
                }]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        },
        {
            name: "m_plugin_carousel",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: false,
            requires: [{type: 'css', path: PLUGINURL + '/plugins_show/carousel/carousel_1/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/carousel/carousel_1/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/carousel/carousel_2/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/carousel/carousel_2/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/carousel/carousel_3/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/carousel/carousel_3/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/carousel/carousel_4/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/carousel/carousel_4/js/index.js'}
            ],
            onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "轮播图",
                plugins: [
                    {
                        name: '03001',
                        explain: "",
                        template: `<div class="el-photo">
        <div x-plugin='plugin_03001' class='plugin'></div>
    </div> `,
                        data: {
                            ca_photo: {
                                translate: false,
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/4.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/5.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/1.jpg'}],
                                span: [{blight: false}, {blight: false}, {blight: false}, {blight: false}, {blight: false}, {blight: false}]
                            }
                        }
                    }, {
                        name: "03002",
                        explain: "",
                        template: `<div class="carous_ct">
		<div x-plugin="plugin_03002" class='plugin'></div>
	</div>`,
                        data: {
                            img_ct: {
                                direct: -1,
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/4.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/2.jpg'}
                                ]
                            }
                        }
                    }, {
                        name: "03003",
                        explain: '',
                        template: `<div class="el-plugin">
        <div x-plugin="plugin_03003" class='plugin'></div>
    </div>`,
                        data: {
                            ca_photo: {
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/4.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/2.jpg'}
                                ]
                            },
                            dx: 1
                        }
                    }, {
                        name: "03004",
                        explain: "",
                        template: ` <div class="el-plugin">
        <div x-plugin="plugin_03004" class='plugin'></div>
    </div>`,
                        data: {
                            ca_photo: {
                                imgs: [{
                                    img_item: [{url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/4.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/8.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/12.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/16.jpg'}]
                                }, {
                                    img_item: [{url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/3.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/7.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/11.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/15.jpg'}]
                                }, {
                                    img_item: [{url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/2.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/6.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/10.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/14.jpg'}]
                                }, {
                                    img_item: [{url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/1.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/5.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/9.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/13.jpg'}]
                                }]
                            },
                            up: false,
                            down: true,
                        }
                    }
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_checkBox",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: 'css', path: PLUGINURL + '/plugins_show/checkBox/checkBox_1/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/checkBox/checkBox_1/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/checkBox/checkBox_2/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/checkBox/checkBox_2/js/index.js'},
            ], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "选择框",
                plugins: [
                    {
                        name: '04001',
                        explain: "",
                        template: `<div class="nd-plugin-check-1">
		<div x-plugin="plugin_04001"></div>
	</div>`,
                        data: {
                            check_color: '#26a2ff',
                            no_check_color: '#ffffff',
                            empty_color: '#cccccc',
                            yes: true,
                        },
                    }, {
                        name: '04002',
                        explain: "",
                        template: `<div class="nd-plugin-check-list">
        <div x-plugin="plugin_04002" class="content-check"></div>
    </div>`,
                        data: {
                            yes: true,
                            yes_1: true,
                            yes_2: true,
                        },
                    }
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    // me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_colorPicker",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + '/plugins_show/colorPicker/colorPicker_1/css/index.css'},
                {type: "js", path: PLUGINURL + '/plugins_show/colorPicker/colorPicker_1/js/index.js'}
            ], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "颜色选择",
                plugins: [{
                    name: "05001",
                    explain: "",
                    template: `<div class="el-color-picker-1">
        <div x-plugin="plugin_05001" class="plugin-color">
        </div>
        <div class="input">
        	 <div style="background-color:{{str}}" class="input"></div>
        	<div class="select" e-click="select">选择</div>
        </div>
    </div>`,
                    data: {
                        left: 0,
                        first: 1,
                        r: 255,
                        g: 0,
                        b: 0,
                        H: 0,
                        s: 255,
                        v: 255,
                        show: false,
                        str: "#ff0000"
                    },
                    methods: {
                        select: function () {
                            var me = this;
                            me.data.show = true;
                        }
                    }
                }]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                        });
                        me.module.modules.push(m);
                    })
                }
            },
        }, {
            name: "m_plugin_dateInput",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "日期选择",
                plugins: []
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_foldCollapse",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + '/plugins_show/foldCollapse/foldCollapse_1/css/index.css'},
                {type: "js", path: PLUGINURL + '/plugins_show/foldCollapse/foldCollapse_1/js/index.js'},
            ], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "折叠",
                plugins: [
                    {
                        name: "07001",
                        explain: "",
                        template: `<div class="plugin-collapse">
        <div x-plugin="plugin_07001"></div>
    </div>`,
                        data: {
                            collapse: {
                                time: 0.5,
                                isCollapse: true,
                                heading: '点击展开，再次点击折叠',
                                content: "NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。"
                            }
                        }
                    }
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_imgShow",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + '/plugins_show/imgShow/magn_1/css/index.css'},
                {type: "js", path: PLUGINURL + '/plugins_show/imgShow/magn_1/js/index.js'},
            ], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "图片放大",
                plugins: [
                    {
                        name: '08001',
                        explain: '',
                        template: `<div class="el-plugin">
		<div x-plugin='plugin_08001' class='plugin' x-model='magn'></div>
	</div>`,
                        data: {
                            hasCreated: false,
                            magn: {
                                urlsmall: PLUGINURL + '/plugins_show/imgShow/magn_1/img/small.jpg',
                                urlbig: PLUGINURL + '/plugins_show/imgShow/magn_1/img/big.jpg'
                            }
                        }
                    }
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_inputAuto",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [],
            modules: [], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            data: {
                hasCreated: false,
                name: "自动补全",
                plugins: [
                    {
                        name: "09001",
                        explain: "",
                        template: `<div class="wrap">
    <input type="text" id="auto_input" class="auto-inp">
    <div class="auto on" id="auto"></div>
</div>`,
                        requires: [
                            {type: "css", path: PLUGINURL + '/plugins_show/inputAuto/inputAuto_1/css/index.css'},
                            {type: "js", path: PLUGINURL + '/plugins_show/inputAuto/inputAuto_1/js/index.js'}
                        ]
                    }
                ],
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            requires: item.requires,
                        });
                        me.module.modules.push(m);
                    })
                }
            },
        }, {
            name: "m_plugin_paging",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + "/plugins_show/paging/page_1/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/paging/page_1/js/index.js"},
                {type: "css", path: PLUGINURL + "/plugins_show/paging/page_2/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/paging/page_2/js/index.js"},
            ],
            onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [
                {
                    name: "test",
                }
            ],
            data: {
                name: "分页",
                plugins: [
                    {
                        name: "10001",
                        explain: "",
                        template: `<div class="plugin-page">
        <div x-plugin="plugin_10001"></div>
    </div>`,
                        data: {
                            page: 1,
                            row: 10,
                            total: 0,
                            to_page: 1,
                            allpage: 0,
                        }
                    }, {
                        name: "10002",
                        explain: "",
                        template: `<div class="plugin-page">
        <div x-plugin="plugin_10002" dataItem='page'></div>
    </div>`,
                        data: {
                            page: {
                                pre_page: 1,
                                go_page: 1,
                                all_page: 16,
                                page_rows: []
                            }
                        }
                    }
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_progress",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + "/plugins_show/progress/progress_1/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/progress/progress_1/js/index.js"},
                {type: "css", path: PLUGINURL + "/plugins_show/progress/progress_2/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/progress/progress_2/js/index.js"},
                {type: "css", path: PLUGINURL + "/plugins_show/progress/progress_3/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/progress/progress_3/js/index.js"},
            ], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "进度条",
                plugins: [
                    {
                        name: "11001",
                        explain: "",
                        template: `<div class="plugin-dragprobarHV">
        <div x-plugin="plugin_11001" dataItem="dragProBarHV" showStyle="showStyle"></div>
    </div>`,
                        data: {
                            dragProBarHV: 0.4,
                            showStyle: "horizontal",
                            width_d: window.innerWidth * 0.45,
                            name: "进度条",
                        }
                    }, {
                        name: "11002",
                        explain: "",
                        template: `<div class="plugin-probar">
        <div x-plugin="plugin_11002" dataItem="proBar" showItem="percent" ></div>
    </div>`,
                        data: {
                            proBar: 0.9,
                            percent: true
                        }
                    }, {
                        name: "11003",
                        explain: "",
                        template: `<div class="el-svg-1">
    <div class="content">
        <div x-plugin="plugin_11003" class="svg">
        </div>
        <div class="input">
            <div class="plus" e-click="add">+</div>
            <div class="dele" e-click="dele">-</div>
        </div>
        <div class="num">{{100*per/10}}%
        </div>
    </div>
</div>`,
                        data: {
                            r: 90,
                            r1: '',
                            r2: '',
                            per: 2,
                            color_1: '#f5f5f5',
                            color_2: '#108ee9'
                        },
                        methods: {
                            add: function () {
                                var me = this;
                                me.data.per += me.data.per > 9 ? 0 : 1;
                                me.data.r1 = me.data.per / 10 * Math.PI * 2 * me.data.r;
                            },
                            dele: function () {
                                var me = this;
                                me.data.per -= me.data.per < 1 ? 0 : 1;
                                me.data.r1 = me.data.per / 10 * Math.PI * 2 * me.data.r;
                            }
                        }
                    },
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_slideImg",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + '/plugins_show/slideImg/css/slideImg.css'},
                {type: "js", path: PLUGINURL + '/plugins_show/slideImg/js/slideImg.js'}
            ], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                slideImg: {
                    rows: [
                        {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/1.jpg"},
                        {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/2.jpg"},
                        {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/3.jpg"},
                        {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/4.jpg"},
                        {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/5.jpg"},
                    ]
                },
                hasCreated: false,
                name: "滑动菜单",
                plugins: [
                    {
                        name: "12001",
                        template: `<div class="plugin-slideimg">
        <div x-plugin="plugin_12001" dataName="slideImg"></div>
    </div>`,
                        explain: "",
                        data: {
                            slideImg: {
                                rows: [
                                    {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/1.jpg"},
                                    {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/2.jpg"},
                                    {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/3.jpg"},
                                    {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/4.jpg"},
                                    {url: "/plugin_set/public/plugins/plugins_show/slideImg/img/5.jpg"},
                                ]
                            }
                        }
                    }
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_switcher",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "开关",
                plugins: []
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });

                    })
                }
            },
        }, {
            name: "m_plugin_table",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "表格",
                plugins: []
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }, {
            name: "m_plugin_tree",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [],
            onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
    <div class="plugin-name">{{name}}插件</div>`;
                props.data.plugins.forEach(function (i) {
                    tem += `<div class='plugin-item'>
        <div class="plugin-content el-plugin-` + i.name + `">`
                        + i.template + `
        </div>
        <div class='plugin-explain'><p>插件说明:</p>
            <p class='explain'>{{explain}}</p></div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "菜单树",
                plugins: []
            },
            onBeforeFirstRender: function () {
                var me = this;
                if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    me.data.hasCreated = true;
                }
            },
            methods: {
                createModules: function () {
                    var me = this;
                    me.data.plugins.forEach(function (item) {
                        var m = DD.createModule({
                            name: 'm_plugin_' + item.name,
                            el: '.el-plugin-' + item.name,
                            data: item.data,
                            parent: me.module
                        });
                    })
                }
            },
        }]);
}());