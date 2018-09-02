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
                                + i.template + `</div>
                                <br>
                                <div class="instruction-title-sec">HTML代码</div>
                                <br>` + i.htmlcode +  `<br>
                                <div class="instruction-title-sec">JS代码</div>
                                <br>` + i.jscode + `<br>
                                <div class='plugin-explain'>
                                    <p class="instruction-title-sec">插件说明:</p>
                                    <br>
                                    <p class='explain'>` + i.explain + `</p>
                                </div>
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
                        explain: `这是一款选择与获取当前省份的智能Location插件。插件分为"当前省份"、"热门省份"以及按照拼音首字母排列的各个省份三个部分。通过点击省份名称，来改变"当前省份"。" `,
                        template: `<div class="position">
		                                <div class="location" x-plugin="plugin_01001"></div>
	                                </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="position"></pre>
                                        <pre>      <<span class="element">div</span> <span class="attr">class</span>="location" <span class="attr">x-plugin</span>="address"><<span class="element">/div</span>></pre>
	                                    <pre><<span class="element">/div</span>></pre>
                                    </pre>`,
                        jscode: `<pre  class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'address',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.location',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span></pre>
                                    <pre><span>            location_country:  '*****'</span>      <span class="comment">/*当前位置城市名*/</span></pre>
                                    <pre><span>            popular_country: [{name: '北京'}]</span>      <span class="comment">/*热门城市数组*/</span></pre>
                                    <pre><span>            small_div: {</span>      <span class="comment">/*颜色对象*/</span></pre>
                                    <pre><span>      }</span></pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
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
                                <br>
                                <div class="instruction-title-sec">HTML代码</div>
                                <br>` + i.htmlcode +  `<br>
                                <div class="instruction-title-sec">JS代码</div>
                                <br>` + i.jscode + `<br>
                                <div class='plugin-explain'>
                                    <p class="instruction-title-sec">插件说明:</p>
                                    <br>
                                    <p class='explain'>` + i.explain + `</p>
                                </div>
                            </div>`;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "缓冲",
                plugins: [{
                    name: "02001",
                    explain: "这是本系统第一个缓冲插件，即加载动画，由动感动画组成。本插件可自定义配置项包括：泡泡颜色、动画时间、单个元素半径。",
                    template: `<div class="plugin-buffering" >
		                            <div x-plugin='plugin_02001' dataName='buffering_data'></div>
	                            </div>`,
                    htmlcode: `<pre class="instruction-code">
                                    <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-buffering-1" <span class="attr">x-plugin</span>="buffering" <span class="attr">dataName</span>="buffering_data"><<span class="element">/div></span></pre>
                                </pre>`,
                    jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'buffering_1',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-buffering-1',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            buffering_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  show: true</span>      <span class="comment">/*在接收到消息时，显示动画*/</span></pre>
                                    <pre><span>                  color: "#FF0000",</span>      <span class="comment">/*缓冲动画颜色*/</span></pre>
                                    <pre><span>                  animation_time: 1</span>      <span class="comment">/*缓冲动画时间*/</span></pre>
                                    <pre><span>                  radius: 5</span>      <span class="comment">/*缓冲动画单个圆半径*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                    data: {
                        buffering_data: {
                            show: true,
                            animation_time: 1,
                            color: "#FF0000",
                            radius: 5,
                        }
                    }
                }, {
                    name: "02002",
                    explain: "这是本系统第二个缓冲插件，即加载动画，由动感动画组成。本插件可自定义配置项包括：方块颜色、动画时间、动画外层盒子宽度、高度。",
                    template: `<div x-plugin="plugin_02002" dataName='buffering_data'>
                               </div>`,
                    htmlcode: `<pre class="instruction-code">
                                    <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-buffering-2" <span class="attr">x-plugin</span>="buffering" <span class="attr">dataName</span>="buffering_data"><<span class="element">/div></span></pre>
                                </pre>`,
                    jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'buffering_2',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-buffering-2',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            buffering_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  show: true</span>      <span class="comment">/*在接收到消息时，显示动画*/</span></pre>
                                    <pre><span>                  color: "#FF0000",</span>      <span class="comment">/*缓冲动画颜色*/</span></pre>
                                    <pre><span>                  animation_time: 1</span>      <span class="comment">/*缓冲动画时间*/</span></pre>
                                    <pre><span>                  width: 50,</span>      <span class="comment">/*缓冲动画长方形盒子宽度*/</span></pre>
                                    <pre><span>                  height: 50</span>      <span class="comment">/*缓冲动画长方形盒子高度*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                    data: {
                        buffering_data: {
                            show: true,
                            width: 40,
                            height: 60,
                            color: '#FDB702',
                            animation_time: 1.2
                        }
                    }
                }, {
                    name: "02003",
                    explain: "这是本系统第三个缓冲插件，即加载动画，由动感动画组成。",
                    template: `<div x-plugin="plugin_02003" dataName='buffering_data'>
                               </div>`,
                    htmlcode: `<pre class="instruction-code">
                                    <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-buffering-3" <span class="attr">x-plugin</span>="buffering" <span class="attr">dataName</span>="buffering_data"><<span class="element">/div></span></pre>
                                </pre>`,
                    jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'buffering_3',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-buffering-3',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            buffering_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  show: true</span>      <span class="comment">/*在接收到消息时，显示动画*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                    data: {
                        buffering_data: {
                            show: true, // 是否显示
                        }
                    }
                }, {
                    name: "02004",
                    explain: "这是本系统第四个缓冲插件，即加载动画，由动感动画组成。本插件可自定义配置项包括：颜色、动画时间、动画外层盒子宽度、高度。",
                    template: `<div class="el-animation-4">
		                            <div x-plugin="plugin_02004" style="height:60px" dataName='buffering_data'></div>
	                            </div>`,
                    htmlcode: `<pre class="instruction-code">
                                    <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-buffering-4" <span class="attr">x-plugin</span>="buffering" <span class="attr">dataName</span>="buffering_data"><<span class="element">/div></span></pre>
                                </pre>`,
                    jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'buffering_4',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-buffering-4',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            buffering_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  show: true</span>      <span class="comment">/*在接收到消息时，显示动画*/</span></pre>
                                    <pre><span>                  color: "#00bfff",</span>      <span class="comment">/*缓冲动画颜色*/</span></pre>
                                    <pre><span>                  time: 0.8</span>      <span class="comment">/*缓冲动画时间*/</span></pre>
                                    <pre><span>                  width: 150,</span>      <span class="comment">/*缓冲动画长方形盒子宽度*/</span></pre>
                                    <pre><span>                  height: 70</span>      <span class="comment">/*缓冲动画长方形盒子高度*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                    data: {
                        buffering_data: {
                            show: true,
                            color: '#00bfff',
                            time: 0.8,
                            width: 150,
                            height: 70
                        }
                    }
                }, {
                    name: "02005",
                    explain: "这是本系统第五个缓冲插件，即加载动画，由水滴动画组成。本插件可自定义配置项包括：颜色、动画时间、单个元素半径。",
                    template: `<div class="el-animation-5">
                                <div x-plugin="plugin_02005" dataName='buffering_data'></div>
                            </div>`,
                    htmlcode: `<pre class="instruction-code">
                                    <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-buffering-5" <span class="attr">x-plugin</span>="buffering" <span class="attr">dataName</span>="buffering_data"><<span class="element">/div></span></pre>
                                </pre>`,
                    jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'buffering_5',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-buffering-5',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            buffering_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  show: true</span>      <span class="comment">/*在接收到消息时，显示动画*/</span></pre>
                                    <pre><span>                  color: "#363636",</span>      <span class="comment">/*缓冲动画颜色*/</span></pre>
                                    <pre><span>                  time: 2</span>      <span class="comment">/*缓冲动画时间*/</span></pre>
                                    <pre><span>                  radius: 5</span>      <span class="comment">/*缓冲动画单个圆半径*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                    data: {
                        name: '水滴动画',
                        buffering_data: {
                            color: "#363636",
                            show: true,
                            time: 2,
                            radius: 5
                        },
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
            delayInit: true,
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
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
                        explain: "这是一个由四张图片组成的左右轮播图插件，通过每张图片的左右滚动，实现图片的动态轮播。轮播是定时自动左右旋转轮播，还可通过点击左右键来控制轮播方向。\n" +
                            "本插件可自定义配置项包括：轮播颜色、初始颜色、方块长度、方块高度、轮播时间、轮播方向（方向左、方向右）。",
                        template: `<div class="el-photo">
        <div x-plugin='plugin_03001' class='plugin'></div>
    </div> `,
                        data: {
                            name: '',
                            ca_photo: {
                                width: '',
                                check_color: '#ff6800',
                                translate: false,
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/4.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/5.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/1.jpg'}],
                                span: [{blight: false}, {blight: false}, {blight: false}, {blight: false}, {blight: false}, {blight: false}]
                            }, small_div: {
                                check: '#ff6800',
                                no_check: '#ffffff',
                                width: '8',
                                height: '8',
                                time: 3,
                                left: false,
                                right: true,
                            }
                        },
                        onBeforeFirstRender: function () {
                            var me = this;
                            me.data.ca_photo.width = window.innerWidth * 0.5;
                            me.data.name = "常见轮播图";
                            me.data.small_div = {
                                check: '#ff6800',
                                no_check: '#ffffff',
                                width: '8',
                                height: '8',
                                time: 3,
                                left: false,
                                right: true,
                            };
                        }
                    }, {
                        name: "03002",
                        explain: "这是一个由四张图片组成的左右轮播图插件，通过每张图片的左右旋转，实现图片的动态轮播。轮播是定时自动左右旋转轮播，还可通过点击左右键来控制轮播方向。\n" +
                            "本插件可自定义配置项包括：轮播颜色、初始颜色、方块长度、方块高度、轮播时间、轮播方向（方向左、方向右）。",
                        template: `<div class="carous_ct">
		<div x-plugin="plugin_03002" class='plugin'></div>
	</div>`,
                        data: {
                            width_data: '',
                            name: '',
                            img_ct: {
                                width: '',
                                translate: false,
                                spans: [{}, {}, {}, {}, {}, {}],
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/4.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/2.jpg'}
                                ],
                            }, small_div: {
                                check: '#ff6800',
                                no_check: '#ffffff',
                                width: '8',
                                height: '8',
                                time: 5,
                                left: true,
                                right: false
                            }
                        }, onBeforeFirstRender: function () {
                            var me = this;
                            me.data.name = "水平旋转";
                            me.data.img_ct.spans.forEach(function (i) {
                                i.width = me.data.small_div.width;
                                i.height = me.data.small_div.height;
                            });
                            me.data.img_ct.$set("spans", me.data.img_ct.spans);
                            if (window.timer_1) {
                                clearInterval(window.timer_1);
                            }
                            if (window.timer_2) {
                                clearInterval(window.timer_2);
                            }
                            if (window.timer_3) {
                                clearInterval(window.timer_3);
                            }
                            if (window.timer_4) {
                                clearInterval(window.timer_4);
                            }
                            me.data.small_div.left = true;
                            me.data.small_div.right = false;
                        }, onRender: function () {
                            var me = this;
                            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
                            me.data.width_data = window.innerWidth * 0.5;
                        }
                    }, {
                        name: "03003",
                        explain: '这是一个由四张图片组成的竖直轮播图插件，通过每张图片的竖直旋转，实现图片的动态轮播。轮播是定时自动竖直旋转轮播。\n' +
                            '本插件可自定义配置项包括：轮播颜色、初始颜色、方块长度、方块高度、轮播时间、轮播方向（方向上、方向下）。',
                        template: `<div class="el-plugin">
        <div x-plugin="plugin_03003" class='plugin'></div>
    </div>`,
                        data: {
                            width_data: '',
                            name: '',
                            ca_photo: {
                                width: '',
                                translate: false,
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/4.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/2.jpg'}
                                ]
                            },
                            small_div: {
                                check: '#ff6800',
                                no_check: '#ffffff',
                                width: '8',
                                height: '8',
                                time: 3,
                                left: false,
                                right: true
                            },
                            dx: 1,
                        }, onBeforeFirstRender: function () {
                            var me = this;
                            me.data.name = "垂直轮播图";
                            if (window.timer_1) {
                                clearInterval(window.timer_1);
                            }
                            if (window.timer_2) {
                                clearInterval(window.timer_2);
                            }
                            if (window.timer_4) {
                                clearInterval(window.timer_4);
                            }
                            if (window.timer_3) {
                                clearInterval(window.timer_3);
                            }
                            me.data.small_div = {
                                check: '#ff6800',
                                no_check: '#ffffff',
                                width: '8',
                                height: '8',
                                time: 3,
                                left: false,
                                right: true
                            };
                        }, onRender: function () {
                            var me = this;
                            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
                            me.data.width_data = window.innerWidth * 0.5;
                        },
                    }, {
                        name: "03004",
                        explain: "这是一个由十六张小图片组成的竖直轮播图插件，通过每四张图片的竖直旋转拼合，实现图片的动态轮播。轮播是定时自动竖直旋转轮播。\n" +
                            "本插件可自定义配置项包括：轮播颜色、初始颜色、方块长度、方块高度、轮播时间、轮播方向（方向上、方向下）。",
                        template: ` <div class="el-plugin">
        <div x-plugin="plugin_03004" class='plugin'></div>
    </div>`,
                        data: {
                            base_url: '/plugin_set/public/view/plugin_download/carouse_4/img/',
                            width_data: '',
                            name: '',
                            ca_photo: {
                                one: true,
                                width: '',
                                translate: false,
                                span: [{}, {}, {}, {}],
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
                            small_div: {
                                check: '#ff6800',
                                no_check: '#ffffff',
                                width: '8',
                                height: '8',
                                time: 3,
                                up: true,
                                down: false,
                            },
                            up: false,
                            down: true,
                        }, onBeforeFirstRender: function () {
                            var me = this;
                            me.data.name = "3d轮播图";
                            me.data.ca_photo.imgs.forEach(function (i, inde) {
                                i.img_item.forEach(function (item, index) {
                                    //图片url地址赋值
                                    item.url = me.data.base_url + ((index + 1) * 4 - inde) + '.jpg';
                                });
                            });
                            me.data.ca_photo.span.forEach(function (i) {
                                i.width = 8;
                                i.height = 8;
                            });
                            me.data.small_div = {
                                check: '#ff6800',
                                no_check: '#ffffff',
                                width: '8',
                                height: '8',
                                time: 3,
                                up: true,
                                down: false,
                            };
                            if (window.timer_1) {
                                clearInterval(window.timer_1);
                            }
                            if (window.timer_2) {
                                clearInterval(window.timer_2);
                            }
                            if (window.timer_3) {
                                clearInterval(window.timer_3);
                            }
                            if (window.timer_4) {
                                clearInterval(window.timer_4);
                            }
                        },
                        onRender: function () {
                            var me = this;
                            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
                            me.data.width_data = window.innerWidth * 0.5;
                        },
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
                            parent: me.module,
                            onRender: item.onRender,
                            onBeforeFirstRender: item.onBeforeFirstRender
                        });
                    })
                }
            },
        },
        {
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
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
                        explain: "这是本系统的第一个checkBox插件，通过点击来实现选中与未选中。\n" +
                            "本插件可自定义配置项包括：选中颜色、不选颜色、禁选颜色。",
                        template: `<div class="nd-plugin-check-1">
		<div x-plugin="plugin_04001"></div>
	</div>`,
                        data: {
                            name: '普通选择框',
                            check_color: '#26a2ff',
                            no_check_color: '#ffffff',
                            empty_color: '#cccccc',
                            yes: true,
                        },
                        onBeforeFirseRender: function () {
                            var me = this;
                            me.data.check_color = '#26a2ff';
                            me.data.no_check_color = '#ffffff';
                            me.data.empty_color = '#cccccc';
                            me.data.yes = true;
                        },
                    }, {
                        name: '04002',
                        explain: "这是本系统的第二个checkBox插件，通过点击来实现选中与未选中。提供的样式多样。\n" +
                            "本插件可自定义配置项包括：选中颜色、不选颜色。",
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
                            parent: me.module,
                            onBeforeFirstRender: item.onBeforeFirstRender
                        });
                    })
                }
            },
        },
        {
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
    </div>`;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "颜色选择",
                plugins: [{
                    name: "05001",
                    explain: "这是本系统的一款颜色选择器插件。拥有多个参数可供调节，所选颜色区域也更多。\n" +
                        "本插件可自定义配置项包括：颜色选择。",
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
                        str: "#ff0000",
                    }, onBeforeFirstRender: function () {
                        var me = this;
                        me.data.lef = 0;
                        me.data.left = 0;
                        me.data.first = 1;
                        me.data.r = 255;
                        me.data.g = 0;
                        me.data.b = 0;
                        me.data.H = 0;
                        me.data.s = 255;
                        me.data.v = 255;
                        me.data.show = false;
                        me.data.str = "#ff0000";
                    },
                    methods: {
                        select: function () {
                            var me = this;
                            me.data.show = true;
                        }
                    }
                }],

            }, onBeforeFirstRender: function () {
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
                            parent: me.module,
                            onBeforeFirstRender: item.onBeforeFirstRender,
                        });
                        m.methodFactory.methods = item.methods;
                    })
                }
            }
        },
        {
            name: "m_plugin_dateInput",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + '/plugins_show/dateInput/dateInput_1/css/index.css'},
                {type: "js", path: PLUGINURL + '/plugins_show/dateInput/dateInput_1/js/index.js'},
                {type: "css", path: PLUGINURL + '/plugins_show/dateInput/dateInput_2/css/index.css'},
                {type: "js", path: PLUGINURL + '/plugins_show/dateInput/dateInput_2/js/index.js'}
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "日期选择",
                plugins: [
                    {
                        name: "06001",
                        explain: "这是一个输入时间的输入框插件，通过点击输入框，自动弹出日历，日历智能获取当前时间。\n" +
                            "通过点击弹出的日历上的日期，来选取相应的时间。\n" +
                            "本插件可自定义配置项包括：背景颜色、表头颜色、本月颜色、今日颜色、他月颜色。",
                        template: `<div class="plugin-date">
		<div x-plugin='plugin_06001' Year='year' Month='month' Day='day'></div>
	</div>`,
                        data: {
                            xDate: {
                                year: "", //当前 年/月/日
                                month: "",
                                day: "",
                                show: true,
                                xDate_color: { //日历自定义颜色
                                    header_color: '#e6e6e6',
                                    bg_color: '#fff',
                                    day_color: '#555555',
                                    today_color: '#112233',
                                    month_color: '#333333',
                                },
                                xDate_day: [{ //日历头部
                                    day: "日"
                                }, {
                                    day: "一"
                                }, {
                                    day: "二"
                                }, {
                                    day: "三"
                                }, {
                                    day: "四"
                                }, {
                                    day: "五"
                                }, {
                                    day: "六"
                                }],
                                xDate_week: [] //日历日期内容
                            }
                        }
                    }, {
                        name: "06002",
                        explain: "这是一款IOS滚动日期选择插件。\n" +
                            "本插件可自定义配置项包括：字体大小、字体颜色、选择框颜色。",
                        template: `	<div class="show">
		<button e-click='show'>展示</button>
		<p>你选择的日期是：<span>{{nowDate}}</span></p>
	</div>
	<div class="plugin-select">
		<div x-plugin='Select'></div>
	</div>`,
                        data: {
                            nowDate: '周一',
                            show: false,
                            options: [{
                                date: '周一'
                            }, {
                                date: '周二'
                            }, {
                                date: '周三'
                            }, {
                                date: '周四'
                            }, {
                                date: '周五'
                            }, {
                                date: '周六'
                            }, {
                                date: '周日'
                            },],
                            select_color: '#ffffff',
                            font_color: '#000000',
                            font_size: 20
                        },
                        onReceive: function (m, data) {
                            var me = this;
                            if (m === 'm_plugin_06002') {
                                me.data.show = data.show;
                            }
                        },
                        methods: {
                            confirm: function (e, d, v) {
                                var me = this;
                                me.module.send('m_plugin_show', {nowDate: me.data.nowDate});
                                me.data.show = false;
                            },
                            cancel: function (e, d, v) {
                                var me = this;
                                me.data.show = false;
                            },
                            show: function () {
                                var me = this;
                                me.module.send('m_plugin_06002', {show: true});
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
                            parent: me.module,
                            onReceive: item.onReceive,
                        });
                        m.methodFactory.methods = item.methods;
                    })
                }
            },
        },
        {
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
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
                        explain: "这是一个折叠插件，通过点击来实现内容的折叠隐藏与显示。使页面展示效果更佳。\n" +
                            "本插件可自定义配置项包括：头部颜色、字体大小、字体颜色、折叠时间。",
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
        },
        {
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
       <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
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
                        explain: '这是一款图片放大镜插件。可以一定程度上放大鼠标选中的区域。\n' +
                            '本插件可自定义配置项包括：放大比例、颜色、透明度。',
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
        },
        {
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
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
                        explain: "这是一个输入框自动补全插件，具有较高的自定义性 ，可以改进搜索功能，搜索框输入时，可以智能补全搜索内容。\n" +
                            "本插件可自定义配置项包括：选中颜色、字体颜色。",
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
        },
        {
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
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
                        explain: "本分页插件不仅有普通插件的翻页功能，点击即跳转至目的页码，并可以直接跳转到首页或末页。更额外添加了中间页码的智能展示、记录总数展示以及总页数展示。\n" +
                            "本插件可自定义配置项包括：字体颜色、记录颜色。",
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
                        explain: "本分页插件不仅有普通插件的翻页功能，更额外添加了中间页码的智能展示，点击即跳转至目的页码。\n" +
                            "本插件需要为其添加对应模块，并且插件数据如下：\n" +
                            "本插件可自定义配置项包括：字体颜色、记录颜色。",
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
        },
        {
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
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
                        explain: "这是本系统第一个进度条插件，此插件以图形的方式来显示进度。可以通过鼠标点击来改变进度。根据用户传的数据进行渲染。\n" +
                            "本插件可自定义配置项包括：背景颜色、百分比颜色、剩余百分比颜色。",
                        template: `<div class="plugin-dragprobarHV">
        <div x-plugin="plugin_11001" dataItem="dragProBarHV" showStyle="showStyle"></div>
    </div>`,
                        data: {
                            dragProBarHV: 0.4,
                            showStyle: "horizontal",
                            width_d: window.innerWidth * 0.45,
                            small_div: {
                                color_1: "rgba(96,96,96,0.5)",
                                color_2: "#ffffff",
                                width: 10,
                                color_3: '#000000'
                            }
                        }, onBeforeFirstRender: function () {
                            var me = this;
                            me.data.small_div.color_1 = "rgba(96,96,96,0.5)";
                            me.data.small_div.color_2 = "#ffffff";
                            me.data.small_div.color_3 = "#000000";

                        }
                    }, {
                        name: "11002",
                        explain: "这是本系统第二个进度条插件，此插件显示了进度数值，以及进度的图形显示。根据用户传的数据进行渲染，根据用户选择显示百分比。\n" +
                            "本插件可自定义配置项包括：字体颜色、百分比颜色、剩余百分比颜色。",
                        template: `<div class="plugin-probar">
        <div x-plugin="plugin_11002" dataItem="proBar" showItem="percent" ></div>
    </div>`,
                        data: {
                            proBar: 0.9,
                            percent: true,
                            color_1: "#ffffff",
                            color_2: '#4A98FF',
                            color_3: '#DDDDDD'
                        }
                    }, {
                        name: "11003",
                        explain: "这是本系统第三个进度条插件，此插件为svs圆环进度插件。显示了进度数值，以及进度的图形显示，可以通过鼠标点击来改变进度。根据用户传的数据进行渲染，根据用户选择显示百分比。\n" +
                            "本插件可自定义配置项包括：百分比颜色、剩余百分比颜色。",
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
                            name: "圆环进度条",
                            r: 90,
                            r1: '',
                            r2: '',
                            per: 1,
                            color_1: '#f5f5f5',
                            color_2: '#108ee9'
                        },
                        methods: {
                            add: function () {
                                var me = this;
                                me.data.per += me.data.per > 9 ? 0 : 1;
                                me.data.r1 = me.data.per / 10 * Math.PI * 2 * me.data.r;
                                console.log(me.data.r1);
                            },
                            dele: function () {
                                var me = this;
                                me.data.per -= me.data.per < 1 ? 0 : 1;
                                me.data.r1 = me.data.per / 10 * Math.PI * 2 * me.data.r;
                            },
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
                            parent: me.module,
                            onBeforeFirstRender: item.onBeforeFirstRender
                        });
                        m.methodFactory.methods = item.methods;
                    })
                }
            },
        },
        {
            name: "m_plugin_switcher",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + "/plugins_show/switcher/button_1/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/switcher/button_1/js/index.js"},
                {type: "css", path: PLUGINURL + "/plugins_show/switcher/switcher_1/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/switcher/switcher_1/js/index.js"},
                {type: "css", path: PLUGINURL + "/plugins_show/switcher/switcher_2/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/switcher/switcher_2/js/index.js"},
                {type: "css", path: PLUGINURL + "/plugins_show/switcher/switcher_3/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/switcher/switcher_3/js/index.js"},
                {type: "css", path: "https://fonts.googleapis.com/icon?family=Material+Icons"}
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "开关",
                plugins: [
                    {
                        name: "12001",
                        explain: "这是一款模仿苹果开关的switcher插件，通过点击进行开关变换。\n" +
                            "本插件可自定义配置项包括：打开颜色、关闭颜色、按钮颜色。",
                        template: `<div class="plugin-switcher-1">
	 <div x-plugin='plugin_12001' dataItem='switcher' yes-value='yes' no-value='no' style='width:{{width_d}}px;height:{{width_d/4}}px'></div>
	</div>`,
                        data: {
                            switcher: true,
                            width_d: 300,
                            color_1: "#4BD763",
                            color_2: "#F9F9F9",
                            color_3: "#ffffff"
                        }
                    }, {
                        name: "12002",
                        explain: "这是一个3D switch插件，通过点击实现开关''on''与''off''的转换。\n" +
                            "本插件可自定义配置项包括：打开颜色、关闭颜色、背景颜色、字体颜色。",
                        template: `<div class="plugin-switcher-2">
		<div x-plugin='plugin_12002' dataValue='switcher' yes-value="yes" no-value="no" style="width:{{width_d}}px"></div>
	</div>`,
                        data: {
                            switcher: false,
                            width_d: 200,
                            small_div: {
                                color_1: "#292827",
                                color_2: "#FF9900",
                                color_3: "#FF9900",
                                color_4: "#FFFFFF"
                            }
                        }
                    }, {
                        name: "12003",
                        explain: "这是一个3D switch插件，通过点击实现开与关以及颜色变化。\n" +
                            "本插件可自定义配置项包括：打开颜色、关闭颜色。",
                        template: `<div class="plugin-switcher-3">
		<div x-plugin='plugin_12003' dataValue='switcher' yes-value="yes" no-value="no"></div>
	</div>`,
                        data: {
                            switcher: true,
                        }
                    }, {
                        name: "12004",
                        explain: "这是本系统的按钮模板插件。\n" +
                            "本插件可自定义配置项包括：一列颜色、二列颜色、三列颜色。",
                        template: `<div class="nd-plugin-button-1">
        <div x-plugin="plugin_12004" class="btn-list"></div>
    </div>`,
                        data: {
                            list_one: [{
                                value: "危险"
                            }, {
                                value: "警告"
                            }, {
                                value: "成功"
                            }],
                            list_two: [{
                                name: "删除",
                                value: "delete"
                            }, {
                                name: "编辑",
                                value: "edit"
                            }, {
                                name: "分享",
                                value: "share"
                            }],
                            list_three: [{
                                value: "keyboard_arrow_down"
                            }, {
                                value: "keyboard_arrow_up"
                            }, {
                                value: "keyboard_arrow_left"
                            }],
                            color_1: "#e53935",
                            color_2: "#e53935",
                            color_3: "#4caf50"
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
            name: "m_plugin_table",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + '/plugins_show/table/table_1/css/index.css'},
                {type: "js", path: PLUGINURL + '/plugins_show/table/table_1/js/index.js'},
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "表格",
                plugins: [
                    {
                        name: "13001",
                        explain: "这是一个表格插件，具有‘新增’、‘修改’、‘删除’、‘查询’、‘全选’以及‘翻页’等功能。\n" +
                            "本插件可自定义配置项包括：字体颜色、按钮颜色。",
                        template: `<div class='el-plugin-table-1'>
        <div x-plugin='plugin_13001' class='plugin' x-model='table'>
        </div>
    </div>`,
                        data: {
                            aa: 1,
                            d: [1, 2, 3],
                            table: {
                                show_reverse: false,
                                check_all: false,
                                thead: [{name: '姓名'}, {name: '年龄'}, {name: '身高'}, {name: '体重'}, {name: '学历'}, {name: '工作经历'}],
                                reverse: [{name: '姓名', field: ''}, {name: '年龄', field: ''}, {
                                    name: '身高',
                                    field: ''
                                }, {name: '体重', field: ''}, {name: '学历', field: ''}, {name: '工作经历', field: ''}],
                                th: [{
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 100}, {ct: '171'}, {ct: '53'}, {ct: '本科'}, {ct: '2年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 101}, {ct: '173'}, {ct: '53'}, {ct: '本科'}, {ct: '1年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 107}, {ct: '172'}, {ct: '53'}, {ct: '本科'}, {ct: '5年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 102}, {ct: '173'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: true,
                                    td: [{ct: '张三'}, {ct: 101}, {ct: '173'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 128}, {ct: '177'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 128}, {ct: '175'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 128}, {ct: '178'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 128}, {ct: '173'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 128}, {ct: '179'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 128}, {ct: '173'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 128}, {ct: '173'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }, {
                                    check: false,
                                    td: [{ct: '张三'}, {ct: 128}, {ct: '173'}, {ct: '53'}, {ct: '本科'}, {ct: '3年'}]
                                }],
                            }
                        }, methods: {
                            clear: function (obj) {
                                var me = this;
                                for (var i in obj) {
                                    if (obj.hasOwnProperty(i) && i.indexOf('$') === -1) {
                                        if (typeof obj[i] === 'object') {
                                            if (obj[i] instanceof Array) {
                                                obj[i].forEach(function (it, index, arr) {
                                                    if (typeof it === 'object') {
                                                        me.module.methodFactory.methods.clear.call(me, it);
                                                    }
                                                    else {
                                                        arr[index] = '';
                                                    }
                                                    return;
                                                });
                                            } else {
                                                me.module.methodFactory.methods.clear.call(me, obj[i]);
                                            }
                                        } else {
                                            obj[i] = '';
                                        }
                                    }
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
                        m.methodFactory.methods = item.methods;
                    })
                }
            },
        },
        {
            name: "m_plugin_tree",
            // templateUrl: HTMLURL + '/plugin_list/plugin_type/plugin_type.html',
            delayInit: true,
            requires: [
                {type: "css", path: PLUGINURL + "/plugins_show/tree/tree_1/css/index.css"},
                {type: "js", path: PLUGINURL + "/plugins_show/tree/tree_1/js/index.js"},
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
        <div class='plugin-explain'>
            <p>插件说明:</p>
            <p class='explain'>` + i.explain + `</p>
         </div>
    </div>
    `;
                });
                props.template = tem + `</div>`;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "菜单树",
                plugins: [
                    {
                        name: "14001",
                        explain: "这是本系统的一个Tree插件，可以通过CSS定制外观，指定文件树展开图标，可以自己定义展开／收缩事件、加载信息等。\n" +
                            "本插件可自定义配置项包括：字体颜色、选中颜色。",
                        template: `<div class="el-tree">
		<div x-plugin="tree"  class="content"></div>
	</div>`,
                        data: {
                            one: 1,
                            arr: [{
                                click: false,
                                txt: "parent-1",
                                show: true,
                                arr: [{
                                    click: false,
                                    txt: "child-1",
                                    show: false,
                                    arr: [{
                                        click: false,
                                        txt: "child-1-1",
                                        show: false
                                    }, {
                                        click: false,
                                        txt: "child-1-2",
                                        show: false
                                    }]
                                }, {
                                    click: false,
                                    txt: "child-2",
                                    show: false
                                }, {
                                    click: false,
                                    txt: "child-3",
                                    show: false
                                }, {
                                    click: false,
                                    txt: "child-4",
                                    show: false
                                }]
                            }, {
                                click: false,
                                txt: "parent-2",
                                show: true
                            }, {
                                click: false,
                                txt: "parent-3",
                                show: true
                            }, {
                                click: false,
                                txt: "parent-4",
                                show: true
                            }]
                        },
                        methods: {
                            show: function (e, d, v) {
                                var me = this;
                                if (d.arr) {
                                    d.arr.forEach(function (i) {
                                        i.show = !i.show
                                        //可以全部展开 此方法
                                        // me.module.methodFactory.methods.show.call(me, e, i, v);
                                    });
                                }
                            },
                            check: function (e, d, v) {
                                var me = this;
                                d.click = !d.click;
                                me.module.methodFactory.methods.checkall.call(me, d);
                            },
                            checkall: function (d) {
                                var me = this;
                                // d.click=!d.click;
                                if (d.arr) {
                                    d.arr.forEach(function (i) {
                                        i.click = d.click;
                                        if (i.arr) {
                                            me.module.methodFactory.methods.checkall.call(me, i);
                                        }

                                    })
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
                        m.methodFactory.methods = item.methods;
                    })
                }
            },
        }]);
}());