;
(function() {
    my_plugin = function() {};
    my_plugin.prototype = {
        init: function(view) {
            var tem = ` <div class='content' x-model='ca_photo'>
                          <div class="img-photo">
                               <div  style="background-image: url('{{url}}');background-size:100% 100%" class='img' x-repeat='imgs'></div>
                          </div>
                          <div style="clear:both"></div>
                          <div class='span'>
                             <div class='span-cont'>
                                <span x-repeat='imgs' class='item-span'></span>
                             </div>
                          </div>
                        </div>`
            view.innerHTML = tem;
        },
        render: function(view) {
            var me = this;
            me.count = 0;
            //标记能够事件
            me.is_can = false;
            //由于有数组个translationend事件 用来标记
            me.time_count = 0;
            //更新页面
            me.dx=view.$getData().data.dx;
            me.updata = function() {
                clearInterval(window.timer);
                me.is_can = false;
                window.timer = setInterval(function() {
                     me.is_can = false;
                    me.count+=me.dx;
                    me.removespan()
                    me.addspan();
                    me.tem.forEach(function(item, index) {
                        item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)';
                        item.style.transitionDelay = index * 0.3 + 's';
                    });
                }, 3000);
            };
            //改变span颜色
            me.addspan = function() {
                var me = this;
                var index = (me.count) % me.img_arr.length;
                if (index < 0) {
                    index += me.img_arr.length;
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
            me.getheight=function(){
                var r=Math.PI*2;
                var rad=r/me.img_arr.length;
                me.rotateZ=me.imgh/(2*Math.tan(rad/2));
            }
            //在渲染完毕开始执行
            setTimeout(function() {
                window.addEventListener('transitionend', function() {
                    me.time_count+=me.dx;
                    if (me.time_count === me.tem.length) {
                        me.is_can = true;
                        me.time_count = 0;
                    }
                });
                //span数组
                me.span = view.querySelectorAll('.item-span');
                 me.spans=view.querySelector('.span-cont');
                var temp=me.span.length*25;
                DD.css(me.spans,'width',temp+'px');
                //获取容器高度用来呈现3d效果
                me.imgh = parseInt(DD.css(document.querySelector('.content'), 'height'));
                //imgs下面的小数组
                me.tem = document.querySelectorAll(".img-photo");
                //操作小数组下面的元素
                me.tem.forEach(function(item,index) {
                   me.img_arr = Array.from(item.getElementsByTagName('DIV'));
                   me.getheight();
                   me.img_arr.forEach(function(i,d,a){
                    i.style.transform = 'rotateX(' + d * parseInt(360 / a.length) + 'deg) translateZ(' + me.rotateZ+ 'px)';
                   });
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
                            item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)';
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
                            item.style.transform = 'rotateX(' + parseInt(360 / me.img_arr.length) * -1 * me.count + 'deg)';
                            item.style.transitionDelay = index * 0.3 + 's';
                        });
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName:'mouseenter',
                view:view,
                handler:function(){
                    clearInterval(window.timer);
                }
            });
            new DD.Event({
                eventName:'mouseleave',
                view:view,
                handler:function(){
                    me.updata();
                }
            });
        }
    };
    DD.Plugin.create('my_plugin', my_plugin);
    DD.createModule({
        el: '.el-plugin',
        data: {
            ca_photo: {
                imgs: [{url:'img/1.jpg'},{url:'img/2.jpg'},{url:'img/3.jpg'},{url:'img/4.jpg'},{url:'img/1.jpg'},{url:'img/2.jpg'}]
            },
            dx:1
        },
        onBeforeFirstRender: function() {
            var me=this;
            if(window.data){
                if(window.data.right){
                    me.dta.dx=1;
                }else{
                    me.data.dx=-1;
                }
            }
        },
        onRender: function() {
            var me = this;
        }
    })
})()