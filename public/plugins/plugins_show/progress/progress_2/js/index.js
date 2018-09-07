/**
 * Created by xll on 2017/11/28.
 */

(function() {
    /**
     * 数据项配置说明
     * 参数proBar的取值为0~1或者是百分比,若是百分比，值为字符串
     */
    var plugin_11002 = function() {

    }

    plugin_11002.prototype.init = function(view) {
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
        view.$processBgColor = DD.attr(view, 'processBgColor');
        view.$processPercentColor = DD.attr(view, 'processPercentColor');
        view.$processPercentNumColor = DD.attr(view, 'processPercentNumColor');
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_11002.prototype.render = function(view) {
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
            DD.css(percent, "color", data[view.$processPercentNumColor]);
            DD.css(pro, "background-color", data[view.$processPercentColor]);
            DD.css(total, "background-color", data[view.$processBgColor]);
            var totalHeight = window.getComputedStyle(total, null).height;
            DD.css(pro, 'height', totalHeight);
            DD.css(percent, "line-height", totalHeight);
            DD.css(pro, 'border-radius', parseInt(totalHeight) / 1.5 + 'px');
            DD.css(total, 'border-radius', parseInt(totalHeight) / 1.5 + 'px');
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
        }
    };

    DD.Plugin.create("plugin_11002", plugin_11002);
}());