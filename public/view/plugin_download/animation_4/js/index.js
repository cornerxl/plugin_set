;
(function() {
    var el_animation_4 = function() {};
    el_animation_4.prototype = {
        init: function(view) {
            var template = `<div class="content">
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
			              </div>`;
            view.$dataItem = DD.attr(view, "dataName");
            view.removeAttribute("dataName");
            view.innerHTML = template;
        },
        render: function(view) {
            var me = this;
            var data = view.$getData().data[view.$dataItem];
            var color = data.color;
            var time = data.time;
            var height = parseInt(data.height);
            var width = parseInt(data.width);
            setTimeout(function() {
                var span = view.querySelectorAll(".my_span");
                var content = view.querySelector(".content");
                DD.css(content, "width", width + 'px');
                span.forEach(function(i, index) {
                    DD.css(i, "animation-delay", index * time / 4 + 's');
                    DD.css(i, "background-color", color);
                    DD.css(i, "height", height + 'px');
                    DD.css(i, "width", ( 0.5 * width) / span.length + 'px');
                });
            }, 0);
        }
    };
    DD.Plugin.create("el-animation-4", el_animation_4);
    DD.createModule({
        name: 'm_plugin_download_Animation_4',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/animation_4/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/animation_4/index.html",
        data: {
            name: "闪烁动画",
            buffering_data: {
                color: '#00bfff',
                time: 0.8,
                width: 150,
                height:70
            }
        },
        methods: {
            ensure: function() {
                var me = this;
                var data=me.data.buffering_data;
                console.log(data);
                if (data.time < 0) {
                    data.time = 1;
                }
                var obj = {
                    plugin_id: 904,
                    // class0: JSON.stringify({
                    //     names: '.el-animation-4 .content span',
                    //     total: 1,
                    //     background_color: {
                    //         names: 'background-color',
                    //         values: data.color.replace("#", "")
                    //     }
                    // }),
                    total: 0,
                    js: JSON.stringify({
                        time:data.time,
                        color: data.color.replace("#", ""),
                        width: data.width,
                        height: data.height
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
})();