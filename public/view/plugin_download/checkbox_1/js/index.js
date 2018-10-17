;
(function() {
    var checkBox = function() {};
    checkBox.prototype = {
        init: function(view) {
            var template = `<div class="check-content">
                                <div class="check">
                                    <div class="check-center"></div>
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
            var me = this;
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                me.check = view.querySelector(".check");
                var checkCenter = view.querySelector('.check-center');
                DD.css(me.check, 'width', data.size + 'px');
                DD.css(me.check, 'height', data.size + 'px');
                if(data.is_circle) {
                    DD.css(me.check, 'border-radius', '100%');
                    DD.css(checkCenter, 'border-radius', '100%');
                } else {
                    DD.css(me.check, 'border-radius', 0);
                    DD.css(checkCenter, 'border-radius', 0);
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
                        data.is_check = !data.is_check;
                    }
                });
            }, 0);
        }
    }
    DD.Plugin.create("checkBox-1", checkBox);
    DD.createModule({
        name: "m_plugin_download_Checkbox_1",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/checkbox_1/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/checkbox_1/index.html",
        data: {
            name: '普通选择框',
            check_data : {
                check_color: '#26a2ff',
                no_check_color: '#ffffff',
                empty_color: '#cccccc',
                is_check: false,
                is_circle: false,
                size: 20
            }
        },
        onBeforeFirseRender: function() {
            var me = this;
        },
        methods: {
            ensure: function(e, data, view) {
                var me = this;
                var data=me.data.check_data;
                var obj = {
                    plugin_id: 1201,
                    total: 0,
                    js:JSON.stringify({
                        is_circle:me.data.check_data.is_circle,
                        check_color: me.data.check_data.check_color.replace('#', ''),
                        no_check_color: me.data.check_data.no_check_color.replace('#', ''),
                        empty_color: me.data.check_data.empty_color.replace('#', ''),
                        is_check: me.data.check_data.is_check,
                        size: me.data.check_data.size
                    }),
                    flag:1,
                }
                if(view.innerHTML.indexOf('Less') > -1) {
                    obj.isLess = true;
                }else {
                    obj.isLess = false;
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
})()