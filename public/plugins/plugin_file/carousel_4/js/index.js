;
(function() {
    my_plugin = function() {};
    my_plugin.prototype = {
        init: function(view) {
            var tem = ` <div class='content' x-model='ca_photo'>
                              <div class="img-photo" x-repeat="imgs">
                                <div src="{{url}}" alt='图片库' x-repeat='img_item' style="background-image: url('{{url}}');background-size:100% 100%" class='img'></div>
                              </div>
                              <div style="clear:both"></div>
                              <div class='span'>
                                 <div class='span-cont'>
                                    <span x-repeat='imgs' class='item-span'></span>
                                 </div>
                              </div>
                          </div>`;
            view.innerHTML = tem;
        },
        render: function(view) {
            var me = this;
            me.$data=view.$getData();
            if(!me.$data.one){
                return ;
            }
            me.count = 0;
            //标记能够事件
            me.is_can = false;
            //由于有数组个translationend事件 用来标记
            me.time_count = 0;
            //更新页面
            me.updata = function() {
                clearInterval(window.timer);
                me.is_can = false;
                window.timer = setInterval(function() {
                    me.is_can = false;
                    me.count+=me.dx;
                    me.removespan()
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
                me.span[index].classList.add('is_check');
            }
            //去掉span颜色
            me.removespan = function() {
                var me = this;
                me.span.forEach(function(item) {
                    DD.removeClass(item, 'is_check');
                })
            }
            //在渲染完毕开始执行
            setTimeout(function() {
                window.addEventListener('transitionend', function() {
                    me.time_count++;
                    if (me.time_count === me.tem.length) {
                        me.is_can = true;
                        me.time_count = 0;
                    }
                });
                me.dx=1;
                if(view.$getData().data.up){
                    me.dx=-1;
                }
                //span数组
                me.span = document.querySelector('.span-cont').querySelectorAll('.item-span');
                //获取容器高度用来呈现3d效果
                me.imgh = parseInt(DD.css(document.querySelector('.content'), 'height'));
                //imgs下面的小数组
                me.tem = document.querySelectorAll(".img-photo");
                //操作小数组下面的元素
                me.tem.forEach(function(i) {
                    i.style.transitionDelay = i * 0.3 + 's';
                    var arr = Array.from(i.getElementsByTagName('DIV'));
                    arr.forEach(function(item, index) {
                        item.style.transform = 'rotateX(' + index * parseInt(360 / me.tem.length) + 'deg) translateZ(' + me.imgh / 2 + 'px)';

                    })
                });
                //初始化第一个span
                me.addspan();
                //更新页面
                me.updata();
            }, 0);
            new DD.Event({
                eventName: 'swiperight',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer);
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
                        clearInterval(window.timer);
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
        }
    };
    DD.Plugin.create('my_plugin', my_plugin);
    DD.createModule({
        el: '.el-plugin',
        data: {
            ca_photo: {
                imgs: [{
                    img_item: [{ url: 'img/4.jpg' }, { url: 'img/8.jpg' }, { url: 'img/12.jpg' }, { url: 'img/16.jpg' }]
                }, {
                    img_item: [{ url: 'img/3.jpg' }, { url: 'img/7.jpg' }, { url: 'img/11.jpg' }, { url: 'img/15.jpg' }]
                }, {
                    img_item: [{ url: 'img/2.jpg' }, { url: 'img/6.jpg' }, { url: 'img/10.jpg' }, { url: 'img/14.jpg' }]
                }, {
                    img_item: [{ url: 'img/1.jpg' }, { url: 'img/5.jpg' }, { url: 'img/9.jpg' }, { url: 'img/13.jpg' }]
                }]
            },
            up:false,
            down:true,
            one:1
        },
        onBeforeFirstRender: function() {
            var me=this;
            if(window.data&&window.data.up){
                me.data.up=true;
            }
        },
        onRender: function() {
            var me = this;
            console.log(me.data);
        }
    })
})()