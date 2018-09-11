/**
 * create by xll on 2018/5/11.
 * 加载动画
 */
var plugin_02003 = function() {};
plugin_02003.prototype = {
    init: function(view) {
        var me = this;
        var template = `<div class="com-loading-animation-3" x-if="buffering_data.show">
                            <div class="imgbox">
                                <div class="leftbox">
                                    <div class="left"></div>
                                </div>
                                <div class="rightbox">
                                    <div class="right"></div>
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
DD.Plugin.create("plugin_02003", plugin_02003);