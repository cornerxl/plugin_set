/**
 * 选择框插件
 */

(function() {
    var plugin_06002 = function() {};
    plugin_06002.prototype.init = function(view) {
        var me = this;
        var template = "<div class='nd-plugin-select-box'><div class='quit-area'></div><div class='select-area'><div class='select-header'><div class='header-left' e-click='confirm'>取消</div><div class='header-middle'>选择日期</div><div class='header-right' e-click='confirm'>确定</div><div class='clear'></div></div><div class='select-content'><ul class='options'><li class='option' x-repeat='options'>{{date}}</li></ul><div class='nowOption'></div></div></div></div>"
        view.innerHTML = template;
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    };

    plugin_06002.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data[view.$dataItem];
        var canMove = false;
        var startX = 0,
            StartY = 0;
        var nowtranslateY = 0;
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

        var plugin = view.querySelector('.nd-plugin-select-box');
        var quit = view.querySelector('.quit-area');
        var select = view.querySelector('.select-area');
        var options = view.querySelector('.options');
        var nowOption = view.querySelector('.nowOption');
        DD.css(select, 'height', '300px');
        DD.css(select, "font-size", data.font_size + 'px');
        DD.css(nowOption, "background-color", data.select_color);
        DD.css(options, "color", data.font_color);
        if (!data.show) {
            DD.css(plugin, 'display', 'none');
        } else {
            DD.css(plugin, 'display', 'block');
        }

        function delayRender() {
            var hideSelect = function(e, d, v) {
                DD.css(select, 'height', '0px');
                DD.css(plugin, 'display', 'none');
                data.show = false;
            };
            var showSelect = function(e, d, v) {};

            new DD.Event({
                eventName: 'click',
                view: quit,
                handler: hideSelect
            });

            new DD.Event({
                eventName: 'click',
                view: select,
                handler: showSelect
            });

            new DD.Event({
                eventName: 'mousedown',
                view: options,
                handler: function(event) {
                    canMove = true;
                    var e = event || window.event;
                    if (DD.config.deviceType !== 1) {
                        startX = e.clientX;
                        startY = e.clientY;
                    } else {
                        startX = e.touches[0].clientX;
                        startY = e.touches[0].clientY;
                    }
                    nowtranslateY = DD.css(options, 'transform').replace(/[^0-9,.-]/g, '').split(',')[5];
                }
            })
            new DD.Event({
                eventName: 'mouseover',
                view: view,
                handler: function(event) {
                    var e = event || window.event;
                    if (canMove) {
                        var nowY;
                        if (DD.config.deviceType !== 1) {
                            nowY = e.clientY;
                        } else {
                            e.preventDefault();
                            nowY = e.touches[0].clientY;
                        }

                        var distance = (nowY - startY) + parseFloat(nowtranslateY);
                        if (distance < 0 && -distance > data.options.length * 30) {
                            distance = -(data.options.length * 30 - 15);
                        } else if (distance > 0 && distance > data.options.length * 30) {
                            distance = data.options.length * 30 + 15;
                        }
                        DD.css(options, "transform", 'translate(0,' + distance + 'px)');
                    }
                }
            })

            new DD.Event({
                eventName: 'mouseup',
                view: view,
                handler: function() {
                    setTimeout(function() {
                        if (canMove) {
                            nowtranslateY = DD.css(options, 'transform').replace(/[^0-9,.-]/g, '').split(',')[5];
                            var distance = Math.ceil(Math.abs(nowtranslateY) / 30) * -30 + 15;
                            DD.css(options, 'transform', 'translate(0,' + distance + 'px)');
                            data.nowDate = data.options[Math.ceil(Math.abs(nowtranslateY) / 30) - 1].date;
                            canMove = false;
                        }
                    }, 0);
                }
            })

        }
    }
    DD.createModule({
        name: 'm_plugin_show',
        el: '.show',
        onReceive: function(m, d) {
            var me = this;
            if (m === 'm_plugin_06002') {
                me.data.$set('nowDate', d.nowDate);
            }
        },
    });
    DD.Plugin.create('plugin_06002', plugin_06002);
}());