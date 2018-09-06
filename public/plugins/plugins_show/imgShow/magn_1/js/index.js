;
(function() {
    var plugin_08001 = function() {};
    plugin_08001.prototype = {
        init: function(view) {
            var tem = `<div class='ct' style="position:relative; width:100%;height:100%">
                            <div class="small"></div>
                            <img src="{{urlsmall}}" class='small-img'>
                            <div class="magn"></div>
                        <div class="big"><img src="{{urlbig}}" class='big_img'></div></div>`
            view.innerHTML = tem;
            var data = DD.attr(view, 'dataName') || 'data';
            view.$dataName = data;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
       render: function(view) {
            var me = this;
            var data = view.$getData().data[view.$dataName];
            me.getx = function(x) {
                var me = this;
                if (x <= me.width / 2) {
                    me.move_x = 0;
                    return;
                }
                if (x >= (me.width * me.radio - me.width / 2)) {
                    me.move_x = me.width * (me.radio - 1);
                    return;
                }
                me.move_x = x - me.width / 2;
            }
            me.gety = function(y) {
                var me = this;
                if (y <= me.height / 2) {
                    me.move_y = 0;
                    return;
                }
                if (y >= (me.height * me.radio - me.height / 2)) {
                    me.move_y = me.height * (me.radio - 1);
                    return;
                }
                me.move_y = y - me.height / 2;
            }
            me.move = function() {
                var me = this;
                DD.css(me.magn, 'left', me.move_x + 'px');
                DD.css(me.magn, 'top', me.move_y + 'px');
                DD.css(me.bigimg, 'left', -me.move_x * me.radio + 'px');
                DD.css(me.bigimg, 'top', -me.move_y * me.radio + 'px');
            }
            //渲染结束后开始执行
            setTimeout(function() {
                //比例系数
                me.radio = data.radio;
                me.move_y = 0;
                me.move_x = 0;
                me.bigimg = view.querySelector('.big_img');
                me.smallimg = view.querySelector('.small-img');
                DD.attr(me.bigimg, 'src', data.big_img);
                DD.attr(me.smallimg, 'src', data.small_img);
                //可以移动的小方块
                me.magn = view.querySelector('.magn');
                me.content_div = view.querySelector('.ct');
                var ct_height = parseInt(DD.css(me.content_div, "height"));
                var ct_width = parseInt(DD.css(me.content_div, "width"));
                DD.css(me.magn, "width", (ct_width / me.radio) + 'px');
                DD.css(me.magn, "background-color", data.mark_color);
                DD.css(me.magn, "opacity", data.mark_opacity);
                DD.css(me.magn, "height", (ct_height / me.radio) + 'px');
                DD.css(me.bigimg, "width", (ct_width * me.radio) + 'px');
                DD.css(me.bigimg, "height", (ct_height * me.radio) + 'px');
                me.height = parseInt(DD.css(me.magn, 'height'));
                me.width = parseInt(DD.css(me.magn, 'width'));
                me.big = view.querySelector('.big');
                new DD.Event({
                    eventName: 'mouseenter',
                    view: view.querySelector('.small'),
                    handler: function(e, data, view) {
                        DD.css(me.magn, 'visibility', 'visible');
                        DD.css(me.big, 'visibility', 'visible');
                    }
                });
                new DD.Event({
                    eventName: 'mouseleave',
                    view: view.querySelector('.small'),
                    handler: function(e, data, view) {
                        DD.css(me.magn, 'visibility', 'hidden');
                        DD.css(me.big, 'visibility', 'hidden');
                    }
                });
                new DD.Event({
                    eventName: 'mousemove',
                    view: view.querySelector('.small'),
                    handler: function(e, data, view) {
                        //获取鼠标位置
                        me.getx(e.offsetX);
                        me.gety(e.offsetY);
                        //移动
                        me.move();
                    }
                });
            }, 0);
        }
    };
    DD.Plugin.create('plugin_08001', plugin_08001);
})();