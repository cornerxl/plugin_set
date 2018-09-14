/**
 * Created by xll on 2017/11/27.
 */
(function() {
    var Collapse = function() {

    }

    Collapse.prototype.init = function(view) {
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

    Collapse.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data[view.$dataName];
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
            var collapseHead = document.querySelector(".nd-plugin-collapse-heading");
            var collapseCon = document.querySelector(".nd-plugin-collapse-content");
            var collapseConInfo = document.querySelector(".nd-plugin-collapse-coninfo");
            collapseHead.innerText = data.heading;
            collapseConInfo.innerText = data.content;
            var collapseConInfoHeight = parseInt(window.getComputedStyle(collapseConInfo, null).height) + parseInt(20) + 'px';
            if (data.isCollapse) {
                DD.css(collapseCon, 'height', collapseConInfoHeight);
                DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
            } else {
                DD.css(collapseCon, 'height', 0);
                DD.css(collapseHead, 'border-bottom', 'none');
            }
            DD.css(collapseHead, 'background-color', data.head_bg_color);
            DD.css(collapseCon, 'background-color', data.content_bg_color);
            DD.css(collapseHead, 'color', data.head_font_color);
            DD.css(collapseConInfo, 'color', data.content_font_color);
            DD.css(collapseHead, 'font-size', data.head_font_size + 'px');
            DD.css(collapseCon, 'font-size', data.content_font_size + 'px');
            var clickEvent = function(e, d, v) {
                if (data.isCollapse) {
                    DD.css(collapseCon, 'height', 0);
                    setTimeout(function() {
                        DD.css(collapseHead, 'border-bottom', 'none');
                    }, 500);
                    data.isCollapse = false;
                } else {
                    data.isCollapse = true;
                    DD.css(collapseCon, 'height', collapseConInfoHeight);
                    DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
                }
                DD.css(collapseCon, 'transition-property', 'height');
                DD.css(collapseCon, 'transition-duration', data.time + 's');
                DD.css(collapseCon, '-webkit-transition-property', 'height');
                DD.css(collapseCon, '-webkit-transition-duration', data.time + 's');
            }
            //点击事件
            new DD.Event({
                eventName: 'click',
                view: collapseHead,
                handler: clickEvent
            });
        }
    }

    DD.Plugin.create("collapse", Collapse);
    DD.createModule({
        el:".plugin-collapse",
        data: {
            name: "折叠",
            collapse_data: {
                time: 0.5,
                isCollapse: true,
                heading: '点击展开，再次点击折叠',
                content: "NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。",
                head_bg_color: '#f5f5f5',
                content_bg_color: '#FFFFFF',
                head_font_color: '#666666',
                content_font_color: '#999999',
                head_font_size: 16,
                content_font_size: 14
            }
        },
         onBeforeFistrRender: function() {
            var me = this;
            var tem = me.data.collapse_data;
            if (window.data) {
                Object.keys(window.data).forEach(i => {
                    tem[i] = window.data[i];
                });
            }
        }
    });
}());