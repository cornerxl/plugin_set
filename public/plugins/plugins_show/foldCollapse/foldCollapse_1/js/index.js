
/**
 * Created by xll on 2017/11/27.
 */
(function () {
    var plugin_07001 = function () {

    }

    plugin_07001.prototype.init = function (view) {
        var me = this;
        var template = `<div class="nd-plugin-collapse-box nd-plugin-slideimg-panel">
                            <div class="nd-plugin-collapse-heading">
                                
                            </div>
                            <div class="nd-plugin-collapse-content" >
                                <span class="nd-plugin-collapse-coninfo"></span>
                            </div>
                        </div>`;
        var data = DD.attr(view, 'dataName') || 'data';
        view.$dataName = data;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_07001.prototype.render = function (view) {
        var me = this;
        var data = view.$getData().data[view.$dataName];
        if(!data){
            return;
        }
        var module;
        if(!data.module){
            module = view.$module;
        }else {
            module = data.module;
        }
        if(!module){
            return;
        }
        setTimeout(delayRender, 0);
        function delayRender() {
            var collapseHead = document.querySelector(".nd-plugin-collapse-heading");
            var collapseCon = document.querySelector(".nd-plugin-collapse-content");
            var collapseConInfo = document.querySelector(".nd-plugin-collapse-coninfo");
            collapseHead.innerText = data.heading;
            collapseConInfo.innerText = data.content;
            var collapseConInfoHeight = parseInt(window.getComputedStyle(collapseConInfo, null).height) + parseInt(20) + 'px';
            if(data.isCollapse){
                DD.css(collapseCon, 'height', collapseConInfoHeight);
                DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
            }else {
                DD.css(collapseCon, 'height', 0);
                DD.css(collapseHead, 'border-bottom', 'none');
            }
            DD.css(collapseHead, 'background-color', data.head_bg_color);
            DD.css(collapseCon, 'background-color', data.content_bg_color);
            DD.css(collapseHead, 'color', data.head_font_color);
            DD.css(collapseCon, 'color', data.content_font_color);
            DD.css(collapseHead, 'font-size', data.head_font_size + 'px');
            DD.css(collapseCon, 'font-size', data.content_font_size + 'px');
            var clickEvent = function (e,d,v) {
                if(data.isCollapse){
                    DD.css(collapseCon, 'height', 0);
                    setTimeout(function () {
                        DD.css(collapseHead, 'border-bottom', 'none');
                    }, 500);
                    data.isCollapse = false;
                }else {
                    data.isCollapse = true;
                    DD.css(collapseCon, 'height', collapseConInfoHeight);
                    DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
                }
                DD.css(collapseCon, 'transition-property', 'height');
                DD.css(collapseCon, 'transition-duration', data.time+'s');
                DD.css(collapseCon, '-webkit-transition-property', 'height');
                DD.css(collapseCon, '-webkit-transition-duration', data.time+'s');
            }
            //点击事件
            new DD.Event({
                eventName:'click',
                view:collapseHead,
                handler:clickEvent
            });
        }
    }

    DD.Plugin.create("plugin_07001", plugin_07001);
}());
