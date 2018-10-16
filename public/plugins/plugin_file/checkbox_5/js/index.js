;
(function() {
    var CheckBox = function() {};
    CheckBox.prototype = {
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
                var checkTwo = view.querySelector(".check-two");
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
                    view: checkTwo,
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
    DD.Plugin.create("checkBox", CheckBox);
    DD.createModule({
        el: '.nd-plugin-check-checkbox5',
        data: {
            check_data: {
                size: 24,
                yes_2: true,
                check_color: "#03a9f4",
                is_check: true,
                no_check_color: "#00000080"
            }
        },
        onBeforeFirstRender: function() {
            var data = this.data.check_data;
            if (window.data) {
                var tem = window.data;
                Object.keys(tem).forEach(i => {
                    data[i] = tem[i];
                })
            }
        }
    })
})()