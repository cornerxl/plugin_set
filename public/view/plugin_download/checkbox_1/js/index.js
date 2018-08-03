;
(function() {
    var checkBox = function() {};
    checkBox.prototype = {
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
     DD.Plugin.create("checkBox-1", checkBox);
    DD.createModule({
        name:"m_plugin_download_Checkbox_1",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/checkbox_1/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/checkbox_1/index.html",
        data: {
            name:'普通选择框',
            check_color: '#26a2ff',
            no_check_color: '#ffffff',
            empty_color: '#cccccc',
            yes: true,
        },
        onBeforeFirseRender:function(){
            var me=this;
            me.data.check_color='#26a2ff';
            me.data.no_check_color='#ffffff';
            me.data.empty_color='#cccccc';
            me.data.yes=true;
        },
        methods:{
            ensure: function() {
                var me = this;
                var obj = {
                    plugin_id: 1201,
                    total: 3,
                    class0:JSON.stringify({
                        names:".nd-plugin-check-1 .check-content .check",
                        background:{
                            names:"background-color",
                            values:me.data.check_color.replace("#","")
                        },
                        total:1
                    }),
                     class1:JSON.stringify({
                        names:".nd-plugin-check-1 .check-content .empty",
                        background:{
                            names:"background-color",
                            values:me.data.empty_color.replace("#","")
                        },
                         total:1
                    }),
                      class2:JSON.stringify({
                        names:".nd-plugin-check-1 .check-content .no-check",
                        background:{
                            names:"background-color",
                            values:me.data.no_check_color.replace("#","")
                        },
                         total:1
                    }),
                    flag: 0,
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
})()