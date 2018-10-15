/**
 * create by xll on 2018/5/11.
 * 加载动画
 */

(function() {
    var Loading = function() {};
    Loading.prototype = {
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
    DD.Plugin.create("loading", Loading);
    DD.createModule({
        el:".el-loading",
        data: {
            name: "方块动画",
            buffering_data: {
                width: 80,
                height: 100,
                color_1: '#FDB702',
                animation_time: 1.2,
            },
            show: true
        },
        onBeforeFirstRender: function() {
            var me = this;
            var tem = me.data.buffering_data;
            if (window.data) {
                Object.keys(window.data).forEach(i => {
                    tem[i] = window.data[i];
                });
            }
        }
    });
}());