/**
 * create by xll on 2018/5/11.
 * 加载动画
 */
var plugin_02002 = function() {};
plugin_02002.prototype = {
    init: function(view) {
        var me = this;
        var template = `<div class="nd-plugin-loading-2" x-if="buffering_data.show">
                            <div class="spinner">
                                <div class="rect1"></div>
                                <div class="rect2"></div>
                                <div class="rect3"></div>
                                <div class="rect4"></div>
                                <div class="rect5"></div>
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
        var data = view.$getData().data;
        var height = parseInt(data[view.$dataItem].height);
        var width = parseInt(data[view.$dataItem].width);
        var color=data[view.$dataItem].color;
        setTimeout(function() {
            me.content = view.querySelector(".spinner");
            me.dom = Array.from(me.content.getElementsByTagName("div"));
            DD.css(me.content, "width", width + "px");
            DD.css(me.content, "height", height + "px");

            me.dom.forEach(function(i) {
                DD.css(i, "height", height + 'px');
                DD.css(i, "width", (width - 0.2 * width) / me.dom.length + 'px');

                DD.css(i,"background-color",color);
            })
        }, 0);
    }
};
DD.Plugin.create("plugin_02002", plugin_02002);