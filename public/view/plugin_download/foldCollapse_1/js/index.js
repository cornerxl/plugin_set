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

    Collapse.prototype.render = function(view) {
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
            var collapseHead = view.querySelector(".nd-plugin-collapse-heading");
            var collapseCon = view.querySelector(".nd-plugin-collapse-content");
            var collapseConInfo = view.querySelector(".nd-plugin-collapse-coninfo");
            var collapseConInfoHeight = parseInt(window.getComputedStyle(collapseConInfo, null).height) + parseInt(20) + 'px';
            DD.css(collapseHead, 'background-color', data.small_div.headColor);
            DD.css(collapseConInfo, 'font-size', data.small_div.fontSize + 'px');
            DD.css(collapseConInfo, 'color', data.small_div.fontColor);
            DD.css(collapseCon, 'transition-property', 'height');
            DD.css(collapseCon, 'transition-duration', data.small_div.time + "s");
            DD.css(collapseCon, '-webkit-transition-property', 'height');
            DD.css(collapseCon, '-webkit-transition-duration', data.small_div.time + "s");
            if (data.isCollapse) {
                DD.css(collapseCon, 'height', collapseConInfoHeight);
                DD.css(collapseHead, 'border-bottom', '1px solid #ddd');
            } else {
                DD.css(collapseCon, 'height', 0);
                DD.css(collapseHead, 'border-bottom', 'none');
            }
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
        name: 'm_plugin_download_foldCollapse_1',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/foldCollapse_1/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/foldCollapse_1/index.html",
        data: {
            name: "折叠",
            isCollapse: true,
            heading: '点击展开，再次点击折叠',
            content: "NoDom提供了丰富的指令集，如x-repeat( 重复条目渲染 )、x-model(数据模型)、x-if/x-else(条件)、x-show(显示和隐藏)、x-route／x-router(路由)、 x-field(字段和双向绑定)、x-validity(字段验证)。 同时提供了自定义指令集，指令可以帮助简化模版，丰富渲染内容。",
            small_div: {
                headColor: "#f5f5f5",
                fontSize: 12,
                fontColor: '#666666',
                time: 0.5
            }
        },
        methods: {
            ensure: function() {
                var me = this;
                if (me.data.time <= 0) {
                    me.data.time = 0.5;
                }
                var obj = {
                    plugin_id: 801,
                    total: 2,
                    class0:JSON.stringify({
                        names:'.nd-plugin-collapse-heading',
                        background:{
                            names:'background-color',
                            values:me.data.small_div.headColor.replace("#","")
                        },
                        total:1
                    }),
                    class1:JSON.stringify({
                        names:".nd-plugin-collapse-coninfo",
                        color:{
                            names:'color',
                            values:me.data.small_div.fontColor.replace("#","")
                        },
                        size:{
                            names:"size",
                            values:me.data.small_div.fontSize+'px'
                        },
                        total:2
                    }),
                    js: JSON.stringify({
                        time: me.data.small_div.time
                    }),
                    flag: 1,
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
}());