;
(function() {
    plugin_03004 = function() {};
    plugin_03004.prototype = {
        init: function(view) {
            var tem = ` <div class='content' x-model='carousel_data'>
                          <div class="img-photo" x-repeat="imgs">
                            <div src="{{url}}" alt='图片库' x-repeat='img_item' style="background-image: url('{{url}}');background-size:100% 100%" class='img'></div>
                          </div>
                          <div style="clear:both"></div>
                          <div class='spans'>
                             <div class='span-cont'>
                                <span x-repeat='imgs' class='item-span' style="width:{{width}}px;height:{{height}}px"></span>
                             </div>
                          </div>
                          <div class="left"><div class="img-content"></div></div>
                          <div class="right"><div class="img-content"></div></div>
                            </div>`;
            view.innerHTML = tem;
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
            me.count = 0;
            //标记能够事件
            me.is_can = false;
            //由于有数组个translationend事件 用来标记
            me.time_count = 0;
            me.check_color = view.$getData().data[view.$dataItem].check_color;
            //更新页面
            me.updata = function() {
                clearInterval(window.timer_14);
                me.is_can = false;
                window.timer_14 = setInterval(function() {
                    me.is_can = false;
                    me.count+=me.dx;
                    me.removespan();
                    me.addspan();
                    me.tem.forEach(function(item, index) {
                        item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                        item.style.transitionDelay = index * 0.3 + 's';
                    });
                }, 3000);
            };
            //改变span颜色
            me.addspan = function() {
                var me = this;
                var index = (me.count) % me.tem.length;
                if (index < 0) {
                    index += me.tem.length;
                }
                DD.css(me.span[index], 'background-color', me.check_color);
            }
            //去掉span颜色
            me.removespan = function() {
                var me = this;
                me.span.forEach(function(item) {
                    DD.css(item, 'background-color', '#FFFFFF');
                })
            }
            //在渲染完毕开始执行dx为1是下滑
            me.dx=1;
            if(view.$getData().data[view.$dataItem].up){
                me.dx=-1;
            }

            setTimeout(function() {
                window.addEventListener('transitionend', function() {
                    me.time_count++;
                    if (me.time_count === me.tem.length) {
                        me.is_can = true;
                        me.time_count = 0;
                    }
                });
                //span数组
                me.span = view.querySelector('.span-cont').querySelectorAll('.item-span');
                //获取容器高度用来呈现3d效果
                me.imgh = parseInt(DD.css(view.querySelector('.content'), 'height'));
                //imgs下面的小数组
                me.tem = view.querySelectorAll(".img-photo");
                //操作小数组下面的元素
                me.tem.forEach(function(i) {
                    i.style.transitionDelay = i * 0.3 + 's';
                    var arr = Array.from(i.getElementsByTagName('DIV'));
                    arr.forEach(function(item, index) {
                        item.style.transform = 'rotateX(' + index * parseInt(360 / me.tem.length) + 'deg) translateZ(' + me.imgh / 2 + 'px)';

                    })
                });
                me.span_width = view.$getData().data[view.$dataItem].width;
                me.span_is_circle = view.$getData().data[view.$dataItem].is_circle;
                if(me.span_is_circle) {
                    me.span.forEach(function (i) {
                        DD.css(i, 'width', me.span_width + 'px');
                        DD.css(i, 'height', me.span_width + 'px');
                        DD.css(i, 'border-radius', '100%');
                    });
                }else {
                    me.span.forEach(function (i) {
                        DD.css(i, 'width', me.span_width + 'px');
                        DD.css(i, 'height', me.span_width + 'px');
                    });
                }
                //初始化第一个span
                me.addspan();
                //更新页面
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
                eventName: 'swiperight',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_14);
                        me.removespan();
                        me.count--;
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'swipeleft',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        me.removespan();
                        clearInterval(window.timer_14);
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
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
                        me.removespan();
                        clearInterval(window.timer_14);
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
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
                        clearInterval(window.timer_14);
                        me.removespan();
                        me.count--;
                        me.addspan();
                        me.tem.forEach(function(item, index) {
                            item.style.transform = 'rotateX(' + parseInt(360 / me.tem.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('plugin_03004', plugin_03004);
})()