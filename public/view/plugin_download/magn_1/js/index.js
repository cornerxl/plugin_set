;
(function() {
    var magn = function() {};
    magn.prototype = {
        init: function(view) {
            var tem = `<div class="ct" style="position:relative; width:100%;height:100%" ><div class="small">
    </div>
    <img src="{{urlsmall}}" class='small-img'>
    <div class="magn"></div>
    <div class="big"><img src="{{urlbig}}" class='big_img'></div></div>`
            view.innerHTML = tem;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
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
                // var data=10;
                var data = view.$getData().data;
                if(parseInt(data.small_div.per)<2){
                    data.small_div.per=2
                }
                me.radio = parseInt(data.small_div.per)||2;
                if (window.data && window.data.radio) {
                    me.radio = window.data.radio;
                }
                me.move_y = 0;
                me.move_x = 0;
                me.bigimg = view.querySelector('.big_img');
                //可以移动的小方块
                me.magn = view.querySelector('.magn');
                me.content_div = view.querySelector('.ct');
                var ct_height = parseInt(DD.css(me.content_div, "height"));
                var ct_width = parseInt(DD.css(me.content_div, "width"));
                DD.css(me.magn, "width", (ct_width / me.radio) + 'px');
                DD.css(me.magn, "height", (ct_height / me.radio) + 'px');
                DD.css(me.bigimg, "width", (ct_width * me.radio) + 'px');
                DD.css(me.bigimg, "height", (ct_height * me.radio) + 'px');
                DD.css(me.magn, "background-color", data.small_div.color);
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
    DD.Plugin.create('magn', magn);
    DD.createModule({
        name: 'm_plugin_download_Magn_1',
        templateUrl: HTMLURL + "/plugin_download/magn_1/index.html",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/magn_1/css/index.css" }],
        data: {
            name: '放大镜',
            width: 10,
            urlsmall: '/plugin_set/public/view/plugin_download/magn_1/img/small.jpg',
            urlbig: '/plugin_set/public/view/plugin_download/magn_1/img/big.jpg',
            small_div: {
                opacity: 5,
                color: "#cccccc",
                per: 2
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.width = window.innerWidth * 0.9 / 2;
        },
        onRender: function() {
            var me = this;
            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
            if (tem > (window.innerHeight - 80)) {
                me.module.send('m_plugin_download', {
                    upload: false,
                    height: tem,
                });
            }
        },
        methods: {
            preload: function(e, data, view) {
                var me = this;
                DD.css(document.querySelector(".magn"), "background-color", me.data.small_div.color);
                DD.css(document.querySelector(".magn"), "opacity", 0.1 * me.data.small_div.opacity);
            },
            ensure: function() {
                var me = this;
                if (me.data.small_div.per <= 1) {
                    me.data.small_div.per = 2;
                }
                var obj = {
                    plugin_id: 201,
                    class0: JSON.stringify({
                        names: '.magn',
                        backgroundColor: {
                            names: 'background-color',
                            values: me.data.small_div.color.replace("#", "")
                        },
                        opacity: {
                            names: 'background-color',
                            values: me.data.small_div.color.replace("#", "")
                        },
                        total: 2
                    }),
                    js: JSON.stringify({ radio: me.data.small_div.per }),
                    total: 1,
                    flag: 1
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
})();