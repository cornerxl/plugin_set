;
(function() {
    var m_loading_animation_3 = function() {}
    m_loading_animation_3.prototype = {
        init: function(view) {
            var template = `<div class="com-loading-animation-3" x-if="show">
    <div class="imgbox">
        <div class="leftbox">
            <div class="left"></div>
        </div>
        <div class="rightbox">
            <div class="right"></div>
        </div>
    </div>
</div>`;
            view.$dataItem = DD.attr(view, "dataName");
            view.removeAttribute("dataName");
            view.innerHTML = template;
        },
        render: function(view) {
            var data = view.$getData().data;
            setTimeout(function() {
                var right = view.querySelector(".right");
                var left = view.querySelector(".left");
                var color = data.color_1;
                var time = parseInt(data.animation_time);
                if (time < 1)
                    tme = 2;
                DD.css(left, "animation-duration", time + "s");
                DD.css(right, "animation-duration", time + "s");
                DD.css(left, "border-left-color", color);
                DD.css(left, "border-bottom-color", color);
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
                animation_time: 3
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
                var data=me.data.buffering_data;
                if (data.animation_time < 0) {
                    data.animation_time = 1;
                }
                var obj = {
                    plugin_id: 903,
                    class0: JSON.stringify({
                        names: '.com-loading-animation-3 .left',
                        total: 3,
                        aniamatin: {
                            names: 'animation-duration',
                            values: data.animation_time + 's'
                        },
                        borderLeft: {
                            names: 'border-left-color',
                            values: data.color_1.replace("#", "")
                        },
                        borderRight: {
                            names: 'border-bottom-color',
                            values: data.color_1.replace("#", "")
                        }
                    }),
                    class1: JSON.stringify({
                        names: '.com-loading-animation-3 .right',
                        total: 3,
                        aniamatin: {
                            names: 'animation-duration',
                            values: data.data.animation_time + 's'
                        },
                        borderLeft: {
                            names: 'border-left-color',
                            values: data.color_1.replace("#", "")
                        },
                        borderRight: {
                            names: 'border-bottom-color',
                            values: data.color_1.replace("#", "")
                        }
                    }),
                    total: 2,
                    flag: 0
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
})()