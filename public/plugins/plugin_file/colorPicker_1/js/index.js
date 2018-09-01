;
//渲染原因使mousemove卡顿
(function() {
    var picker = function() {};
    picker.prototype = {
        init: function(view) {
            var template = `<div class="color-content" x-show="show">
    <div class="content">
        <div class="top">
            <div class="color-jbe" ></div>
            <div class="color-w">
            <div class="color-b"></div>
            <div class="moveE" ondragstart="return false;"></div>
            <div class="small-item" ondragstart="return false;"></div>
            </div>
         </div>
                <div class="bottom">
                    <div class="color-band">
                        <div class="point" style="left:{{left}}px" ondragstart="return false;"></div>
                    </div>
                    <div class="eventName"></div>
                </div>
                <div class="rgb">
                        <span class="name">r</span><input class="item" x-field="r" type="number">
                        <span class="name">g</span><input class="item"  x-field="g" type="number">
                        <span class="name">b</span><input class="item" x-field="b" type="number">
                </div>
                 <div class="rgb">
                        <span class="name">H</span><input class="item" x-field="H" type="number">
                        <span class="name">s</span><input class="item"  x-field="s" type="number">
                        <span class="name">v</span><input class="item" x-field="v" type="number">
                </div>
                 <div class="rgb">
                                 <div e-click='sure' class="ensure">确定</div>
                  </div>
            </div>
        </div>`;
            view.innerHTML = template;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            me.datas = view.$getData().data;
            me.one = me.datas.first;
            if (!me.one) {
                return;
            }
            me.datas.first = 0;
            me.rotate = 0;
            me.str = "";
            me.time = {
                new: 0,
            };
            var move = 1;
            var flag = 0;
            var flag_2 = 0;
            //直接改变是获取的值
            //而如果是对象的话就是获取引用
            //即可以实现双向和单项数据的绑定
            me.case = function() {
                DD.css(me.point, "left", me.datas.left + 'px');
                //度数
                me.rotate = me.datas.left / 180 * 360;
                me.datas.H = me.rotate;
                var mod = parseInt((me.datas.left + 1) / 30);
                var data = (me.datas.left - mod * 30) * 255 / 30 | 0;
                switch (mod) {
                    case 0:
                        me.str = "rgb(255," + data + ",0)";
                        me.datas.r = 255;
                        me.datas.g = data;
                        me.datas.b = 0;
                        break;
                    case 1:
                        me.str = "rgb(" + (255 - data) + ",255,0)";
                        me.datas.r = 255 - data;
                        me.datas.g = 255;
                        me.datas.b = 0;
                        break;
                    case 2:
                        me.str = "rgb(0,255," + data + ")";
                        me.datas.r = 0;
                        me.datas.g = 255;
                        me.datas.b = data;
                        break;
                    case 3:
                        me.str = "rgb(0," + (255 - data) + ",255)";
                        me.datas.r = 0;
                        me.datas.g = 255 - data;
                        me.datas.b = 255;
                        break;
                    case 4:
                        me.str = "rgb(" + data + ",0,255)";
                        me.datas.r = data;
                        me.datas.g = 0;
                        me.datas.b = 255;
                        break;
                    case 5:
                        me.str = "rgb(255,0," + (255 - data) + ")";
                        me.datas.r = 255;
                        me.datas.g = 0;
                        me.datas.b = 255 - data;
                        break;
                }
                DD.css(me.dom, "background", me.str);
            }
            me.moveitem = function() {
                DD.css(me.small, "left", me.x + 'px');
                DD.css(me.small, "top", me.y + 'px');
                var v = ((me.pery - me.y) / me.pery).toFixed(2) * 255 | 0;
                var s = ((me.x) / me.perx).toFixed(2);
                var f1 = parseInt((me.rotate + 1) / 60);
                var f = (me.rotate / 60 - f1);
                var p = (1 - s) * 255 | 0;
                var q = (1 - f * s) * 255 | 0;
                var t = (1 - (1 - f) * s) * 255 | 0;
                var str = "";
                switch (f1) {
                    case 0:
                        str = "rgb(" + v + "," + t + "," + p + ")";
                        me.datas.r = v;
                        me.datas.g = t;
                        me.datas.b = p;
                        break;
                    case 1:
                        str = "rgb(" + q + "," + v + "," + p + ")";
                        me.datas.r = q;
                        me.datas.g = v;
                        me.datas.b = p;
                        break;
                    case 2:
                        str = "rgb(" + p + "," + v + "," + t + ")";
                        me.datas.r = p;
                        me.datas.g = v;
                        me.datas.b = t;
                        break;
                    case 3:
                        str = "rgb(" + p + "," + q + "," + v + ")";
                        me.datas.r = p;
                        me.datas.g = q;
                        me.datas.b = v;
                        break;
                    case 4:
                        str = "rgb(" + t + "," + p + "," + v + ")";
                        me.datas.r = t;
                        me.datas.g = p;
                        me.datas.b = v;
                        break;
                    case 5:
                        str = "rgb(" + v + "," + p + "," + q + ")";
                        me.datas.r = v;
                        me.datas.g = p;
                        me.datas.b = q;
                        break;
                }
                me.datas.H = me.rotate;
                me.datas.s = s*255;
                me.datas.v = v;
            };
            setTimeout(function() {
                me.dom = view.querySelector(".color-jbe");
                me.point = view.querySelector(".point");
                me.bar = view.querySelector(".eventName");
                me.small = view.querySelector(".small-item");
                me.perx = parseInt(DD.css(me.dom, "width"));
                me.pery = parseInt(DD.css(me.dom, "height"));
                new DD.Event({
                    view: me.point,
                    eventName: 'mousedown',
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag = 1;
                        first = 1;
                        move = 1;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".color-content"),
                    eventName: 'mouseup',
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag = 0;
                    }
                });
                new DD.Event({
                    view: me.bar,
                    eventName: 'mousemove',
                    nopopo: true,
                    handler: function(e, data, view) {
                        if (flag) {
                            if (!first) {
                                if (new Date().getTime() > me.time.new + 3000) {
                                    move = 0;
                                } else {
                                    move = 1;
                                }
                            }
                            if (move) {
                                me.first = 0;
                                me.datas.left = e.offsetX;
                                me.case();
                                me.time.new = new Date().getTime();
                            }
                        }
                    }
                });
                new DD.Event({
                    view: me.bar,
                    eventName: 'click',
                    nopopo: true,
                    handler: function(e, data, view) {
                        me.datas.left = e.offsetX;
                        me.case();
                        flag = 0;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".moveE"),
                    eventName: "mousemove",
                    nopopo: true,
                    handler: function(e, data, view) {
                        if (flag_2) {
                            me.x = e.offsetX;
                            me.y = e.offsetY;
                            me.moveitem();
                        }
                    }
                });
                new DD.Event({
                    view: view.querySelector(".moveE"),
                    eventName: "mouseup",
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag_2 = 0;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".moveE"),
                    eventName: "click",
                    nopopo: true,
                    handler: function(e, data, view) {
                        me.x = e.offsetX;
                        me.y = e.offsetY;
                        me.moveitem();
                        flag_2 = 0;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".small-item"),
                    eventName: "mousedown",
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag_2 = 1;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".small-item"),
                    eventName: "mouseup",
                    nopopo: true,
                    handler: function(e, data, view) {
                        flag_2 = 0;
                    }
                });

                new DD.Event({
                    view: view.querySelector(".ensure"),
                    eventName: "mouseup",
                    nopopo: true,
                    handler: function(e, data, view) {
                        //颜色特殊处理一下
                        var change = function(num) {
                            var swicth = function(n) {
                                if (n > 9) {
                                    switch (n) {
                                        case 10:
                                            return "a";
                                            break;
                                        case 11:
                                            return "b";
                                            break;
                                        case 12:
                                            return "c";
                                            break;
                                        case 13:
                                            return "d";
                                            break;
                                        case 14:
                                            return "e";
                                            break;
                                        case 15:
                                            return "f";
                                            break;
                                    }
                                }
                                return n + "";
                            }
                            var x = swicth(parseInt(num / 16));
                            var y = swicth(num % 16);
                            return x + y;
                        }
                        data.show = false;
                        data.str = "#" + change(data.r) + "" + change(data.g) + "" + change(data.b) + "";
                    }
                });
            }, 0);
        },
    };
    DD.Plugin.create('color-picker-1', picker);
    DD.createModule({
        el: '.el-color-picker-1',
        data: {
            left: 0,
            first: 1,
            r: 255,
            g: 0,
            b: 0,
            H: 0,
            s: 255,
            v: 255,
            show: false,
            str: "#ff0000"
        },
        onBeforeFirstRender:function(){
             var me=this;
             me.data.lef=0;
             me.data.left=0;
             me.data.first=1;
             me.data.r=255;
             me.data.g=0;
             me.data.b=0;
             me.data.H=0;
             me.data.s=255;
             me.data.v=255;
             me.data.show=false;
             me.data.str="#ff0000";
             me.data.name='颜色选择器';
        },
        methods: {
            select: function() {
                var me = this;
                me.data.show = true;
            }
        }
    });
})()