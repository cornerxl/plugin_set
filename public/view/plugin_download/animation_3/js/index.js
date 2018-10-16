;
(function() {
    var m_loading_animation_3 = function() {}
    m_loading_animation_3.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="nd-plugin-buffering-box-3" x-if="buffering_data.show">
                                <div class="nd-plugin-buffering-imgbox">
                                    <div class="nd-plugin-buffering-leftbox">
                                        <div class="nd-plugin-buffering-left"></div>
                                    </div>
                                    <div class="nd-plugin-buffering-rightbox">
                                        <div class="nd-plugin-buffering-right"></div>
                                    </div>
                                </div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                var right = view.querySelector(".nd-plugin-buffering-right");
                var left = view.querySelector(".nd-plugin-buffering-left");
                var rightBox = view.querySelector(".nd-plugin-buffering-rightbox");
                var leftBox = view.querySelector(".nd-plugin-buffering-leftbox");
                var imgBox = view.querySelector('.nd-plugin-buffering-imgbox');
                var color = data.color_1;
                var time = parseInt(data.animation_time);
                if (time < 1)
                    time = 2;
                DD.css(imgBox, 'width', data.size + 'px');
                DD.css(imgBox, 'height', data.size + 'px');
                DD.css(left, "animation-duration", time + "s");
                DD.css(left, "border-left-color", color);
                DD.css(left, "border-bottom-color", color);
                DD.css(left, 'width', data.size + 'px');
                DD.css(left, 'height', data.size + 'px');
                DD.css(leftBox, 'width', data.size / 2 + 'px');
                DD.css(leftBox, 'height', data.size + 'px');
                DD.css(rightBox, 'width', data.size / 2 + 'px');
                DD.css(rightBox, 'height', data.size + 'px');
                DD.css(rightBox, 'left', data.size / 2 + 'px');
                DD.css(right, 'width', data.size + 'px');
                DD.css(right, 'height', data.size + 'px');
                DD.css(right, 'margin-left', - data.size / 2 + 'px');
                DD.css(right, "animation-duration", time + "s");
                DD.css(right, "border-left-color", color);
                DD.css(right, "border-bottom-color", color);
            }, 0);
        }
    };
    DD.Plugin.create("m-loading-animation-3", m_loading_animation_3);
    DD.createModule({
        name: "m_plugin_download_Animation_3",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/animation_3/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/animation_3/index.html",
        data: {
            name: "圆环动画",
            buffering_data: {
                show: true, // 是否显示
                color_1: '#409EFF',
                animation_time: 3,
                size: 64
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.color_1 = '#409EFF';
            me.data.animation_time = 3
        },
        methods: {
            ensure: function() {
                var me = this;
                var data = me.data.buffering_data;
                if (data.animation_time < 0) {
                    data.animation_time = 1;
                }
                var obj = {
                    plugin_id: 903,
                    js: JSON.stringify({
                        show: true,
                        color_1: data.color_1.replace("#", ""),
                        animation_time: data.animation_time,
                        size: data.size
                    }),
                    // class0: JSON.stringify({
                    //     names: '.nd-plugin-buffering-box-3 .nd-plugin-buffering-left',
                    //     total: 5,
                    //     aniamatin: {
                    //         names: 'animation-duration',
                    //         values: data.animation_time + 's'
                    //     },
                    //     borderLeft: {
                    //         names: 'border-left-color',
                    //         values: data.color_1.replace("#", "")
                    //     },
                    //     borderRight: {
                    //         names: 'border-bottom-color',
                    //         values: data.color_1.replace("#", "")
                    //     },
                    //     leftW: {
                    //         names: 'width',
                    //         values: data.size + 'px'
                    //     },
                    //     leftH: {
                    //         names: 'height',
                    //         values: data.size + 'px'
                    //     }
                    // }),
                    // class1: JSON.stringify({
                    //     names: '.nd-plugin-buffering-box-3 .nd-plugin-buffering-right',
                    //     total: 6,
                    //     aniamatin: {
                    //         names: 'animation-duration',
                    //         values: data.animation_time + 's'
                    //     },
                    //     borderLeft: {
                    //         names: 'border-left-color',
                    //         values: data.color_1.replace("#", "")
                    //     },
                    //     borderRight: {
                    //         names: 'border-bottom-color',
                    //         values: data.color_1.replace("#", "")
                    //     },
                    //     rightW: {
                    //         names: 'width',
                    //         values: data.size + 'px'
                    //     },
                    //     rightH: {
                    //         names: 'height',
                    //         values: data.size + 'px'
                    //     },
                    //     rightM: {
                    //         names: 'margin-left',
                    //         values: (-data.size / 2) + 'px'
                    //     }
                    // }),
                    // class2: JSON.stringify({
                    //     names: '.nd-plugin-buffering-box-3 .nd-plugin-buffering-imgbox',
                    //     total: 2,
                    //     imgW: {
                    //         names: 'width',
                    //         values: data.size + 'px'
                    //     },
                    //     imgH: {
                    //         names: 'height',
                    //         values: data.size + 'px'
                    //     }
                    // }),
                    // class3: JSON.stringify({
                    //     names: '.nd-plugin-buffering-box-3 .nd-plugin-buffering-leftbox',
                    //     total: 2,
                    //     leftW: {
                    //         names: 'width',
                    //         values: (data.size / 2) + 'px'
                    //     },
                    //     leftH: {
                    //         names: 'height',
                    //         values: data.size + 'px'
                    //     }
                    // }),
                    // class4: JSON.stringify({
                    //     names: '.nd-plugin-buffering-box-3 .nd-plugin-buffering-rightbox',
                    //     total: 5,
                    //     leftW: {
                    //         names: 'width',
                    //         values: (data.size / 2) + 'px'
                    //     },
                    //     leftH: {
                    //         names: 'height',
                    //         values: data.size + 'px'
                    //     },
                    //     left: {
                    //         names: 'left',
                    //         values: (data.size / 2) + 'px'
                    //     }
                    // }),
                    total: 0,
                    flag: 1
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
})()