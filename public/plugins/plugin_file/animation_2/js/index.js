/**
 * create by xll on 2018/5/11.
 * 加载动画
 */
var my_download_animation_2 = function() {};
my_download_animation_2.prototype = {
    init: function(view) {
        var me = this;
        var template = `<div class="nd-plugin-loading-2" x-if="show">
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
</div>`;
        view.innerHTML = template;
    },
    render: function(view) {
        var me = this;
        var data = view.$getData().data;
        var height = parseInt(data.height);
        var width = parseInt(data.width);
        var color=data.color_1;
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
DD.Plugin.create("my-download-animation-2", my_download_animation_2);
(function() {
    DD.createModule({
        el: '.el-loading',
        data: {
            show: true,
            width: 80,
            height: 100,
            color_1:'#FDB702',
            animation_time:1.2
        },
        onBeforeFirstRender:function(){
            var me=this;
            if(window.data){
                if(window.data.animation_time){
                    me.data.animation_time=window.data.animation_time;
                }
                if(window.data.background_color){
                    me.data.color_1=window.data.background_color;
                }
            }
        }
    });
}());