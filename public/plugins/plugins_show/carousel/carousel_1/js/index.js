//普通轮播图
;
(function() {
    var plugin_03001 = function() {};
    plugin_03001.prototype = {
        init: function(view) {
            var template = `<div class='content' x-model='carousel_data'">
                                <div class='show' x-class="{'translate':'translate'}">
                                    <img class='imgs' x-repeat='imgs' src="{{url}}">
                                </div>
                                <div class='span'>
                                    <span x-repeat='imgs' class='photo-span' x-show="$index!==0"></span>
                                </div>
                                <div class="left"><div class="img-content"></div></div>
                                <div class="right"><div class="img-content"></div></div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            me.data = view.$getData().data[view.$dataItem].imgs;
            me.data.push(DD.clone(me.data[0]));
            me.color = view.$getData().data[view.$dataItem].check_color;
            //me.check_color=view.$getData().data.ca_photo;
            me.drawimage = function() {
                var me = this;
                DD.css(me.show, 'transform', 'translateX(' + me.translate + 'px)');
            };
            me.removespan = function() {
                var me = this;
                me.span.forEach(function(item) {
                    DD.css(item, 'background-color', '#ffffff');
                });
            }
            me.addspan = function() {
                if (me.span[me.index]) {
                    if (me.index === 0)
                        DD.css(me.span[me.data.length - 1], 'background-color', me.color);
                    else {
                        DD.css(me.span[me.index], 'background-color', me.color);
                    }
                }
            }
            me.moveLeft = function() {
                var me = this;
                me.translate -= me.imgwidth;
                if (me.index > me.data.length - 2) {
                    me.index = 0;
                    DD.css(me.show, 'left', -1 * me.translate - me.imgwidth + 'px');
                }
                me.index++;
            }
            me.moveright = function() {
                var me = this;
                me.translate += me.imgwidth;
                if (me.index === 0) {
                    me.index = me.data.length - 2;
                    DD.css(me.show, 'left', -1 * me.translate - me.imgwidth * (me.data.length - 2) + 'px');
                } else {
                    me.index--;
                }
            }
            me.updata = function() {
                clearInterval(window.timer_11);
                var my_time = 3000;
                if (window.data && window.data.time) {
                    my_time = window.data.time;
                }
                window.timer_11 = setInterval(function() {
                    me.doself(me.flag);
                }, my_time);
            };
            me.doself = function(flag) {
                var me = this;
                me.is_can = false;
                me.removespan();
                if (flag) {
                    me.moveright();
                } else {
                    me.moveLeft();
                }
                me.drawimage();
                me.addspan();
            };
            setTimeout(function() {
                view.addEventListener('transitionend', function() {
                    me.is_can = true;
                });
                me.is_can = false;
                me.span = view.querySelectorAll('.photo-span');
                me.imgs = view.querySelectorAll('.imgs');
                me.imgwidth = parseInt(DD.css(view.querySelector('.content'), 'width'));
                me.show = view.querySelector('.show');
                me.span_width = view.$getData().data[view.$dataItem].width;
                //true为左边滑动
                me.flag = true;
                if(view.$getData().data[view.$dataItem].right){
                    me.flag=false;
                }

                if(view.$getData().data[view.$dataItem].is_circle) {
                    me.span.forEach(function (item) {
                        DD.css(item, 'border-radius', "100%");
                        DD.css(item, 'width', me.span_width + 'px');
                        DD.css(item, 'height', me.span_width + 'px');
                    });
                }else {
                    me.span.forEach(function (item) {
                        DD.css(item, 'width', me.span_width + 'px');
                        DD.css(item, 'height', me.span_width + 'px');
                    });
                }
                DD.css(me.show, 'width', '' + me.imgwidth * me.data.length + 'px');
                me.index = 1;
                DD.css(me.show, 'left', -1 * me.index * me.imgwidth + 'px');
                //开始位移
                me.translate = 0;
                for (var i = 0; i < me.data.length; i++) {
                    DD.css(me.imgs[i], 'width', '' + me.imgwidth + 'px');
                }
                me.addspan();
                me.updata();
            }, 0);

            new DD.Event({
                eventName: 'mouseover',
                view: view.querySelector('.content'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'block');
                    DD.css(document.querySelector('.right'),'display', 'block');
                }
            });
            new DD.Event({
                eventName: 'mouseout',
                view: view.querySelector('.content'),
                handler: function (e, data, view) {
                    DD.css(document.querySelector('.left'),'display', 'none');
                    DD.css(document.querySelector('.right'),'display', 'none');
                }
            });
            new DD.Event({
                eventName: 'swipeleft',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_11);
                        me.doself();
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".right"),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_11);
                        me.doself();
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".left"),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_11);
                        me.doself(1);
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'swiperight',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_11);
                        me.doself(1);
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('plugin_03001', plugin_03001);
})();