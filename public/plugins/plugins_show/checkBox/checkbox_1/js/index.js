;
(function() {
    var plugin_04001 = function() {};
    plugin_04001.prototype = {
        init: function(view) {
            var template = `<div class="check-content">
		<div class="empty"></div>
		<div class="check" x-class="{'no-check':'!yes','check':'yes'}"></div>
	</div>`;
            view.innerHTML = template;
        },
        render: function(view) {
            var me = this;
            var data = view.$getData().data;
            setTimeout(function() {
                me.check = view.querySelector(".check");
                me.empty = view.querySelector(".empty");
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
    DD.createModule({
        el: '.nd-plugin-check-1',
        data: {
            check_color: '#26a2ff',
            no_check_color: '#ffffff',
            empty_color: '#cccccc',
            yes: true,
        },
    });
})()