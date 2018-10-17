/**
 * switcher
 */
(function() {
    var Switcher = function() {

    };

    Switcher.prototype.init = function(view) {
        var me = this;
        var template = `<div class="nd-plugin-switcher-box">
            <div class="nd-plugin-switcher-btn"></div></div>`;
        DD.addClass(view, 'nd-plugin-switcher');
        var data = DD.attr(view, 'dataItem') || 'data';
        //数据项名字
        view.$dataItem = data;
        view.$switchStatus = DD.attr(view, 'switchStatus');
        view.$openColor = DD.attr(view, 'openColor');
        view.$closeColor = DD.attr(view, 'closeColor');
        view.$btnColor = DD.attr(view, 'btnColor');
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    Switcher.prototype.render = function(view) {
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
            //初始化设置switcher
            var switcherBox = view.querySelector(".nd-plugin-switcher-box");
            var switcherBtn = view.querySelector(".nd-plugin-switcher-btn");
            DD.css(switcherBtn, 'background-color', data[view.$btnColor]);
            var switcherBoxParent = switcherBox.parentNode.parentNode;
            var switcherBoxWidth = document.defaultView.getComputedStyle(switcherBoxParent, null).width;
            var switcherBoxHeight = document.defaultView.getComputedStyle(switcherBoxParent, null).height;
            DD.css(switcherBox, 'width', switcherBoxWidth);
            DD.css(switcherBox, 'height', switcherBoxHeight);
            DD.css(switcherBtn, 'width', switcherBoxHeight);
            DD.css(switcherBtn, 'height', switcherBoxHeight);
            DD.css(switcherBox, 'border-radius', switcherBoxHeight);
            var slideWidth = parseInt(document.defaultView.getComputedStyle(switcherBox, null).width) - parseInt(document.defaultView.getComputedStyle(switcherBtn, null).width);
            if (data.switcher) {
                DD.css(switcherBox, 'background-color', data[view.$openColor]);
                DD.css(switcherBtn, 'left', slideWidth + 2 + 'px');
            } else {
                DD.css(switcherBox, 'background-color', data[view.$closeColor]);
            }


            //点击事件
            var clickEvent = function (e, d, v) {
                if (data[view.$dataItem]) {
                    data[view.$dataItem] = false;
                    DD.css(switcherBox, 'background-color', data[view.$openColor]);
                    DD.css(switcherBtn, 'left', 0);
                } else {
                    data[view.$dataItem] = true;
                    DD.css(switcherBox, 'background-color', data[view.$closeColor]);
                    DD.css(switcherBtn, 'left', slideWidth + 2 + 'px');
                }
                DD.css(switcherBox, 'transition-property', 'border');
                DD.css(switcherBox, 'transition-duration', '400ms');
                DD.css(switcherBox, '-webkit-transition-property', 'border');
                DD.css(switcherBox, '-webkit-transition-duration', '400ms');
                DD.css(switcherBox, 'transition-property', 'box-shadow');
                DD.css(switcherBox, 'transition-duration', '400ms');
                DD.css(switcherBox, '-webkit-transition-property', 'box-shadow');
                DD.css(switcherBox, '-webkit-transition-duration', '400ms');
                DD.css(switcherBox, 'transition-property', 'background-color');
                DD.css(switcherBox, 'transition-duration', '1200ms');
                DD.css(switcherBox, '-webkit-transition-property', 'background-color');
                DD.css(switcherBox, '-webkit-transition-duration', '1200ms');

                DD.css(switcherBtn, 'transition-property', 'left');
                DD.css(switcherBtn, 'transition-duration', '500ms');
                DD.css(switcherBtn, '-webkit-transition-property', 'left');
                DD.css(switcherBtn, '-webkit-transition-duration', '500ms');
                DD.css(switcherBtn, '-moz-transition-property', 'left');
                DD.css(switcherBtn, '-moz-transition-duration', '500ms');
                DD.css(switcherBtn, '-o-transition-property', 'left');
                DD.css(switcherBtn, '-o-transition-duration', '500ms');
                view.$forceRender = true;
            }

            //添加按钮事件
            new DD.Event({
                eventName: 'click',
                view: view,
                handler: clickEvent
            });
        }
    }

    DD.Plugin.create("switcher", Switcher);
    DD.createModule([{
        el: '.plugin-switcher',
        data: {
            switcher: true,
            width_d: window.innerWidth * 0.5,
            open_color: "#4BD763",
            close_color: "#F9F9F9",
            btn_color: "#ffffff"
        },
        onBeforeFirstRender: function() {
            var me = this;
            if (window.data) {
                if (window.data.color_1) {
                    me.data.open_color = window.data.color_1;
                }
                if (window.data.color_2) {
                    me.data.close_color = window.data.color_2;
                }
                if (window.data.color_3) {
                    me.data.btn_color = window.data.color_3;
                }
            }
        }
    }]);
}());