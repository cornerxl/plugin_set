;
(function() {
    var plugin_04001 = function() {};
    plugin_04001.prototype = {
        init: function(view) {
            var template = `<div class="check-content">
		<div class="empty"></div>
		<div class="check"></div>
	</div>`;
            view.innerHTML = template;
        },
        render: function(view) {
            var me = this;
            var data = view.$getData().data;
            setTimeout(function() {
                me.check = view.querySelector(".check");
                me.empty = view.querySelector(".empty");
                DD.css(me.empty,"background-color",data.empty_color);
                if (data.yes) {
                    DD.css(me.check, "background-color", data.check_color);
                } else {
                    DD.css(me.check, "background-color", data.no_check_color);
                }
                new DD.Event({
                    view:me.check,
                    eventName:"click",
                    handler:function(){
                        data.yes=!data.yes;
                    }
                });
            }, 0);
        }
    }
    DD.Plugin.create("plugin_04001", plugin_04001);
})()