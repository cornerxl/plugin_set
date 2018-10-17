/**
 * create by xll on 2018/5/11.
 * 加载动画
 */
(function() {
    var my_download_animation_2 = function() {};
    my_download_animation_2.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="nd-plugin-loading-2" x-show="show">
                            <div class="spinner">
                                <div class="rect1"></div>
                                <div class="rect2"></div>
                                <div class="rect3"></div>
                                <div class="rect4"></div>
                                <div class="rect5"></div>
                            </div>
                        </div>`;
            view.$dataItem = DD.attr(view, "dataName");
            view.removeAttribute("dataName");
            view.innerHTML = template;
        },
        render: function(view) {
            var me = this;
            var data = view.$getData().data[view.$dataItem];
            var height = parseInt(data.height);
            var width = parseInt(data.width);
            var color = data.color_1;
            var time = parseInt(data.animation_time);
            if (time <= 0) {
                time = 1.5;
                data.animation_time = 1.5;
            }
            setTimeout(function() {
                me.content = view.querySelector(".spinner");
                me.dom = Array.from(me.content.getElementsByTagName("div"));
                DD.css(me.content, "width", width + "px");
                DD.css(me.content, "height", height + "px");

                me.dom.forEach(function(i, index) {
                    DD.css(i, "height", height + 'px');
                    DD.css(i, "width", (width - 0.2 * width) / me.dom.length + 'px');
                    DD.css(i, "background-color", color);
                    DD.css(i, "animation-duration", time + 's');
                    if (index) {
                        DD.css(i, "animation-delay", time * -1 + index * (time / 10) + 's');
                    }
                })
            }, 0);
        }
    };
    DD.Plugin.create("my-download-animation-2", my_download_animation_2);
    DD.createModule({
        name: 'm_plugin_download_Animation_2',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/animation_2/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/animation_2/index.html",
        data: {
            name: "方块动画",
            buffering_data: {
                width: 80,
                height: 100,
                color_1: '#FDB702',
                animation_time: 1.2,
            },
             show:true
        },
        onBeforeFistrRender: function() {
            var me = this;
        },
        methods: {
            ensure: function() {
                var me = this;
                var data = me.data.buffering_data;
                if (data.animation_time < 0) {
                    data.animation_time = 1;
                }

                // 方块个数
                var len = document.querySelector('.spinner').children.length;
                var obj = {
                    plugin_id: 902,
                    js: JSON.stringify({
                        animation_time: data.animation_time,
                        color_1: data.color_1.replace("#", ""),
                        height: data.height,
                        width: data.width
                    }),
                    total: 0,
                    flag: 1
                }
                if(view.innerHTML.indexOf('Less') > -1) {
                    obj.isLess = true;
                }else {
                    obj.isLess = false;
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
}());