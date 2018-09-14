;
(function() {
    var plugin_04002 = function() {};
    plugin_04002.prototype = {
        init: function(view) {
            var template = `<div class="check-one">
                                <div class="item" x-class="{'no-check':true}">
                                    <svg id="not-check-icon" class="fill no_check" viewBox="0 0 24 24" preserveAspectRatio="meet">
                                        <path id="_san_2032" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                                    </svg>
                                    <svg id="check-icon" class="fill check" viewBox="0 0 24 24" preserveAspectRatio="meet">
                                        <path id="_san_2038" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
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
                var checkTwo=view.querySelector(".check-one");
                var not_check = view.querySelector('#not-check-icon');
                var check = view.querySelector('#check-icon');
                DD.css(check, 'color', data.check_color);
                DD.css(not_check, 'color', data.no_check_color);
                DD.css(check, 'width', data.size + 'px');
                DD.css(check, 'height', data.size + 'px');
                DD.css(not_check, 'width', data.size + 'px');
                DD.css(not_check, 'height', data.size + 'px');
                if(data.is_check) {
                    DD.css(not_check, 'display', 'none');
                    DD.css(check, 'display', 'block');
                }else {
                    DD.css(not_check, 'display', 'block');
                    DD.css(check, 'display', 'none');
                }
                if(data)
                    new DD.Event({
                        view: checkTwo,
                        eventName: "click",
                        handler: function(e, d, v) {
                            var me = this;
                            data.is_check = !data.is_check;
                            if(data.is_check) {
                                DD.css(not_check, 'display', 'none');
                                DD.css(check, 'display', 'block');
                            }else {
                                DD.css(not_check, 'display', 'block');
                                DD.css(check, 'display', 'none');
                            }
                        }
                    });
            }, 0);
        }
    };
    DD.Plugin.create("check_box_3", plugin_04002);
    DD.createModule({
        name:"m_plugin_download_Checkbox_3",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/checkbox_3/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/checkbox_3/index.html",
        data:{
            check_data:{
                check_color:"#03a9f4",
                no_check_color:"#00000080",
                size:24,
                is_check:true
            }
        },
        methods:{
             ensure: function() {
                var me = this;
                var data=me.data.check_data;
                var obj = {
                    plugin_id: 1203,
                    class0: JSON.stringify({
                        names: '.nd-plugin-check-list .content-check .check-one .item .fill',
                        total: 1,
                        width: {
                            names: 'width',
                            values: data.size+"px",
                        },
                        height:{
                            names:"height",
                            values:data.size+'px'
                        }
                    }),
                    class1: JSON.stringify({
                        names: '.nd-plugin-check-list .content-check .check-one .item .no_check',
                        total: 1,
                        color: {
                            names: 'color',
                            values: data.no_check_color.replace("#", "")
                        }
                    }),
                    class2: JSON.stringify({
                        names: '.nd-plugin-check-list .content-check .check-one .item .check',
                        total: 1,
                        color: {
                            names: 'color',
                            values: data.check_color.replace("#", "")
                        }
                    }),
                    total: 3,
                    flag: 0
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
})()