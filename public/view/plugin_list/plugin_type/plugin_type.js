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
                                <div class="plugin-name">{{name}}插件</div>
                                <p class="explain">本章节主要介绍插件库选择地址插件，主要用于定位，选择所属省份等。</p>`;
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
                                <div class="plugin-name">{{name}}插件</div>
                                <p class="explain">本章节主要介绍缓冲动画插件，用户可根据需求选择不同类型，主要用途为：当请求数据时，会有一段时间的空白，使用缓冲动画插件，可提高用户体验。</p>`;
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
                                <div class="plugin-name">{{name}}插件</div>
                                <p class="explain">本章节主要介绍插件库轮播图插件，用于展示或者推广广告。主要有以下几种类型。</p>`;
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
                            "本插件可自定义配置项包括：轮播颜色、初始颜色、圆圈显示还是方块显示、提示长度、提示高度、提示颜色、轮播时间、轮播方向（方向左、方向右）。",
                        template: `<div class="el-photo">
                                        <div x-plugin='plugin_03001' class='plugin' dataName="carousel_data"></div>
                                    </div> `,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-carousel-1" <span class="attr">x-plugin</span>="carousel" <span class="attr">dataName</span>="carousel_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'carousel_1',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-carousel-1',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            carousel_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  width: 10,</span>      <span class="comment">/*轮播图提示位置大小*/</span></pre>
                                    <pre><span>                  check_color: "#ff0000",</span>      <span class="comment">/*轮播图提示当前位置显示颜色*/</span></pre>
                                    <pre><span>                  translate: false,</span>      <span class="comment">/*是否可点击*/</span></pre>
                                    <pre><span>                  imgs: [</span>      <span class="comment">/*轮播图图片数组*/</span></pre>
                                    <pre><span>                        {url: '*****'}</span>      <span class="comment">/*轮播图有几张图片就有几个{url,'*****'}*/</span></pre>
                                    <pre><span>                  ],</span></pre>
                                    <pre><span>                  right: true,</span>      <span class="comment">/*轮播图向右滑动还是向左滑动*/</span></pre>
                                    <pre><span>                  is_circle: true</span>      <span class="comment">/*轮播图提示当前位置是否为圆圈*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            name: '',
                            carousel_data: {
                                width: 10,
                                check_color: '#ff0000',   //可修改选中颜色
                                translate: false,
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/4.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_1/img/5.jpg'}],
                                right: true,   // 向右滑动还是向左滑动
                                is_circle: true  // 是否为圆圈
                            }
                        },
                        onBeforeFirstRender: function () {
                            var me = this;
                            me.data.name = "常见轮播图";
                        }
                    }, {
                        name: "03002",
                        explain: "这是一个由四张图片组成的左右轮播图插件，通过每张图片的左右旋转，实现图片的动态轮播。轮播是定时自动左右旋转轮播，还可通过点击左右键来控制轮播方向。\n" +
                            "本插件可自定义配置项包括：轮播颜色、初始颜色、圆圈显示还是方块显示、提示长度、提示高度、提示颜色、轮播时间、轮播方向（方向左、方向右）。",
                        template: `<div class="carous_ct">
		                                <div x-plugin="plugin_03002" class='plugin' dataName="carousel_data"></div>
	                                </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-carousel-2" <span class="attr">x-plugin</span>="carousel" <span class="attr">dataName</span>="carousel_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'carousel_2',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-carousel-2',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            carousel_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  width: 10,</span>      <span class="comment">/*轮播图提示位置大小*/</span></pre>
                                    <pre><span>                  check_color: "#00FF00",</span>      <span class="comment">/*轮播图提示当前位置显示颜色*/</span></pre>
                                    <pre><span>                  translate: false,</span>      <span class="comment">/*是否可点击*/</span></pre>
                                    <pre><span>                  imgs: [</span>      <span class="comment">/*轮播图图片数组*/</span></pre>
                                    <pre><span>                        {url: '*****'}</span>      <span class="comment">/*轮播图有几张图片就有几个{url,'*****'}*/</span></pre>
                                    <pre><span>                  ],</span></pre>
                                    <pre><span>                  right: true,</span>      <span class="comment">/*轮播图向右滑动还是向左滑动*/</span></pre>
                                    <pre><span>                  is_circle: true</span>      <span class="comment">/*轮播图提示当前位置是否为圆圈*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            width_data: '',
                            name: '',
                            carousel_data: {
                                width: 10,
                                translate: false,
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/4.jpg'}
                                ],
                                is_circle: false,
                                right: false,
                                check_color: '#00FF00',
                            }
                        }, onBeforeFirstRender: function () {
                            var me = this;
                            me.data.name = "水平旋转";
                            // me.data.img_ct.spans.forEach(function (i) {
                            //     i.width = me.data.small_div.width;
                            //     i.height = me.data.small_div.height;
                            // });
                            // me.data.img_ct.$set("spans", me.data.img_ct.spans);
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
                        }, onRender: function () {
                            var me = this;
                            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
                            me.data.width_data = window.innerWidth * 0.5;
                        }
                    }, {
                        name: "03003",
                        explain: '这是一个由四张图片组成的竖直轮播图插件，通过每张图片的竖直旋转，实现图片的动态轮播。轮播是定时自动竖直旋转轮播。\n' +
                            '本插件可自定义配置项包括：轮播颜色、初始颜色、圆圈显示还是方块显示、提示长度、提示高度、提示颜色、轮播时间、轮播方向（方向上、方向下）。',
                        template: `<div class="el-plugin">
                                        <div x-plugin="plugin_03003" class='plugin' dataName="carousel_data"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-carousel-3" <span class="attr">x-plugin</span>="carousel" <span class="attr">dataName</span>="carousel_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'carousel_3',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-carousel-3',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            carousel_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  width: 10,</span>      <span class="comment">/*轮播图提示位置大小*/</span></pre>
                                    <pre><span>                  check_color: "#ff6800",</span>      <span class="comment">/*轮播图提示当前位置显示颜色*/</span></pre>
                                    <pre><span>                  translate: false,</span>      <span class="comment">/*是否可点击*/</span></pre>
                                    <pre><span>                  imgs: [</span>      <span class="comment">/*轮播图图片数组*/</span></pre>
                                    <pre><span>                        {url: '*****'}</span>      <span class="comment">/*轮播图有几张图片就有几个{url,'*****'}*/</span></pre>
                                    <pre><span>                  ],</span></pre>
                                    <pre><span>                  up: false,</span>      <span class="comment">/*轮播图向右滑动还是向左滑动*/</span></pre>
                                    <pre><span>                  is_circle: true</span>      <span class="comment">/*轮播图提示当前位置是否为圆圈*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            width_data: '',
                            name: '',
                            carousel_data: {
                                width: 10,
                                translate: false,
                                imgs: [
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/2.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/3.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_2/img/4.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/1.jpg'},
                                    {url: PLUGINURL + '/plugins_show/carousel/carousel_3/img/2.jpg'}
                                ],
                                is_circle: true,
                                up: false,
                                check_color: '#ff6800',
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
                        }, onRender: function () {
                            var me = this;
                            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
                            me.data.width_data = window.innerWidth * 0.5;
                        },
                    }, {
                        name: "03004",
                        explain: "这是一个由四张大图，16张小图组成的竖直轮播图插件，通过每四张图片的竖直旋转拼合，实现图片的动态轮播。轮播是定时自动竖直旋转轮播。\n" +
                            "本插件可自定义配置项包括：轮播颜色、初始颜色、圆圈显示还是方块显示、提示宽度、提示高度、提示颜色、轮播时间、轮播方向（方向上、方向下）。",
                        template: ` <div class="el-plugin">
                                        <div x-plugin="plugin_03004" class='plugin' dataName="carousel_data"></div>
                                     </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-carousel-4" <span class="attr">x-plugin</span>="carousel" <span class="attr">dataName</span>="carousel_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'carousel_4',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-carousel-4',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            carousel_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  width: 10,</span>      <span class="comment">/*轮播图提示位置大小*/</span></pre>
                                    <pre><span>                  check_color: "#ffff00",</span>      <span class="comment">/*轮播图提示当前位置显示颜色*/</span></pre>
                                    <pre><span>                  translate: false,</span>      <span class="comment">/*是否可点击*/</span></pre>
                                    <pre><span>                  imgs: [{</span>      <span class="comment">/*轮播图图片数组*/</span></pre>
                                    <pre><span>                        img_item:[{</span>      <span class="comment">/*轮播图有几张图片就有几个img_item*/</span></pre>
                                    <pre><span>                              url: '*****'</span>      <span class="comment">/*一张图片分为及部分，就有几个{url,'*****'}*/</span></pre>
                                    <pre><span>                        }]</span></pre>
                                    <pre><span>                  }],</span></pre>
                                    <pre><span>                  up: true,</span>      <span class="comment">/*轮播图向上滑动还是向下滑动*/</span></pre>
                                    <pre><span>                  is_circle: true</span>      <span class="comment">/*轮播图提示当前位置是否为圆圈*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            base_url: '/plugin_set/public/view/plugin_download/carouse_4/img/',
                            width_data: '',
                            name: '',
                            carousel_data: {
                                one: true,
                                width: 10,
                                translate: false,
                                imgs: [{
                                    img_item: [{url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/4.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/8.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/12.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/16.jpg'}]
                                }, {
                                    img_item: [{url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/3.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/7.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/11.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/15.jpg'}]
                                }, {
                                    img_item: [{url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/2.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/6.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/10.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/14.jpg'}]
                                }, {
                                    img_item: [{url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/1.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/5.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/9.jpg'}, {url: PLUGINURL + '/plugins_show/carousel/carousel_4/img/13.jpg'}]
                                }],
                                is_circle: true,
                                check_color: '#ffff00',
                                up: true
                            },
                            up: false,
                            down: true,
                        }, onBeforeFirstRender: function () {
                            var me = this;
                            me.data.name = "3d轮播图";
                            me.data.carousel_data.imgs.forEach(function (i, inde) {
                                i.img_item.forEach(function (item, index) {
                                    //图片url地址赋值
                                    item.url = me.data.base_url + ((index + 1) * 4 - inde) + '.jpg';
                                });
                            });

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
                {type: 'css', path: PLUGINURL + '/plugins_show/checkBox/checkbox_1/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/checkBox/checkbox_1/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/checkBox/checkbox_2/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/checkBox/checkbox_2/js/index.js'},

                {type: 'css', path: PLUGINURL + '/plugins_show/checkBox/checkbox_3/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/checkBox/checkbox_3/js/index.js'},
                {type: 'css', path: PLUGINURL + '/plugins_show/checkBox/checkbox_4/css/index.css'},
                {type: 'js', path: PLUGINURL + '/plugins_show/checkBox/checkbox_4/js/index.js'}
            ], onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
                                <div class="plugin-name">{{name}}插件</div>
                                <p class="explain">本章节主要介绍checkBox插件，通过点击实现选中与未选中，主要有以下四种类型。</p>`;
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
                        explain: "可自定义配置项包括：选中颜色、未选中颜色、空白区域颜色、是圆圈还是正方形、checkBox大小。",
                        template: `<div class="nd-plugin-check-1">
                                        <div x-plugin="plugin_04001" dataName="check_data"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-check-1" <span class="attr">x-plugin</span>="check" <span class="attr">dataName</span>="check_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'check_1',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-check-4',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            check_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  check_color: '#26a2ff',</span>      <span class="comment">/*选择框选中颜色*/</span></pre>
                                    <pre><span>                  no_check_color: '#ffffff',</span>      <span class="comment">/*选择框未选中颜色*/</span></pre>
                                    <pre><span>                  empty_color: '#cccccc',</span>      <span class="comment">/*空白区域颜色*/</span></pre>
                                    <pre><span>                  is_circle: true,</span>      <span class="comment">/*是否为圆圈*/</span></pre>
                                    <pre><span>                  size: 10,</span>      <span class="comment">/*选择框宽度、高度*/</span></pre>
                                    <pre><span>                  is_check: true</span>      <span class="comment">/*选择框是否选中*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            name: '普通选择框',
                            check_data : {
                                check_color: '#26a2ff',
                                no_check_color: '#ffffff',
                                empty_color: '#cccccc',
                                is_check: true,
                                is_circle: true,
                                size: 20
                            }
                        },
                        onBeforeFirseRender: function () {
                            var me = this;
                        },
                    }, {
                        name: '04002',
                        explain: "可自定义配置项包括：选中颜色、未选中颜色、checkBox大小。",
                        template: `<div class="nd-plugin-check">
                                        <div class="content-check" x-plugin="plugin_04002" dataName="check_data"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-check-2" <span class="attr">x-plugin</span>="check" <span class="attr">dataName</span>="check_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'check_2',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-check-2',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            check_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  check_color: '#26a2ff',</span>      <span class="comment">/*选择框选中颜色*/</span></pre>
                                    <pre><span>                  no_check_color: '#aaaaaa',</span>      <span class="comment">/*选择框未选中颜色*/</span></pre>
                                    <pre><span>                  size: 30,</span>      <span class="comment">/*选择框宽度、高度*/</span></pre>
                                    <pre><span>                  is_check: true</span>      <span class="comment">/*选择框是否选中*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            name: 'check02',
                            check_data : {
                                check_color: '#26a2ff',
                                no_check_color: '#aaaaaa',
                                is_check: true,
                                size: 30
                            }
                        },
                        onBeforeFirseRender: function () {
                            var me = this;
                        },
                    },{
                        name: '04003',
                        explain: "可自定义配置项包括：选中颜色、不选颜色、checkBox大小。",
                        template: `<div class="nd-plugin-check">
                                        <div class="content-check" x-plugin="plugin_04003" dataName="check_data"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-check-3" <span class="attr">x-plugin</span>="check" <span class="attr">dataName</span>="check_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'check_3',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-check-3',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            check_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  check_color: '#26a2ff',</span>      <span class="comment">/*选择框选中颜色*/</span></pre>
                                    <pre><span>                  no_check_color: '#000000',</span>      <span class="comment">/*选择框未选中颜色*/</span></pre>
                                    <pre><span>                  size: 30,</span>      <span class="comment">/*选择框宽度、高度*/</span></pre>
                                    <pre><span>                  is_check: true</span>      <span class="comment">/*选择框是否选中*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            name: 'check03',
                            check_data : {
                                check_color: '#26a2ff',
                                no_check_color: '#000000',
                                is_check: true,
                                size: 30
                            }
                        },
                        onBeforeFirseRender: function () {
                            var me = this;
                        },
                    },{
                        name: '04004',
                        explain: "可自定义配置项包括：选中颜色、不选颜色、checkBox大小。",
                        template: `<div class="nd-plugin-check">
                                        <div class="content-check" x-plugin="plugin_04004" dataName="check_data"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-check-4" <span class="attr">x-plugin</span>="check" <span class="attr">dataName</span>="check_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'check_4',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-check-4',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            check_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  check_color: '#26a2ff',</span>      <span class="comment">/*选择框选中颜色*/</span></pre>
                                    <pre><span>                  no_check_color: '#aaaaaa',</span>      <span class="comment">/*选择框未选中颜色*/</span></pre>
                                    <pre><span>                  size: 30,</span>      <span class="comment">/*选择框宽度、高度*/</span></pre>
                                    <pre><span>                  is_check: true</span>      <span class="comment">/*选择框是否选中*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            name: 'check04',
                            check_data : {
                                check_color: '#26a2ff',
                                no_check_color: '#aaaaaa',
                                is_check: true,
                                size: 30
                            }
                        },
                        onBeforeFirseRender: function () {
                            var me = this;
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
                name: "颜色选择",
                plugins: [{
                    name: "05001",
                    explain: "这是本系统的一款颜色选择器插件。拥有多个参数可供调节，所选颜色区域也更多。\n" +
                        "本插件可自定义配置项包括：颜色选择。",
                    template: `<div class="el-color-picker-1">
                                    <div x-plugin="plugin_05001" class="plugin-color"></div>
                                    <div class="input">
                                         <div style="background-color:{{str}}" class="input"></div>
                                        <div class="select" e-click="select">选择</div>
                                    </div>
                                </div>`,
                    htmlcode: ``,
                    jscode: ``,
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
                name: "日期选择",
                plugins: [
                    {
                        name: "06001",
                        explain: "这是一个输入时间的输入框插件，通过点击输入框，自动弹出日历，日历智能获取当前时间。\n" +
                            "通过点击弹出的日历上的日期，来选取相应的时间。\n" +
                            "本插件可自定义配置项包括：背景颜色、表头颜色、本月颜色、今日颜色、他月颜色。",
                        template: `<div class="plugin-date">
                                       <div x-plugin='plugin_06001' dataName="date_data"></div>
                                   </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-date" <span class="attr">x-plugin</span>="plugin_date" <span class="attr">dataName</span>="date_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'date_date',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-date',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            date_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  year: '',</span>      <span class="comment">/*日期插件初始化年份*/</span></pre>
                                    <pre><span>                  month: '',</span>      <span class="comment">/*日期插件初始化月份*/</span></pre>
                                    <pre><span>                  day: '',</span>      <span class="comment">/*日期插件初始化天*/</span></pre>
                                    <pre><span>                  xDate_color: {</span>      <span class="comment">/*日期插件可配置颜色对象*/</span></pre>
                                    <pre><span>                        header_color: '#e6e6e6',</span>      <span class="comment">/*日期插件头部可配置颜色*/</span></pre>
                                    <pre><span>                        bg_color: '#fff',</span>      <span class="comment">/*日期插件背景可配置颜色*/</span></pre>
                                    <pre><span>                        day_color: '#555555',</span>      <span class="comment">/*日期插件其他月份颜色*/</span></pre>
                                    <pre><span>                        today_color: '#112233',</span>      <span class="comment">/*日期插件当天选中的颜色*/</span></pre>
                                    <pre><span>                        month_color: '#333333',</span>      <span class="comment">/*日期插件当月每天可配置颜色*/</span></pre>
                                    <pre><span>                  },</span></pre>
                                    <pre><span>                  xDate_day: [{day:'日'},{day:'一'}{day:'二'}{day:'三'}{day:'四'}{day:'五'}{day:'六'}],</span>      <span class="comment">/*日期插件星期几*/</span></pre>
                                    <pre><span>                  xDate_week: []</span>      <span class="comment">/*日历日期内容*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            date_data: {
                                year: "", //当前 年/月/日
                                month: "",
                                day: "",
                                show: false,
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
                                        <button e-click='show'>选择时间</button>
                                        <p>你选择的日期是：<span>{{nowDate}}</span></p>
                                    </div>
                                    <div class="plugin-select">
                                        <div x-plugin='Select' dataName="date_date"></div>
                                    </div>`,
                        htmlcode:  ``,
                        jscode: ``,
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
                            "本插件可自定义配置项包括：头部内容、头部背景颜色、头部字体大小、头部字体颜色，具体内容、具体内容背景颜色、具体内容字体大小、具体内容字体颜色、折叠时间。",
                        template: `<div class="plugin-collapse">
                                        <div x-plugin="plugin_07001" dataName="collapse_data"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="collapse" <span class="attr">x-plugin</span>="collapse" <span class="attr">dataName</span>="collapse_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'collapse',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-collapse',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            collapse_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  time: 0.5,</span>      <span class="comment">/*折叠动画时间*/</span></pre>
                                    <pre><span>                  isCollapse: true,</span>      <span class="comment">/*折叠插件是打开状态还是折叠状态*/</span></pre>
                                    <pre><span>                  heading: '点击展开，再次点击折叠',</span>      <span class="comment">/*插件头部文字信息*/</span></pre>
                                    <pre><span>                  content: 'NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。',</span>      <span class="comment">/*插件具体内容信息*/</span></pre>
                                    <pre><span>                  head_color: '#f5f5f5',</span>      <span class="comment">/*折叠插件头部背景颜色*/</span></pre>
                                    <pre><span>                  content_color: '#FFFFFF',</span>      <span class="comment">/*插件具体内容背景颜色*/</span></pre>
                                    <pre><span>                  head_font_size: 16,</span>      <span class="comment">/*折叠插件头部字体大小*/</span></pre>
                                    <pre><span>                  content_font_size: 14,</span>      <span class="comment">/*插件具体内容字体大小*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            collapse_data: {
                                time: 0.5,
                                isCollapse: true,
                                heading: '点击展开，再次点击折叠',
                                content: "NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。",
                                head_color: '#f5f5f5',
                                content_color: '#FFFFFF',
                                head_font_size: 16,
                                content_font_size: 14
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
                        explain: '这是一款图片放大镜插件。可以一定程度上放大鼠标选中的区域。本插件可自定义配置项包括：放大比例、颜色、透明度、图片路径。在使用时，需定义图片标签的父元素标签的大小（width、height）。',
                        template: `<div class="el-plugin">
                                        <div x-plugin='plugin_08001' class='plugin' dataName="photo_to_big"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-photo-to-big" <span class="attr">x-plugin</span>="photo_to_big" <span class="attr">dataName</span>="photo_to_big_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'photo_to_big',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-photo-to-big',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            photo_to_big_data: {</span>      <span class="comment">/*插件绑定的容器中，绑定的数据对象的名称*/</span></pre>
                                    <pre><span>                  small_img: '*****',</span>      <span class="comment">/*图片放大镜插件小图片路径*/</span></pre>
                                    <pre><span>                  big_img: '*****',</span>      <span class="comment">/*图片放大镜插件大图片路径*/</span></pre>
                                    <pre><span>                  radio: '2',</span>      <span class="comment">/*图片放大镜放大比例*/</span></pre>
                                    <pre><span>                  mark_color: '#666666',</span>      <span class="comment">/*图片放大镜遮罩层颜色*/</span></pre>
                                    <pre><span>                  mark_opacity: 0.2,</span>      <span class="comment">/*图片放大镜遮罩层透明度*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            photo_to_big: {
                                small_img: PLUGINURL + '/plugins_show/imgShow/magn_1/img/small.jpg',
                                big_img: PLUGINURL + '/plugins_show/imgShow/magn_1/img/big.jpg',
                                radio: 2,
                                mark_color: '#666666',
                                mark_opacity: '0.2'
                            }
                        }
                    }
                ]
            },
            onBeforeFirstRender: function () {
                var me = this;
                // if (!me.data.hasCreated) {
                    me.module.methodFactory.methods.createModules.call(me);
                    // me.data.hasCreated = true;
                // }
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
                                <div class="plugin-name">{{name}}插件</div>
                                <p class='explain'>因分页插件应用场景的不同，当当前页发生变化时，需要请求数据，因此需要在插件模块中定义updatePage函数，具体用法详见<a href="http://www.nodom.org">NoDom官网</a>模块中方法的使用</p>`;
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
                        explain: "本分页插件不仅有普通插件的翻页功能，点击即跳转至目的页码，并可以直接跳转到首页或末页。更额外添加了中间页码的智能展示、记录总数展示以及总页数展示。本插件可自定义配置项包括：页数颜色（总页数、总条数、当前页）、当前页、每页条数、跳转页数、总条数。",
                        template: `<div class="plugin-page">
                                        <div x-plugin="plugin_10001"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-paging" <span class="attr">x-plugin</span>="paging_big"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'paging',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-paging',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            page: 1,</span>      <span class="comment">/*分页插件当前页*/</span></pre>
                                    <pre><span>            row: 10,</span>      <span class="comment">/*分页插件每页条数*/</span></pre>
                                    <pre><span>            total: 30,</span>      <span class="comment">/*分页插件总条数*/</span></pre>
                                    <pre><span>            to_page: 1</span>      <span class="comment">/*分页插件需跳转页数*/</span></pre>
                                    <pre><span>            page_color: '#FF0000'</span>      <span class="comment">/*分页插件页数颜色*/</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            page: 1,
                            row: 10,
                            total: 50,
                            to_page: 1,
                            allpage: 3,
                            page_color: '#FF0000'
                        }

                    }, {
                        name: "10002",
                        explain: "分页插件不仅有普通插件的翻页功能，更额外添加了中间页码的智能展示，点击即跳转至目的页码。分页插件需配置当前页、跳转页、总页数。",
                        template: `<div class="plugin-page">
                                        <div x-plugin="plugin_10002" dataItem='page'></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>="plugin-paging" <span class="attr">x-plugin</span>="paging_big" <span class="attr">dataName</span>="paging_data"><<span class="element">/div></span></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'paging',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-paging',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            paging_data: {</span>      <span class="comment">/*分页插件当前页*/</span></pre>
                                    <pre><span>                  pre_page: 1,</span>      <span class="comment">/*分页插件当前页*/</span></pre>
                                    <pre><span>                  go_page: 1,</span>      <span class="comment">/*分页插件需跳转页数*/</span></pre>
                                    <pre><span>                  all_page: 16,</span>      <span class="comment">/*分页插件总页数*/</span></pre>
                                    <pre><span>                  page_rows: []</span>      <span class="comment">/*插件渲染需要，只需传入空数组*/</span></pre>
                                    <pre><span>            }</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
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
                        explain: "使用此进度条需设置绑定x-plugin标签父元素的宽度及高度，这样进度条的宽度及高度根据父元素进行适配。可以通过鼠标点击来改变进度。用户可选择是横向进度条还是纵向进度条，然后传入不同参数。本插件可自定义配置项包括：背景颜色、百分比颜色、剩余百分比颜色、提示圆圈颜色，是否显示百分比数字等参数。",
                        template: `<div class="plugin-dragprobar-HV" style="width: 300px;height: 50px;margin: 0 auto;">
                                        <div x-plugin="plugin_11001" process="drag_pro_bar_process" showStyle="show_style" processBoxBg="process_box_bg" 
                                        percentColor="percent_color" processBg="process_bg" dragBtnWidth="drag_btn_width" dragBtnColor="drag_btn_color"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>='plugin-dragprobarHV' <span class="attr">style</span>="width: 300px;height: 50px;"></pre>
                                        <pre>      <<span class="element">div</span> <span class="attr">class</span>="plugin-process" <span class="attr">x-plugin</span>="process" <span class="attr">process</span>="drag_pro_bar_process" <span class="attr">showStyle</span>="show_style" <span class="attr">processBoxBg </span>="process_box_bg" <span class="attr">percentColor </span>="percent_color" <span class="attr">processBg</span>="process_bg" <span class="attr">dragBtnWidth</span>="drag_btn_width" <span class="attr">dragBtnColor</span>="drag_btn_color"><<span class="element">/div></span></pre>
                                        <pre><<span class="element">/div</span>></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'process',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-process',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            drag_pro_bar_process: 0.4,</span>      <span class="comment">/*当前进度条比例*/</span></pre>
                                    <pre><span>            show_style: 'horizontal',</span>      <span class="comment">/*是横向显示还是纵向显示，横向：horizontal，纵向：vertical*/</span></pre>
                                    <pre><span>            process_box_bg: 'rgba(96,96,96,0.5)',</span>      <span class="comment">/*进度条盒子背景*/</span></pre>
                                    <pre><span>            percent_color: '#ffffff',</span>      <span class="comment">/*进度条已占比例颜色*/</span></pre>
                                    <pre><span>            drag_btn_width: 10,</span>      <span class="comment">/*进度条圆点大小*/</span></pre>
                                    <pre><span>            process_bg: '#000000',</span>      <span class="comment">/*整个进度条颜色*/</span></pre>
                                    <pre><span>            drag_btn_color: '#00ff00'</span>      <span class="comment">/*进度条圆点颜色*/</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            drag_pro_bar_process: 0.4,
                            show_style: "horizontal",
                            process_box_bg: "rgba(96,96,96,0.5)",
                            percent_color: "#ffffff",
                            drag_btn_width: 10,
                            process_bg: '#000',
                            drag_btn_color: '#00ff00'
                        }
                    }, {
                        name: "11002",
                        explain: "这是本系统第二个进度条插件，此插件显示了进度数值，以及进度的图形显示。本插件可自定义配置项包括：显示小数还是百分数、所占比例、字体颜色、百分比颜色、剩余百分比颜色。",
                        template: `<div class="plugin-probar" style="width: 300px;height: 20px;margin: 0 auto;">
                                        <div x-plugin="plugin_11002" dataItem="proBar" showItem="percent" processBgColor="process_bg_color" processPercentColor="process_percent_color" processPercentNum="process_percent_num_color"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>='plugin-dragprobarHV' <span class="attr">style</span>="width: 300px;height: 20px;"></pre>
                                        <pre>      <<span class="element">div</span> <span class="attr">class</span>="plugin-process" <span class="attr">x-plugin</span>="proBar" <span class="attr">dataItem</span>="proBar" <span class="attr">showItem</span>="percent" <span class="attr">processBgColor</span>="process_bg_color" <span class="attr">processPercentColor</span>="process_percent_color" <span class="attr">processPercentNumColor</span>="process_percent_num_color"><<span class="element">/div></span></pre>
                                        <pre><<span class="element">/div</span>></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'process',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-process',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            proBar: 0.9,</span>      <span class="comment">/*当前进度条比例*/</span></pre>
                                    <pre><span>            percent: true,</span>      <span class="comment">/*显示小数还是百分比，true显示百分比，false显示小数*/</span></pre>
                                    <pre><span>            process_percent_num_color: '#ffffff',</span>      <span class="comment">/*进度条比例数字颜色*/</span></pre>
                                    <pre><span>            process_percent_color: '#4A98FF',</span>      <span class="comment">/*进度条已占比例颜色*/</span></pre>
                                    <pre><span>            process_bg_color: '#DDDDDD'</span>      <span class="comment">/*进度条未占比例颜色*/</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
                        data: {
                            proBar: 0.9,
                            percent: true,
                            process_percent_num_color: "#ffffff",
                            process_percent_color: '#4A98FF',
                            process_bg_color: '#DDDDDD'
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
                                        <div style="color: red">修改</div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>='plugin-dragprobarHV' <span class="attr">style</span>="width: 300px;height: 20px;"></pre>
                                        <pre>      <<span class="element">div</span> <span class="attr">class</span>="plugin-process" <span class="attr">x-plugin</span>="proBar" <span class="attr">dataItem</span>="proBar" <span class="attr">showItem</span>="percent" <span class="attr">processBgColor</span>="process_bg_color" <span class="attr">processPercentColor</span>="process_percent_color" <span class="attr">processPercentNumColor</span>="process_percent_num_color"><<span class="element">/div></span></pre>
                                        <pre><<span class="element">/div</span>></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'process',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-process',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            proBar: 0.9,</span>      <span class="comment">/*当前进度条比例*/</span></pre>
                                    <pre><span>            percent: true,</span>      <span class="comment">/*显示小数还是百分比，true显示百分比，false显示小数*/</span></pre>
                                    <pre><span>            process_percent_num_color: '#ffffff',</span>      <span class="comment">/*进度条比例数字颜色*/</span></pre>
                                    <pre><span>            process_percent_color: '#4A98FF',</span>      <span class="comment">/*进度条已占比例颜色*/</span></pre>
                                    <pre><span>            process_bg_color: '#DDDDDD'</span>      <span class="comment">/*进度条未占比例颜色*/</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>
                                </pre>`,
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
                        explain: "这是一款模仿苹果开关的switcher插件，通过点击进行开关变换。使用插件时需设置插件渲染容器父元素的宽度、高度，switcher插件根据父元素宽度、高度自适应设置自己的高度、宽度，本插件可自定义配置项包括：打开颜色、关闭颜色、按钮颜色。",
                        template: `<div class="plugin-switcher-1" style="width: 50px;height: 30px;">
                                        <div x-plugin='plugin_12001' dataItem='switcher' openColor="open_color" closeColor="close_color" btnColor="btn_color"></div>
                                   </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>='plugin-switcher-1' <span class="attr">style</span>="width: 50px;height: 30px;"></pre>
                                        <pre>      <<span class="element">div</span> <span class="attr">class</span>="plugin-switcher" <span class="attr">x-plugin</span>="switcher" <span class="attr">dataItem</span>="switcher" <span class="attr">openColor</span>="open_color" <span class="attr">closeColor</span>="close_color" <span class="attr">btnColor</span>="btn_color"><<span class="element">/div></span></pre>
                                        <pre><<span class="element">/div</span>></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'switcher',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-switcher',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            switcher: true,</span>      <span class="comment">/*开关状态*/</span></pre>
                                    <pre><span>            open_color: '#4BD763',</span>      <span class="comment">/*开关打开时颜色*/</span></pre>
                                    <pre><span>            close_color: "#F9F9F9",</span>      <span class="comment">/*开关关闭时颜色*/</span></pre>
                                    <pre><span>            btn_color: "#ffffff"</span>      <span class="comment">/*开关按钮颜色*/</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>`,
                        data: {
                            switcher: true,
                            open_color: "#4BD763",
                            close_color: "#F9F9F9",
                            btn_color: "#ffffff"
                        }
                    }, {
                        name: "12002",
                        explain: "这是一个3D switch插件，通过点击实现开关''on''与''off''的转换。本插件可自定义配置项包括：打开颜色、关闭颜色、背景颜色、字体颜色。",
                        template: `<div class="plugin-switcher-2">
                                        <div x-plugin='plugin_12002' dataValue='switcher' bgColor="bg_color" shadowColor="shadow_color" btnColor="btn_color"></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>='plugin-switcher-1' <span class="attr">style</span>="width: 50px;height: 30px;"></pre>
                                        <pre>      <<span class="element">div</span> <span class="attr">class</span>="plugin-switcher" <span class="attr">x-plugin</span>="switcher" <span class="attr">dataItem</span>="switcher" <span class="attr">bgColor</span>="bg_color" <span class="attr">shadowColor</span>="shadow_color" <span class="attr">btnColor</span>="btn_color"><<span class="element">/div></span></pre>
                                        <pre><<span class="element">/div</span>></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'switcher',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-switcher',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            switcher: true,</span>      <span class="comment">/*开关状态*/</span></pre>
                                    <pre><span>            bg_color: '#292827',</span>      <span class="comment">/*开关背景颜色*/</span></pre>
                                    <pre><span>            shadow_color: "#FF9900",</span>      <span class="comment">/*开关投影颜色*/</span></pre>
                                    <pre><span>            btn_color: "#ffffff"</span>      <span class="comment">/*开关按钮颜色*/</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>`,
                        data: {
                            switcher: false,
                            bg_color: "#292827",
                            shadow_color: "#FF9900",
                            btn_color: "#FFFFFF"
                        }
                    }, {
                        name: "12003",
                        explain: "这是一个3D switch插件，通过点击实现开与关以及颜色变化。\n" +
                            "本插件可自定义配置项包括：打开颜色、关闭颜色。",
                        template: `<div class="plugin-switcher-3">
                                        <div x-plugin='plugin_12003' dataItem='switcher'></div>
                                    </div>`,
                        htmlcode: `<pre class="instruction-code">
                                        <pre><<span class="element">div</span> <span class="attr">class</span>='plugin-switcher-1' <span class="attr">style</span>="width: 50px;height: 30px;"></pre>
                                        <pre>      <<span class="element">div</span> <span class="attr">class</span>="plugin-switcher" <span class="attr">x-plugin</span>="switcher" <span class="attr">dataItem</span>="switcher"><<span class="element">/div></span></pre>
                                        <pre><<span class="element">/div</span>></pre>
                                    </pre>`,
                        jscode: `<pre class="instruction-code">
                                    <pre><span>{</span></pre>
                                    <pre><span>      name: 'switcher',</span>      <span class="comment">/*插件模块的模块名称*/</span></pre>
                                    <pre><span>      el: '.plugin-switcher',</span>      <span class="comment">/*插件渲染容器*/</span></pre>
                                    <pre><span>      data: {</span>      <span class="comment">/*配置参数项*/</span></pre>
                                    <pre><span>            switcher: true</span>      <span class="comment">/*开关状态*/</span></pre>
                                    <pre><span>     }</pre>
                                    <pre><span>}</span></pre>`,
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
                                <div class="plugin-name">{{name}}插件</div>
                                <p class="explain">本章节主要展示插件库中的相关图表插件。</p>`;
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
                            </div>`;
                });
                props.template = tem;
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
        },{
            name: "m_plugin_chart",
            delayInit: true,
            requires: [
                {type: 'css', path: PLUGINURL + '/plugins_show/chart/chart_1/css/index.css'},
                {type: 'css', path: PLUGINURL + '/plugins_show/chart/chart_2/css/index.css'},
                {type: 'css', path: PLUGINURL + '/plugins_show/chart/chart_3/css/index.css'},
                {type: 'css', path: PLUGINURL + '/plugins_show/chart/chart_4/css/index.css'},
                {type: 'css', path: PLUGINURL + '/plugins_show/chart/chart_5/css/index.css'},
            ],
            onStart: function (props) {
                //props指的是config
                var tem = `<div class="plugin-type el-plugin-type">
                                <div class="plugin-name">{{name}}插件</div>
                                <p class="explain">本章节主要展示插件库中的相关图表插件。</p>`;
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
                            </div>`;
                });
                props.template = tem;
            },
            modules: [],
            data: {
                hasCreated: false,
                name: "图表",
                plugins: [
                    {
                        name:"15001",
                        explain:"本插件是直方图插件，能直观地表示出数据的具体数值",
                        template:`<div id="app">
    <div class="histogram-container clearfix" x-model="histogram">
        <div style="height: 400px; width: 800px;" class='chart' x-plugin='Chart'  dataName='data' type='histogram'
             title='{{title}}' legend='{{legend}}' yTitle='销售额(万元)' xTitle='2017年上半年'
             category='string,number' gridLine='{{gridLine}}' titleColor='{{titleColor}}'
             gridLineColor='{{gridLineColor}}'>
        </div>
    </div>
</div>`,
                        data:{
                            histogram: {
                                "title": "直方图",
                                "legend": "",
                                "marker": false,
                                "titleColor": "#000000",
                                "gridLine": 0,
                                "gridLineColor": "#cccccc",
                                "legends": [
                                    { "value": "", "text": "无" },
                                    { "value": "top", "text": "顶部" },
                                    { "value": "right", "text": "右侧" },
                                    { "value": "bottom", "text": "底部" }
                                ],
                                "lines": [
                                    { "value": 0, "text": "无" },
                                    { "value": 1, "text": "横向" },
                                    { "value": 2, "text": "纵向" },
                                    { "value": 3, "text": "全部" }
                                ],
                                "data": [{
                                    "title": "成都店",
                                    "datas": [
                                        { "x": "1月", "y": 300 },
                                        { "x": "2月", "y": 320 },
                                        { "x": "3月", "y": 280 },
                                        { "x": "4月", "y": 250 },
                                        { "x": "5月", "y": 300 },
                                        { "x": "6月", "y": 380 }
                                    ]
                                }, {
                                    "title": "北京店",
                                    "datas": [
                                        { "x": "1月", "y": 900 },
                                        { "x": "2月", "y": 820 },
                                        { "x": "3月", "y": 880 },
                                        { "x": "4月", "y": 850 },
                                        { "x": "5月", "y": 900 },
                                        { "x": "6月", "y": 980 }
                                    ]
                                }, {
                                    "title": "上海店",
                                    "datas": [
                                        { "x": "1月", "y": 600 },
                                        { "x": "2月", "y": 520 },
                                        { "x": "3月", "y": 580 },
                                        { "x": "4月", "y": 550 },
                                        { "x": "5月", "y": 600 },
                                        { "x": "6月", "y": 680 }
                                    ]
                                }],
                            },
                        }
                    }, {
                        name:"15002",
                        explain:"本插件是折线图插件，能直观地表示出数据的具体数值",
                        template:`
    <div class="line-container clearfix" x-model="line">
        <div style="height: 400px; width: 800px;" class='chart' x-plugin='Chart'  dataName='data' type='line' title='{{title}}'
             legend='{{legend}}' yTitle='' xTitle='' symbolSize='{{symbolSize}}' radarName='radar'
             category='string,number' gridLine='{{gridLine}}' marker='{{marker}}'
             titleColor='{{titleColor}}' gridLineColor='{{gridLineColor}}'>
        </div>
</div>`,
                        data:{
                            line: {
                                "title": "折线图",
                                "legend": "",
                                "marker": false,
                                "titleColor": "#000000",
                                "gridLine": 0,
                                "gridLineColor": "#cccccc",
                                "legends": [
                                    { "value": "", "text": "无" },
                                    { "value": "top", "text": "顶部" },
                                    { "value": "right", "text": "右侧" },
                                    { "value": "bottom", "text": "底部" }
                                ],
                                "lines": [
                                    { "value": 0, "text": "无" },
                                    { "value": 1, "text": "横向" },
                                    { "value": 2, "text": "纵向" },
                                    { "value": 3, "text": "全部" }
                                ],
                                "data": [{
                                    "title": "成都店",
                                    "datas": [
                                        { "x": "1月", "y": 300 },
                                        { "x": "2月", "y": 320 },
                                        { "x": "3月", "y": 280 },
                                        { "x": "4月", "y": 250 },
                                        { "x": "5月", "y": 300 },
                                        { "x": "6月", "y": 380 }
                                    ]
                                }, {
                                    "title": "北京店",
                                    "datas": [
                                        { "x": "1月", "y": 900 },
                                        { "x": "2月", "y": 820 },
                                        { "x": "3月", "y": 880 },
                                        { "x": "4月", "y": 850 },
                                        { "x": "5月", "y": 900 },
                                        { "x": "6月", "y": 980 }
                                    ]
                                }, {
                                    "title": "上海店",
                                    "datas": [
                                        { "x": "1月", "y": 600 },
                                        { "x": "2月", "y": 520 },
                                        { "x": "3月", "y": 580 },
                                        { "x": "4月", "y": 550 },
                                        { "x": "5月", "y": 600 },
                                        { "x": "6月", "y": 680 }
                                    ]
                                }],
                            }
                    }},{
                        name:"15003",
                        explain:"本插件是饼状图插件，能直观地表示出数据的占比",
                        template:`<div class="pie-container clearfix" x-model="pie">
            <div class='chart' x-plugin='Chart'  dataName='data' type='pie'
                 title='{{title}}' legend='{{legend}}'
                 category='string,number' titleColor='{{titleColor}}'
                 showPercent='{{showPercent}}' showText = '{{showText}}'></div>
    </div>`,
                        data:{
                            pie:{
                                "title":"饼状图",
                                "legend":"",
                                "titleColor":"#000000",
                                "legend":"",
                                "showPercent":true,
                                "showText":true,
                                "legends":[
                                    {"value":"","text":"无"},
                                    {"value":"top","text":"顶部"},
                                    {"value":"right","text":"右侧"},
                                    {"value":"bottom","text":"底部"}
                                ],
                                "data":[
                                    {"value":300,"title":"数据一"},
                                    {"value":800,"title":"数据二"},
                                    {"value":600,"title":"数据三"},
                                    {"value":100,"title":"数据四"},
                                    {"value":400,"title":"数据五"},
                                    {"value":450,"title":"数据六"}
                                ],
                            },
                        }},{
                        name:"15004",
                        explain:"本插件是雷达图插件，能直观地表示出数据的具体数值",
                        template:`<div class="radar-container clearfix" x-model="radar">
        <div class='chart' x-plugin='Chart'  dataName='data' radarName="radar" type='radar'
             title='{{title}}' legend='{{legend}}'
             titleColor='{{titleColor}}'
        ></div>
    </div>`,
                        data:{
                            radar: {
                                "title":"雷达图实例",
                                "legend":"right",
                                "marker":true,
                                "titleColor":"#000000",
                                "legends":[
                                    {"value":"","text":"无"},
                                    {"value":"top","text":"顶部"},
                                    {"value":"right","text":"右侧"},
                                    {"value":"bottom","text":"底部"}
                                ],
                                "radar": {
                                    "titles": ['顶点一', '顶点二', '顶点三', '顶点四', '顶点五', '顶点六'],
                                    "colors": ['#e6e6e6', '#f5f5f5'],
                                    "lineColor": "#ccc"
                                },
                                "data":[
                                    {
                                        "title": '111',
                                        "datas": [93, 55, 45, 78, 66, 45]
                                    },
                                    {
                                        "title": '555',
                                        "datas": [45, 79, 79, 88, 93, 67]
                                    }
                                ],
                            }
                        }},{
                        name:"15005",
                        explain:"本插件是散点图插件，能直观地表示出数据的分布情况",
                        template:`<div class="scatter-container clearfix" x-model="scatter">
        <div class='chart' x-plugin='Chart'  dataName='data' type='scatter'
             title='{{title}}' legend='{{legend}}' gridLine="{{gridLine}}" symbolSize="{{symbolSize}}"
             category='number,number' titleColor='{{titleColor}}'  gridLineColor='{{gridLineColor}}'
             showPercent='{{showPercent}}' showText = '{{showText}}'></div></div>`,
                        data:{
                            scatter: {
                                "title": "散点图",
                                "legend": "",
                                "marker": false,
                                "titleColor": "#000000",
                                "legend": "",
                                "symbolSize": 8,
                                "gridLine": 0,
                                "gridLineColor": "#cccccc",
                                "legends": [
                                    { "value": "", "text": "无" },
                                    { "value": "top", "text": "顶部" },
                                    { "value": "right", "text": "右侧" },
                                    { "value": "bottom", "text": "底部" }
                                ],
                                "lines": [
                                    { "value": 0, "text": "无" },
                                    { "value": 1, "text": "横向" },
                                    { "value": 2, "text": "纵向" },
                                    { "value": 3, "text": "全部" }
                                ],
                                "data": [{
                                    "title": "测试",
                                    "datas": [
                                        {x: 10.0, y:8.04},
                                        {x:8.0, y:6.95},
                                        {x:13.0, y:7.58},
                                        {x:9.0, y:8.81},
                                        {x:11.0, y:8.33},
                                        {x:14.0, y:9.96},
                                        {x:6.0, y:7.24},
                                        {x:4.0, y:4.26},
                                        {x:12.0,y: 10.84},
                                        {x:7.0, y:4.82},
                                        {x:5.0, y:5.68}
                                    ],
                                    cs: ''
                                }],
                                addX: '',
                                addY: ''
                            },
                        }}
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
        }]);
}());