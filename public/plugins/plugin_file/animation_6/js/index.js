(function() {
    var Loading = function() {

    };

    Loading.prototype.init = function(view) {
        var me = this;
        var template = `<div class='nd-plugin-buffering-box-line' style="margin:0 auto">
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

    Loading.prototype.render = function(view) {
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
            var bufferingBox = view.querySelector(".nd-plugin-buffering-box-line");
            var par = view.querySelector(".nd-plugin-buffering-loader");
            var dom = Array.from(par.getElementsByTagName("div"));
            var small_time = data.animation_time / dom.length;
            dom.forEach(function(item, index) {
                DD.css(item, "animation-duration", data.animation_time + 's');
                DD.css(item, "animation-delay", small_time * index + 's');
                DD.css(item, "background-color", data.color_1);
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

    DD.Plugin.create("loading", Loading);

    DD.createModule({
        el: '.plugin-buffering',
        data:{
            buffering_data: {
                animation_time: 1,
                color_1: "#999999999"
            }
        },
        onBeforeFirstRender:function(){
            var me=this;
            var tem = me.data.buffering_data;
            if (window.data) {
                Object.keys(window.data).forEach(i => {
                    tem[i] = window.data[i];
                });
            }
        }
    });
}());