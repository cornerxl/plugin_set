;
(function() {
    var plugin_04001 = function() {};
    plugin_04001.prototype = {
        init: function(view) {
            var template = `<div class="check-content">
                                <div class="check"></div>
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
            var me = this;
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                me.check = view.querySelector(".check");
                DD.css(me.check, 'width', data.size + 'px');
                DD.css(me.check, 'height', data.size + 'px');
                if(data.is_circle) {
                    DD.css(me.check, 'border-radius', '100%');
                }

                if (data.is_check) {
                    DD.css(me.check, "background-color", data.check_color);
                } else {
                    DD.css(me.check, "background-color", data.no_check_color);
                }
                new DD.Event({
                    view:me.check,
                    eventName:"click",
                    handler:function(){
                        data.is_check=!data.is_check;
                    }
                });
            }, 0);
        }
    }
    DD.Plugin.create("plugin_04001", plugin_04001);
})()