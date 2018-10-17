/**
 * 3D switcher
 */
(function() {
    var Switcher = function() {};

    Switcher.prototype.init = function(view) {
        var me = this;
        var dataValue = DD.attr(view, 'dataValue');
        view.$dataValue = dataValue;
        view.removeAttribute('dataValue');
        var template = `<div class="nd-plugin-switcher-box" style="width{{width_d}}px"></div>`;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };
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
        setTimeout(delayRender, 1000);

        function delayRender() {
            var switcherBox = view.querySelector(".nd-plugin-switcher-box");
            var switcherBtn = view.querySelector(".nd-plugin-switcher-btn");
            var check = view.querySelector(".check");
            var switcherBoxParent = switcherBox.parentNode;
            var switcherBoxWidth = document.defaultView.getComputedStyle(switcherBoxParent, null).width;
            var switcherBoxHeight = document.defaultView.getComputedStyle(switcherBoxParent, null).height;
            DD.css(switcherBox, 'width', switcherBoxWidth);
            DD.css(switcherBox, 'height', switcherBoxHeight);
            DD.css(switcherBox, 'border-radius', switcherBoxHeight);
            var color1 = data.small_div.color_1;
            var color2 = data.small_div.color_2;
            var box_width=data.width_d/10;
            document.styleSheets[0].addRule('.nd-plugin-switcher-box::before', 'box-shadow:inset 0px 0px 0px '+box_width+'px '+color1+',inset 0px 0px 0px 1000px #fff');
            document.styleSheets[0].addRule('.nd-plugin-switcher-box::after', 'background-color:'+color1);
            document.styleSheets[0].addRule('.checked::before', 'box-shadow:inset 0px 0px 0px '+box_width+'px '+color2+',inset 0px 0px 0px 1000px #fff');
            document.styleSheets[0].addRule('.checked::after', 'background-color:'+color2);
            document.styleSheets[0].addRule('.checked::after', 'color:blue');
            if (data.switcher) {
                DD.css(switcherBox, 'box-shadow', '0 2px 5px 0px grey, 0 15px 20px 0px transparent');
                DD.addClass(switcherBox, 'checked');
            } else {
                DD.css(switcherBox, 'box-shadow', '0 5px 10px 0px #333, 0 15px 20px 0px #cccccc');
                DD.removeClass(switcherBox, 'checked');
            }
            DD.css(switcherBox, 'transition-property', 'box-shadow');
            DD.css(switcherBox, 'position', 'relative');
            DD.css(switcherBox, 'cursor', 'pointer');
            DD.css(switcherBox, 'transition', 'all 250ms ease-in');
            DD.css(switcherBox, '-webkit-transition-property', 'box-shadow');
            DD.css(switcherBox, '-webkit-transition', 'all 250ms ease-in');
            var clickEvent = function(e, d, v) {
                if (data[view.$dataValue]) {
                    data[view.$dataValue] = false;
                    DD.css(switcherBox, 'box-shadow', '0 2px 5px 0px grey, 0 15px 20px 0px transparent');
                    DD.removeClass(switcherBox, 'checked');
                } else {
                    data[view.$dataValue] = true;
                    DD.addClass(switcherBox, 'checked');
                    DD.css(switcherBox, 'box-shadow', '0 5px 10px 0px #333, 0 15px 20px 0px #cccccc');
                }
                view.$forceRender = true;
            };
            new DD.Event({
                eventName: 'click',
                view: view,
                handler: clickEvent
            });
        }
    }

    DD.Plugin.create('switcher', Switcher);
    DD.createModule({
        el:'.plugin-switcher-3',
        name: "m_plugin_download_Switch_3",
        data: {
            switcher: true,
            name:"3d按钮开关",
            width_d: window.innerWidth * 0.4,
            small_div: {
                color_1: '#cccccc',
                color_2: '#ff9900'
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            if(window.data){
                me.data.small_div.color_1=window.data.close_color;
                me.data.small_div.color_2=window.data.open_color;
            }
        }
    })
}());