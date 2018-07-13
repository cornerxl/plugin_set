/**
 * 3D switcher
 */

(function() {

    var ThreeDimensionSwithcerA = function() {};

    ThreeDimensionSwithcerA.prototype.init = function(view) {
        var me = this;
        var dataValue = DD.attr(view, 'dataValue');
        view.$dataValue = dataValue;
        view.removeAttribute('dataValue');
        var template = "<div class='nd-plugin-switcher-box'></div>";
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };
    ThreeDimensionSwithcerA.prototype.render = function(view) {
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
            var switcherBox = view.querySelector(".nd-plugin-switcher-box");
            var switcherBtn = view.querySelector(".nd-plugin-switcher-btn");
            var check = view.querySelector(".check");
            var switcherBoxParent = switcherBox.parentNode;
            var switcherBoxWidth = document.defaultView.getComputedStyle(switcherBoxParent, null).width;
            var switcherBoxHeight = document.defaultView.getComputedStyle(switcherBoxParent, null).height;
            DD.css(switcherBox, 'width', switcherBoxWidth);
            DD.css(switcherBox, 'height', switcherBoxHeight);
            DD.css(switcherBox, 'border-radius', switcherBoxHeight);
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
                    window.check = view.querySelector(".checked");
                    data[view.$dataValue] = false;
                    DD.css(switcherBox, 'box-shadow', '0 2px 5px 0px grey, 0 15px 20px 0px transparent');
                    DD.removeClass(switcherBox, 'checked');
                } else {
                    var before = window.getComputedStyle(window.check, ":before");
                    var after = window.getComputedStyle(window.check, ":after");
                    
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

    DD.Plugin.create('ThreeDimensionSwithcerA', ThreeDimensionSwithcerA);
    DD.createModule({
        name: "m_plugin_download_Switch_3",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/switcher_3/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/switcher_3/index.html",
        data: {
            switcher:true,
            width_d: window.innerWidth * 0.4
        },
        onBeforeFirstRender: function() {
            var me = this;

        }
    })
}());