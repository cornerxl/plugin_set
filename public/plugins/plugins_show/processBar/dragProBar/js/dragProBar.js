/**
 * Created by xll on 2017/11/29.
 */
'use strict';
(function () {

    /**
     * 数据项配置说明
     * 参数dragProBar的取值为最大值maxValue和最小值minValue之间的数值
     * maxValue 是最大值
     * minValue 是最小值
     * runnableColor slider的颜色
     * runnableBeforeColor slider选中的颜色
     * runnableBtnColor 按钮颜色
     * showNum 是否显示数值
     * showNumColor 数值颜色
     */
    var DragProBar = function () {

    }

    DragProBar.prototype.init = function (view) {
        var me = this;
        var template = `<div class="nd-plugin-dragprobar-box">
                            <div class="nd-plugin-dragprobar-runnable">
                                <span class="nd-plugin-dragprobar-runnable-before"></span>
                                <span class="nd-plugin-dragprobar-btn"></span>
                            </div>
                            <div class="nd-plugin-dragprobar-runnable-num"></div>
                        </div>`;
        DD.addClass(view, 'nd-plugin-dragprobar');
        //获取数据项名
        var data = DD.attr(view, 'dataItem');
        if(data) {
            view.$dataName = data;
        }else {
            alert('请配置dataItem！');
        }
        //获取最大值名
        var maxValue = DD.attr(view, 'maxValue');
        if(maxValue) {
            view.$maxValue = maxValue;
        }else {
            alert('请配置maxValue！');
        }
        //获取最小值名
        var minValue = DD.attr(view, 'minValue');
        if(minValue) {
            view.$minValue = minValue;
        }else {
            alert("请配置minValue")
        }
        //获取runnable颜色名
        var runnableColor = DD.attr(view, 'runnableColor');
        view.$runnableColor = runnableColor;
        //获取runnableBeforeColor颜色名
        var runnableBeforeColor = DD.attr(view, 'runnableBeforeColor');
        view.$runnableBeforeColor = runnableBeforeColor;
        //获取runnableBtnColor颜色名
        var runnableBtnColor = DD.attr(view, 'runnableBtnColor');
        view.$runnableBtnColor = runnableBtnColor;
        //获取是否显示数值名
        var showNum = DD.attr(view, 'showNum');
        view.$showNum = showNum;
        //获取显示数值颜色
        var showNumColor = DD.attr(view, 'showNumColor');
        view.$showNumColor = showNumColor;
        //获取显示数值类型
        // var showNumStyle = DD.attr(view, 'showNumStyle');
        // view.$showNumStyle = showNumStyle;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    DragProBar.prototype.render = function (view) {
        var me = this;
        var data = view.$getData().data;
        if(!data){
            return;
        }
        var module;
        if(!data.module){
            module = view.$module;
        }else {
            module = data.module;
        }
        if(!module){
            return;
        }
        setTimeout(delayRender, 0);

        function delayRender() {
            var box = document.querySelector(".nd-plugin-dragprobar-box");
            var boxParents = box.parentNode.parentNode;
            var runnableBefore = document.querySelector(".nd-plugin-dragprobar-runnable-before");
            var btn = document.querySelector(".nd-plugin-dragprobar-btn");
            var runnable = document.querySelector(".nd-plugin-dragprobar-runnable");
            var runnableNum = document.querySelector('.nd-plugin-dragprobar-runnable-num');
            var boxPercentsStyle = window.getComputedStyle(boxParents, null);
            DD.css(box, 'height', boxPercentsStyle.height);


            //判断maxValue是否大于minValue
            if(data[view.$maxValue] > data[view.$minValue]){
                //判断用户是否配置runnable、runnableBefore、btn的颜色，若没有配置，使用默认
                if(data[view.$runnableColor]) {
                    DD.css(runnable, 'background-color', data[view.$runnableColor]);
                }else {
                    DD.css(runnable, 'background-color', '#000');
                }

                if(data[view.$runnableBeforeColor]) {
                    DD.css(runnableBefore, 'background-color', data[view.$runnableBeforeColor]);
                }else {
                    DD.css(runnableBefore, 'background-color', '#FFF');
                }

                if(data[view.$runnableBtnColor]){
                    DD.css(btn, 'background-color', data[view.$runnableBtnColor]);
                }else {
                    DD.css(btn, 'background-color', '#FFF');
                }
                var diffValue = parseInt(data[view.$maxValue]) - parseInt(data[view.$minValue]);
                if(data[view.$dataName] >= data[view.$minValue] && data[view.$dataName] <= data[view.$maxValue]){
                    var runnableBeforeWidth = parseFloat(data[view.$dataName] / diffValue) * 100 + '%';
                    DD.css(runnableBefore, 'width', runnableBeforeWidth);
                    DD.css(btn, 'left', runnableBeforeWidth);
                    //如果显示是数字
                    if(data[view.$showNum]) {
                        DD.css(runnable, 'width', '80%');
                        DD.css(runnableNum, 'width', '20%');
                        if(data[view.$showNumColor]) {
                            DD.css(runnableNum, 'color', data[view.$showNumColor]);
                        }else {
                            DD.css(runnableNum, 'color', '#FFF');
                        }
                        runnableNum.innerText = parseInt(data[view.$dataName]);
                    }else {
                        DD.css(runnable, 'width', '100%');
                    }
                }else {
                    alert(view.$dataName + '值应大于等于' + data[view.$minValue] + '，小于等于' + data[view.$maxValue]);
                }
            }else {
                alert(view.$maxValue + '值应大于' + view.$minValue);
            }

            var clickEvent = function () {
                //判断鼠标是否按下
                var flag = false;
                btn.addEventListener('touchstart', function () {
                    flag = true;
                    boxParents.addEventListener('touchmove', function (e) {
                        e.preventDefault();
                        if(flag) {
                            var percentWidth;
                            var runnableWidth = window.getComputedStyle(runnable, null).width;
                            if(e.touches[0].pageX >= parseFloat(runnableWidth)) {
                                percentWidth = '100%';
                            }else if(e.touches[0].pageX <= 0) {
                                percentWidth = 0;
                            }else {
                                data[view.$dataName] = e.touches[0].pageX / parseFloat(runnableWidth) * diffValue;
                                percentWidth = e.touches[0].pageX / parseFloat(runnableWidth) * 100 + '%';
                            }
                            DD.css(runnableBefore, 'width', percentWidth);
                            DD.css(btn, 'left', percentWidth);

                        }
                    })
                    boxParents.addEventListener('touchend',function () {
                        flag = false;
                    })
                });
            }
            clickEvent();
        }
    }


    DD.Plugin.create("dragProBar", DragProBar);
}())