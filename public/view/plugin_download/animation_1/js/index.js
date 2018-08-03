(function() {
    var Buffering = function() {

    };

    Buffering.prototype.init = function(view) {
        var me = this;
        var template = `<div class='nd-plugin-buffering-box' style="margin:0 auto">
                            <div class='mask'></div>
                            <div class='nd-plugin-buffering-loader'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>`;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };

    Buffering.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 0);

        function delayRender() {
            var data = view.$getData().data;
            var bufferingBox = document.querySelector(".nd-plugin-buffering-box");
            var par = view.querySelector(".nd-plugin-buffering-loader");
            var dom = []
            var dom = Array.from(par.getElementsByTagName("div"));
            var small_time = data.small_div.animation_time / dom.length;
            dom.forEach(function(item, index) {
                DD.css(item, "animation-duration", data.small_div.animation_time + 's');
                DD.css(item, "animation-delay", small_time * index + 's');
                DD.css(item, "background-color", data.small_div.color_1);
            });
            var bufferingBoxParents = bufferingBox.parentNode.parentNode;
            var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width;
            var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height;
            DD.css(bufferingBox, 'width', "300px");
            DD.css(bufferingBox, 'height', bufferingBoxHeight);
            var mask = document.querySelector(".mask");
            DD.css(mask, 'width', bufferingBoxWidth);
            DD.css(mask, 'height', bufferingBoxHeight);
        };
    }

    DD.Plugin.create("buffering", Buffering);

    DD.createModule({
        name: 'm_plugin_download_Animation_1',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/animation_1/css/index_1.css" }],
        templateUrl: HTMLURL + "/plugin_download/animation_1/index.html",
        data: {
            name: '泡泡动画',
            small_div: {
                animation_time: 1,
                color_1: "#999999999"
            }
        },
        onBeforeFirstRender:function(){
            var me=this;
            me.data.small_div={
                animation_time: 1,
                color_1: "#999999999"
            };
        },
        methods: {
            ensure: function() {
                var me = this;
                if (me.data.small_div.animation_time <= 1) {
                    me.data.small_div.animation_time = 1;
                }
                var obj = {
                    plugin_id: 901,
                    js: JSON.stringify({ animation_time: me.data.small_div.animation_time, background_color: me.data.small_div.color_1.replace("#","")}),
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
}());