;
(function() {
    var el_animation_5 = function() {}
    el_animation_5.prototype = {
        init: function(view) {
            var template = `<div class="com-loading">
                                <div class="spinner">
                                    <div class="bounce1 small"></div>
                                    <div class="bounce2 small"></div>
                                    <div class="bounce3 small"></div>
                                </div>
                            </div>`;
            view.$dataItem = DD.attr(view, "dataName");
            view.removeAttribute("dataName");
            view.innerHTML = template;
        },
        render: function(view) {
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                var dom = view.querySelectorAll(".small");
                dom.forEach(function(i, index) {
                    DD.css(i, "background-color", data.color);
                    DD.css(i, "animation-delay", (data.time / 5) * index + 's');
                    DD.css(i, "width", 2 * data.radius + 'px');
                    DD.css(i, "height", 2 * data.radius + 'px');
                });
            }, 0)
        }
    };
    DD.Plugin.create("animation-5", el_animation_5);
    DD.createModule({
        name: 'm_plugin_download_Animation_5',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/animation_5/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/animation_5/index.html",
        data: {
            name: '水滴动画',
            buffering_data: {
                color: " #363636",
                time: 2,
                show: true,
                radius: 5
            }
        },
        methods: {
            ensure: function() {
                var me = this;
                var data=me.data.buffering_data;
                if (data.time <= 0) {
                    data.time = 1;
                }
                var obj = {
                    plugin_id: 905,
                    total: 0,
                    js: JSON.stringify({
                        time: data.time,
                        color:data.color.replace("#","")
                    }),
                    flag: 1,
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    })
})()