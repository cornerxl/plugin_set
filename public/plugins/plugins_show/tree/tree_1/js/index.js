;
(function() {
    var plugin_14001 = function() {};
    plugin_14001.prototype = {
        init: function(view) {},
        render: function(view) {
            var me = this;
            me.datas = view.$getData().data;
            if (!me.datas.one) {
                return;
            }
            me.datas.one = 0;
            me.create = function(arr) {
                var s = "";
                var tem = `<div class="item" id="{{txt}}" x-repeat="arr" x-show="show">
				   <div class="ct">
					      <div   e-click="check" x-class="{'check':'click'}" class="input"></div>
					      <span class="txt" e-click="show">{{txt}}</span>
				   </div>\r\n`;
                arr.forEach(function(i, index, a) {
                    if (i.arr) {
                        s += me.create(i.arr);
                    }
                    tem += s;
                    s = "";
                });
                return tem + `</div>\r\n`;
            };
            var str = me.create(me.datas.arr);
            view.innerHTML = str;
            DD.Compiler.compile(view, view.$module);
        }
    };
    DD.Plugin.create("plugin_14001", plugin_14001);
})()