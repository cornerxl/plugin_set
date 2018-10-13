;
(function() {
    var plugin_04003 = function() {};
    plugin_04003.prototype = {
        init: function(view) {
            var template = `<div class="check-three">
                                <div class="check-icon" x-class="{'check':'yes_2'}">
                                    visibility_off
                                </div>
                                <div class="check-icon" x-class="{'no-check':'!yes_2'}">
                                    visibility
                                </div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataName');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var data = view.$getData().data[view.$dataItem];

            setTimeout(function() {
                var checkThree = view.querySelector(".check-three");
                var divs = view.querySelectorAll('.check-icon');
                DD.css(divs[0], 'color', data.check_color);
                DD.css(divs[1], 'color', data.no_check_color);
                if (data.is_check) {
                    DD.css(divs[0], 'visibility', 'visible');
                    DD.css(divs[1], 'visibility', 'hidden');
                } else {
                    DD.css(divs[0], 'visibility', 'hidden');
                    DD.css(divs[1], 'visibility', 'visible');
                }
                divs.forEach(function(item) {
                    DD.css(item, 'font-size', data.size + 'px');
                })
                new DD.Event({
                    view: checkThree,
                    eventName: "click",
                    handler: function(e, d, v) {
                        var me = this;
                        data.is_check = !data.is_check;
                        if (data.is_check) {
                            DD.css(v, 'color', data.check_color);
                        } else {
                            DD.css(v, 'color', data.no_check_color);
                        }
                    }
                });
            }, 0);
        }
    };
    DD.Plugin.create("plugin_04003", plugin_04003);
})()