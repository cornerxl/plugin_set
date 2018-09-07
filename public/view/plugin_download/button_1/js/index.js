;
(function() {
    var button_list = function() {};
    button_list.prototype = {
        init: function(view) {
            var template = `<div class="nd-plugin-list-1">
    <div x-repeat="list_one" class="list_one">{{value}}</div>
</div>
<div class="nd-plugin-list-2">
    <div x-repeat="list_two" class="list_two">
        <div class="list_i">{{value}}</div>{{name}}
    </div>
</div>
<div class="nd-plugin-list-3">
    <div x-repeat="list_three" class="list_three">
    <div class="list_i">{{value}}</div>
    </div>
</div>`;
            view.$dataItem = DD.attr(view, "dataName");
            view.removeAttribute("dataName");
            view.innerHTML = template;
        },
        render: function(view) {
            var data = view.$getData().data;
            var color = [];
            color.push(data.color_1);
            color.push(data.color_2);
            color.push(data.color_3);
            setTimeout(function() {
                var dom = view.querySelectorAll(".list_one");
                var dom2 = view.querySelectorAll(".list_two");
                var dom3 = view.querySelectorAll(".list_three");
                dom.forEach(function(i, index, arr) {
                    DD.css(i, "background-color", color[index]);
                    new DD.Event({
                        view: i,
                        eventName: 'mouseenter',
                        handler: function(e, d, v) {
                            var color = DD.css(v, "background-color");
                            color.substr(0, color.length - 1);
                            color = color.substr(0, color.length - 1) + ',0.5)';
                            DD.css(v, "background-color", color);
                        }
                    });
                    new DD.Event({
                        view: i,
                        eventName: 'mouseleave',
                        handler: function(e, d, v) {
                            var color = DD.css(v, "background-color");
                            color = color.substr(0, color.length - 6) + ')';
                            DD.css(v, "background-color", color)
                        }
                    });
                });
                dom2.forEach(function(i, index, arr) {
                    DD.css(i, "background-color", color[index]);
                    new DD.Event({
                        view: i,
                        eventName: 'mouseenter',
                        handler: function(e, d, v) {
                            var color = DD.css(v, "background-color");
                            color.substr(0, color.length - 1);
                            color = color.substr(0, color.length - 1) + ',0.5)';
                            DD.css(v, "background-color", color);
                        }
                    });
                    new DD.Event({
                        view: i,
                        eventName: 'mouseleave',
                        handler: function(e, d, v) {
                            var color = DD.css(v, "background-color");
                            color = color.substr(0, color.length - 6) + ')';
                            DD.css(v, "background-color", color)
                        }
                    });
                });
                dom3.forEach(function(i, index, arr) {
                    DD.css(i, "background-color", color[index]);
                    new DD.Event({
                        view: i,
                        eventName: 'mouseenter',
                        handler: function(e, d, v) {
                            var color = DD.css(v, "background-color");
                            color.substr(0, color.length - 1);
                            color = color.substr(0, color.length - 1) + ',0.5)';
                            DD.css(v, "background-color", color);
                        }
                    });
                    new DD.Event({
                        view: i,
                        eventName: 'mouseleave',
                        handler: function(e, d, v) {
                            var color = DD.css(v, "background-color");
                            color = color.substr(0, color.length - 6) + ')';
                            DD.css(v, "background-color", color)
                        }
                    });
                });

            }, 0);
        }
    };
    DD.Plugin.create("button-list", button_list);
    DD.createModule({
        name: 'm_plugin_download_Button_1',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/button_1/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/button_1/index.html",
        data: {
            name: "按钮列表",
            button_data: {
                list_one: [{
                    value: "危险"
                }, {
                    value: "警告"
                }, {
                    value: "成功"
                }],
                list_two: [{
                    name: "删除",
                    value: "delete"
                }, {
                    name: "编辑",
                    value: "edit"
                }, {
                    name: "分享",
                    value: "share"
                }],
                list_three: [{
                    value: "keyboard_arrow_down"
                }, {
                    value: "keyboard_arrow_up"
                }, {
                    value: "keyboard_arrow_left"
                }],
                color_1: "#e53935",
                color_2: "#ff9800",
                color_3: "#4caf50"
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.button_data = {
                list_one: [{
                    value: "危险"
                }, {
                    value: "警告"
                }, {
                    value: "成功"
                }],
                list_two: [{
                    name: "删除",
                    value: "delete"
                }, {
                    name: "编辑",
                    value: "edit"
                }, {
                    name: "分享",
                    value: "share"
                }],
                list_three: [{
                    value: "keyboard_arrow_down"
                }, {
                    value: "keyboard_arrow_up"
                }, {
                    value: "keyboard_arrow_left"
                }],
                color_1: "#e53935",
                color_2: "#ff9800",
                color_3: "#4caf50"
            }
        },
        methods: {
            ensure: function() {
                var me = this;
                var data = me.data.button_data;
                var obj = {
                    plugin_id: 1301,
                    total: 0,
                    js: JSON.stringify({
                        color_1: data.color_1.replace("#", ""),
                        color_2: data.color_2.replace("#", ""),
                        color_3: data.color_3.replace("#", "")
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
})()