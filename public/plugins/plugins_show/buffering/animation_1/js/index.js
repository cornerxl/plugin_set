;(function() {
    var plugin_02001 = function() {

    };
    plugin_02001.prototype.init = function(view) {
        var me = this;
        var template = `<div class='nd-plugin-buffering-box'>
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
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };

    plugin_02001.prototype.render = function(view) {
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
            var dom = [];
            var dom = Array.from(par.getElementsByTagName("div"));
            var small_time = data[view.$dataItem].animation_time / dom.length;
            dom.forEach(function(item, index) {
                DD.css(item, "animation-duration", data[view.$dataItem].animation_time + 's');
                DD.css(item, "animation-delay", small_time * index + 's');
                DD.css(item, "background-color", data[view.$dataItem].color);
                DD.css(item, "width", 2 * data[view.$dataItem].radius + 'px');
                DD.css(item, "height", 2 * data[view.$dataItem].radius + 'px');
            });
            var bufferingBoxParents = bufferingBox.parentNode.parentNode;
            var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width;
            var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height;
            DD.css(bufferingBox, 'width', bufferingBoxWidth);
            DD.css(bufferingBox, 'height', bufferingBoxHeight);
            var mask = document.querySelector(".mask");
            DD.css(mask, 'width', bufferingBoxWidth);
            DD.css(mask, 'height', bufferingBoxHeight);
        };
    }

    DD.Plugin.create("plugin_02001", plugin_02001);
}());