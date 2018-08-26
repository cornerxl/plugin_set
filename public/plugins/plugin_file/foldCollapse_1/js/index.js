
/**
 * Created by xll on 2017/11/27.
 */
(function () {
    var Collapse = function () {

    }

    Collapse.prototype.init = function (view) {
        var me = this;
        var template = `<div class="nd-plugin-collapse-box nd-plugin-slideimg-panel" x-model="collapse">
                            <div class="nd-plugin-collapse-heading">
                                <span>{{heading}}</span>
                            </div>
                            <div class="nd-plugin-collapse-content" >
                                <span class="nd-plugin-collapse-coninfo">{{content}}</span>
                            </div>
                        </div>`;
        var data = DD.attr(view, 'dataName');
        view.$dataName = data;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    Collapse.prototype.render = function (view) {
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

    DD.Plugin.create("collapse", Collapse);
    DD.createModule({
        el: ".plugin-collapse",
        data: {
            collapse: {
                isCollapse: true,
                heading: '点击展开，再次点击折叠',
                content: "NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。"
            }
        },
        onBeforeFirstRender:function(){
            var me=this;
            if(window.data){
                if(window.data.time){
                    me.data.collapse.time=window.data.time;
                }
            }
        }
    });
}());
