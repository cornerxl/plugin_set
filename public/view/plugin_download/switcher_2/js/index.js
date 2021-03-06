/**
 * NEON TEXT TOGGLE
 */

;
(function() {
    var Switcher_2 = function () {

    };
    Switcher_2.prototype.init = function (view) {
        var me = this;
        var template =
            `<div class='nd-plugin-switcher-box'><div class='nd-plugin-switcher' id='on'>ON</div><div class='nd-plugin-switcher' id='off'>OFF</div></div>`;
        var dataValue = DD.attr(view, 'dataValue');
        view.$dataValue = dataValue;
        view.$bgColor = DD.attr(view, 'bgColor');
        view.$shadowColor = DD.attr(view, 'shadowColor');
        view.$btnColor = DD.attr(view, 'btnColor');
        view.removeAttribute('dataValue');
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };
    Switcher_2.prototype.render = function (view) {
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
        setTimeout(function () {
            var data = view.$getData().data;
            var color_1 = data[view.$bgColor];
            var color_2 = data[view.$shadowColor];
            var color_3 = data[view.$shadowColor];
            var color_4 = data[view.$btnColor];
            var switcherON = view.querySelector("#on");
            var switcherOFF = view.querySelector("#off");
            var switcherBox = view.querySelector('.nd-plugin-switcher-box');
            DD.css(switcherBox, 'background', color_1);
            DD.css(switcherBox, 'padding', '0 20px');
            DD.css(switcherBox, 'width', '400px');
            DD.css(switcherBox, 'cursor', 'pointer');
            DD.css(switcherON, 'display', 'inline-block');
            DD.css(switcherON, 'transition', '220ms ease-in-out');
            DD.css(switcherOFF, 'transition', '220ms ease-in-out');
            DD.css(switcherON, 'margin-right', '20px');
            DD.css(switcherOFF, 'display', 'inline-block');
            DD.css(switcherBox, 'font-size', '100px');
            DD.css(switcherBox, 'color', color_2);
            DD.css(switcherBox, 'text-shadow', '0 0 90px transparent');
            DD.css(view, 'user-select', 'none');
            if (data.switcher) {
                DD.css(switcherOFF, 'color', color_1);
                DD.css(switcherON, 'color', color_4);
                DD.css(switcherON, 'text-shadow', '0 0 5px #fff,0 0 10px #fff,0 0 20px ' + color_2 + ',0 0 35px ' + color_2 + ',0 0 40px ' + color_2 + ',0 0 50px ' + color_2);
                DD.css(switcherOFF, 'text-shadow', 'none');
            } else {
                DD.css(switcherOFF, 'color', color_4);
                DD.css(switcherON, 'color', color_1);
                DD.css(switcherOFF, 'text-shadow', '0 0 5px #fff,0 0 10px #fff,0 0 20px ' + color_3 + ',0 0 35px ' + color_3 + ',0 0 40px ' + color_3 + ',0 0 50px ' + color_3);
                DD.css(switcherON, 'text-shadow', 'none');
            }
            var clickEvent = function (e, d, v) {
                if (data[view.$dataValue]) {
                    data[view.$dataValue] = false;
                    DD.css(switcherOFF, 'color', color_4);
                    DD.css(switcherON, 'color', color_1);
                    DD.css(switcherOFF, 'text-shadow', '0 0 5px #fff,0 0 10px #fff,0 0 20px ' + color_3 + ',0 0 35px ' + color_3 + ',0 0 40px ' + color_3 + ',0 0 50px ' + color_3);
                    DD.css(switcherON, 'text-shadow', 'none');

                } else {
                    data[view.$dataValue] = true;
                    DD.css(switcherOFF, 'color', color_1);
                    DD.css(switcherON, 'color', color_4);
                    DD.css(switcherON, 'text-shadow', '0 0 5px #fff,0 0 10px #fff,0 0 20px ' + color_2 + ',0 0 35px ' + color_2 + ',0 0 40px ' + color_2 + ',0 0 50px ' + color_2);
                    DD.css(switcherOFF, 'text-shadow', 'none');
                }
                view.$forceRender = true;
            };
            new DD.Event({
                eventName: 'click',
                view: view,
                handler: clickEvent
            });
        }, 0);
    };
    DD.Plugin.create('textSwitcher', Switcher_2);
    DD.createModule({
        name: "m_plugin_download_Switch_2",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/switcher_2/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/switcher_2/index.html",
        data: {
            name: '3d开关',
            width_d: 200,
            switcher: false,
            bg_color: "#292827",
            shadow_color: "#FF9900",
            btn_color: "#FFFFFF"
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.width_d = window.innerWidth * 0.45;
        },
        methods: {
            ensure: function(e, data, view) {
                var me = this;
                var data=me.data;
                var obj = {
                    plugin_id: 302,
                    js: JSON.stringify({
                        color_1: data.bg_color.replace("#", ""),
                        color_2: data.shadow_color.replace("#", ""),
                        color_3: data.shadow_color.replace("#", ""),
                        color_4: data.btn_color.replace("#", "")
                    }),
                    total: 0,
                    flag: 1
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
}());