;
(function() {
    var plugin_040031 = function() {};
    plugin_040031.prototype = {
        init: function(view) {
            var template = `<div class="check-two">
                                <div class="check-icon">
                                    favorite
                                </div>
                                <div class="check-icon">
                                    favorite_border
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
        },
        render: function(view) {
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                var checkTwo=view.querySelector(".check-two");
                var divs = view.querySelectorAll('.check-icon');
                DD.css(divs[0], 'color', data.check_color);
                DD.css(divs[1], 'color', data.no_check_color);
                if(data.is_check) {
                    DD.css(divs[0], 'visibility', 'visible');
                    DD.css(divs[1], 'visibility', 'hidden');
                }else {
                    DD.css(divs[0], 'visibility', 'hidden');
                    DD.css(divs[1], 'visibility', 'visible');
                }
                divs.forEach(function (item) {
                    DD.css(item, 'font-size', data.size + 'px');
                })
                new DD.Event({
                    view: checkTwo,
                    eventName: "click",
                    handler: function(e, d, v) {
                        var me = this;
                        data.is_check = !data.is_check;
                        if(data.is_check) {
                            DD.css(v, 'color', data.check_color);
                        }else {
                            DD.css(v, 'color', data.no_check_color);
                        }
                    }
                });
            }, 0);
        }
    };
    DD.Plugin.create("check_box_5", plugin_040031);
     DD.createModule({
        // el: '.nd-plugin-check-checkbox5',
        name:"m_plugin_download_Checkbox_5",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/checkbox_5/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/checkbox_5/index.html",
        data: {
            name: "心形选择框",
            check_data: {
                size: 24,
                check_color: "#03a9f4",
                is_check: true,
                no_check_color: "#00000080"
            }
        },
        methods:{

              ensure: function() {
                var me = this;
                var data=me.data.check_data;
                var obj = {
                    plugin_id: 1205,
                    total: 0,
                    js:JSON.stringify({
                        size:data.size,
                        check_color:data.check_color.replace("#",""),
                        no_check_color:data.no_check_color.replace("#",""),
                        is_check: data.is_check
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