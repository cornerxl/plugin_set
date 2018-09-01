
/**
 * Created by xll on 2017/11/27.
 */
(function () {
    var plugin_07001 = function () {

    }

    plugin_07001.prototype.init = function (view) {
        var me = this;
        var template = `<div class="nd-plugin-collapse-box nd-plugin-slideimg-panel" x-model="collapse">
                            <div class="nd-plugin-collapse-heading">
                                <span>{{heading}}</span>
                            </div>
                            <div class="nd-plugin-collapse-content" >
                                <span class="nd-plugin-collapse-coninfo">{{content}}</span>
                            </div>
                        </div>`;
        var data = view.$getData().data;
        view.$dataName = data;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_07001.prototype.render = function (view) {
        var me = this;
        var data = view.$getData().data;
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
            var collapseConInfoHeight = parseInt(window.getComputedStyle(collapseConInfo, null).height) + parseInt(20) + 'px';
            if(data.collapse.isCollapse){
                DD.css(collapseCon, 'height', collapseConInfoHeight);
                DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
            }else {
                DD.css(collapseCon, 'height', 0);
                DD.css(collapseHead, 'border-bottom', 'none');
            }

            var clickEvent = function (e,d,v) {
                if(data.collapse.isCollapse){
                    DD.css(collapseCon, 'height', 0);
                    setTimeout(function () {
                        DD.css(collapseHead, 'border-bottom', 'none');
                    }, 500);
                    data.collapse.isCollapse = false;
                }else {
                    data.collapse.isCollapse = true;
                    DD.css(collapseCon, 'height', collapseConInfoHeight);
                    DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
                }
                DD.css(collapseCon, 'transition-property', 'height');
                DD.css(collapseCon, 'transition-duration', data.collapse.time+'s');
                DD.css(collapseCon, '-webkit-transition-property', 'height');
                DD.css(collapseCon, '-webkit-transition-duration', data.collapse.time+'s');
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
