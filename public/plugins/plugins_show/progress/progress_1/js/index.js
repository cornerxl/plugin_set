/**
 * Created by xll on 2017/11/30.
 */
;(function() {

    /**
     * 数据项配置说明
     * 参数dragProBar的取值为0~1或者是百分比,若是百分比，值为字符串
     * showStyle表示水平显示还是垂直显示
     */
    var plugin_11001 = function() {

    }

    plugin_11001.prototype.init = function(view) {
        var me = this;
        var template = `<div class="nd-plugin-dragprobar-box">
                            <div class="nd-plugin-dragprobar-total">
                                <span class="nd-plugin-dragprobar-percent"></span>
                                <span class="nd-plugin-dragprobar-btn"></span>
                            </div>
                        </div>`;
        DD.addClass(view, 'nd-plugin-dragprobar');
        //数据项名
        var data = DD.attr(view, 'dataItem');
        view.$dataName = data;
        //显示样式
        var showStyle = DD.attr(view, 'showStyle');
        view.$showStyle = showStyle;

        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_11001.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data.data;
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
            var box = document.querySelector(".nd-plugin-dragprobar-box");
            DD.css(box,"background-color","rgba(96,96,96,0.5)");
            var boxParents = box.parentNode.parentNode;
            var boxParentsStyle = window.getComputedStyle(boxParents, null);
            var percent = document.querySelector(".nd-plugin-dragprobar-percent");
            var btn = document.querySelector(".nd-plugin-dragprobar-btn");
            var total = document.querySelector(".nd-plugin-dragprobar-total");
            var totalWidth;
            var totalHeight;
            if (data[view.$showStyle] === "vertical") {
                //设置总滑动条长宽
                DD.css(total, 'width', '10px');
                DD.css(total, 'height', boxParentsStyle.height);
                totalWidth = window.getComputedStyle(total, null).width;
                totalHeight = window.getComputedStyle(total, null).height;
                //设置percent的width
                DD.css(percent, 'width', '10px');
                //设置percent的height，top及btn的top
                if (data[view.$dataName]) {
                    if (typeof data[view.$dataName] === 'string') {
                        var percentNum = parseInt(data[view.$dataName].replace("%", ""));
                        if (percentNum >= 0 && percentNum <= 100) {
                            DD.css(percent, 'height', data[view.$dataName]);
                            DD.css(percent, 'top', (parseInt(100) - parseInt(percentNum)) + '%');
                            DD.css(btn, 'top', (parseInt(100) - parseInt(percentNum)) + '%');
                        } else {
                            alert("百分比取值为1%~100%");
                        }
                    } else {
                        if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
                            var percentHeight = data[view.$dataName] * 100 + '%';
                            DD.css(percent, 'height', percentHeight);
                            DD.css(percent, 'top', (parseFloat(1) - parseFloat(data[view.$dataName])) * 100 + '%');
                            DD.css(btn, 'top', (parseFloat(1) - parseFloat(data[view.$dataName])) * 100 + '%');
                        } else if (parseFloat(data[view.$dataName]) < 0 || parseFloat(data[view.$dataName]) > 1) {
                            alert("请输入正确的dragProBar值！");
                        }
                    }
                } else {
                    alert("找不到数据dragProBar！")
                }

            } else if (data[view.$showStyle] === 'horizontal') {
                DD.css(box, 'height', boxParentsStyle.height);
                //设置总滑动条长宽
                DD.css(total, 'width', boxParentsStyle.width);
                DD.css(total, 'height', '2px');
                totalWidth = window.getComputedStyle(total, null).width;
                totalHeight = window.getComputedStyle(total, null).height;
                //设置percent的width
                DD.css(percent, 'height', '2px');

                if (data[view.$dataName]) {
                    if (typeof data[view.$dataName] === 'string') {
                        var percentNum = parseInt(data[view.$dataName].replace("%", ""));
                        if (percentNum >= 0 && percentNum <= 100) {
                            DD.css(percent, 'width', data[view.$dataName]);
                            DD.css(btn, 'left', data[view.$dataName]);
                        } else {
                            alert("百分比取值为1%~100%");
                        }
                    } else {
                        if (data[view.$dataName] >= 0 && data[view.$dataName] <= 1) {
                            DD.css(percent, 'width', data[view.$dataName] * 100 + '%');
                            DD.css(btn, 'left', data[view.$dataName] * 100 + '%');
                        } else if (parseFloat(data[view.$dataName]) < 0 || parseFloat(data[view.$dataName]) > 1) {
                            alert("请输入正确的dragProBar值！");
                        }
                    }
                } else {
                    alert("找不到数据dragProBar！");
                }
            }
            var clickEvent = function() {
                //判断鼠标是否按下
                var flag = false;
                btn.addEventListener('touchstart', function() {
                    flag = true;
                    boxParents.addEventListener('touchmove', function(e) {
                        e.preventDefault();
                        if (flag) {
                            if (data[view.$showStyle] === 'vertical') {
                                var percentHeight;
                                e.touches[0]
                                if (e.touches[0].pageY >= parseFloat(totalHeight)) {
                                    percentHeight = 0;
                                } else if (e.touches[0].pageY <= 0) {
                                    percentHeight = "100%";
                                } else {
                                    data[view.$dataName] = parseFloat(1) - parseFloat(e.touches[0].pageY / parseFloat(totalHeight));
                                    percentHeight = data[view.$dataName] * 100 + '%';
                                }

                                DD.css(percent, 'height', percentHeight);
                                DD.css(percent, 'top', (parseFloat(1) - parseFloat(data[view.$dataName])) * 100 + '%');
                                DD.css(btn, 'top', (parseFloat(1) - parseFloat(data[view.$dataName])) * 100 + '%')
                            } else if (data[view.$showStyle] === 'horizontal') {
                                var percentWidth;
                                if (e.touches[0].pageX >= parseFloat(totalWidth)) {
                                    percentWidth = '100%';
                                } else if (e.touches[0].pageX <= 0) {
                                    percentWidth = 0;
                                } else {
                                    data[view.$dataName] = e.touches[0].pageX / parseFloat(totalWidth);
                                    percentWidth = data[view.$dataName] * 100 + '%';
                                }
                                DD.css(percent, 'width', percentWidth);
                                DD.css(btn, 'left', percentWidth);
                            }
                        }
                    })
                    boxParents.addEventListener('touchend', function() {
                        flag = false;
                    })
                });
            }
            clickEvent();
            new DD.Event({
                eventName: 'click',
                view: box,
                delg: true,
                capture:true,
                handler: function(e, data, view) {
                    var me = this;
                    if (e.target.className === 'nd-plugin-dragprobar-btn') {
                        return;
                    }
                    var box_width = parseInt(DD.css(box, 'width'));
                    data[view.$dataName] = e.offsetX / box_width;
                    DD.css(percent, "width", e.offsetX + 'px');
                    DD.css(btn, "left", e.offsetX + 'px');
                }
            });
        }
    }
    DD.Plugin.create('plugin_11001', plugin_11001);
}());