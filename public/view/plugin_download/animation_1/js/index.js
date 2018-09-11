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
        view.$dataItem = DD.attr(view, "dataName") || "data";
        view.innerHTML = template;
        view.removeAttribute('dataName');
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };

    Buffering.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data[view.$dataItem];
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
            var bufferingBox = view.querySelector(".nd-plugin-buffering-box");
            var par = view.querySelector(".nd-plugin-buffering-loader");
            var dom = Array.from(par.getElementsByTagName("div"));
            var small_time = data.animation_time / dom.length;
            dom.forEach(function(item, index) {
                DD.css(item, "animation-duration", data.animation_time + 's');
                DD.css(item, "animation-delay", small_time * index + 's');
                DD.css(item, "background-color", data.color_1);
                DD.css(item, "width", 2 * data.radius + 'px');
                DD.css(item, "height", 2 * data.radius + 'px');
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
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/animation_1/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/animation_1/index.html",
        data: {
            name: '泡泡动画',
            buffering_data: {
                animation_time: 1,
                color_1: "#999999",
                radius: 5
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
        },
        methods: {
            ensure: function() {
                var me = this;
                var data=me.data.buffering_data;
                if (data.animation_time <= 1) {
                    data.animation_time = 1;
                }
                var obj = {
                    plugin_id: 901,
                    js: JSON.stringify({ animation_time: data.animation_time, background_color: data.color_1.replace("#", "") }),
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