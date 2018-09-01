/**
 * Created by xll on 2017/11/28.
 */

(function() {
    /**
     * 数据项配置说明
     * 参数proBar的取值为0~1或者是百分比,若是百分比，值为字符串
     */
    var ProBar = function() {

    }

    ProBar.prototype.init = function(view) {
        var me = this;
        var template = `<div class="nd-plugin-probar-box">
                            <div class="nd-plugin-probar-total">
                                <span class="nd-plugin-probar-pro"></span>
                                <span class="nd-plugin-probar-percent"></span>
                            </div>
                        </div>`;
        DD.addClass(view, 'nd-plugin-probar');
        var data = DD.attr(view, 'dataItem');
        var show = DD.attr(view, 'showItem');
        view.$dataName = data;
        view.$showItem = show;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    ProBar.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 0);

        function delayRender() {
            var total = view.querySelector(".nd-plugin-probar-total");
            var pro = view.querySelector(".nd-plugin-probar-pro");
            var percent = view.querySelector(".nd-plugin-probar-percent");
            DD.css(percent, "color", data.color_1);
            DD.css(pro, "background-color", data.color_2);
            DD.css(total, "background-color", data.color_3);
            var totalHeight = window.getComputedStyle(total, null).height;
            if (data[view.$showItem]) {
                //判断data[view.$dataName]是百分比还是小数
                if (typeof data[view.$dataName] === 'string') {
                    var percentNum = parseInt(data[view.$dataName].replace("%", ""));
                    if (percentNum >= 0 && percentNum <= 100) {
                        DD.css(pro, 'width', data[view.$dataName]);
                        percent.innerText = data[view.$dataName];
                        DD.css(percent, 'left', data[view.$dataName]);
                    } else {
                        alert("百分比取值为1%~100%");
                    }
                } else {
                    //判断小数是否在0~1范围
                    if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
                        DD.css(pro, 'width', data[view.$dataName] * 100 + '%');
                        percent.innerText = data[view.$dataName] * 100 + '%';
                        var percentRight = parseFloat(data[view.$dataName]) * 100 + '%';
                        DD.css(percent, 'left', percentRight);
                    } else if (data[view.$dataName] < 0 || data[view.$dataName] > 1) {
                        alert("请输入正确的proBar值！");
                    }
                }

            } else {
                if (typeof data[view.$dataName] === 'string') {
                    var percentNum = parseInt(data[view.$dataName].replace("%", ""));
                    if (percentNum >= 0 && percentNum <= 100) {
                        DD.css(pro, 'width', data[view.$dataName]);
                    } else {
                        alert("百分比取值为1%~100%");
                    }
                } else {
                    if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
                        DD.css(pro, 'width', data[view.$dataName] * 100 + '%');
                    } else if (data[view.$dataName] < 0 || data[view.$dataName] > 1) {
                        alert("请输入正确的proBar值！");
                    }
                }
            }

            DD.css(pro, 'height', totalHeight);
            DD.css(pro, 'border-radius', parseInt(totalHeight) / 1.5 + 'px');
        }
    }

    DD.Plugin.create("proBar", ProBar);
    DD.createModule({
        name: 'm_plugin_download_Progress_2',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/progress_2/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/progress_2/index.html",
        data: {
            name: "普通进度条",
            proBar: 0.9,
            percent: true,
            color_1: "#ffffff",
            color_2: '#4A98FF',
            color_3: '#DDDDDD'
        },
        onBeforeFirstRender:function(){
            var me=this;
            me.data.color_1='#ffffff';
            me.data.color_2='#4A98FF';
            me.data.color_3='#DDDDDD';
        },
        methods: {
            ensure: function() {
                var me = this;
                var obj = {
                    plugin_id: 502,
                    class0:JSON.stringify({
                        names:".nd-plugin-probar-box .nd-plugin-probar-total .nd-plugin-probar-pro",
                        background:{
                            names:"background-color",
                            values:me.data.color_2.replace("#","")
                        },
                        total:1
                    }),
                    class1:JSON.stringify({
                        names:".nd-plugin-probar-box .nd-plugin-probar-totals",
                        background:{
                            names:"background-color",
                            values:me.data.color_3.replace("#","")
                        },
                        total:1
                    }),
                    class2:JSON.stringify({
                        names:".nd-plugin-probar-box .nd-plugin-probar-total .nd-plugin-probar-percent",
                        background:{
                            names:"color",
                            values:me.data.color_1.replace("#","")
                        },
                        total:1
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
    })
}())