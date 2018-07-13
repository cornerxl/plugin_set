;
(function() {
    my_plugin_3 = function() {};
    my_plugin_3.prototype = {
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
            me.updata = function() {
                clearInterval(window.timer_3);
                me.is_can = false;
                window.timer_3 = setInterval(function() {
                    me.is_can = false;
                    me.count++;
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
            me.getheight = function() {
                var r = Math.PI * 2;
                var rad = r / me.img_arr.length;
                me.rotateZ = me.imgh / (2 * Math.tan(rad / 2));
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
                //span数组
                me.span = view.querySelectorAll('.item-span');
                me.spans = view.querySelector('.span-cont');
                var temp = me.span.length * 25;
                //获取容器高度用来呈现3d效果
                me.imgh = parseInt(DD.css(view.querySelector('.content'), 'height'));
                //imgs下面的小数组
                me.tem = view.querySelectorAll(".img-photo");
                //操作小数组下面的元素
                me.tem.forEach(function(item, index) {
                    me.img_arr = Array.from(item.getElementsByTagName('DIV'));
                    me.getheight();
                    me.img_arr.forEach(function(i, d, a) {
                        i.style.transform = 'rotateX(' + d * parseInt(360 / a.length) + 'deg) translateZ(' + me.rotateZ + 'px)';
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
                        clearInterval(window.timer_3);
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
                        clearInterval(window.timer_3);
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
                eventName: 'mouseenter',
                view: view,
                handler: function() {
                    clearInterval(window.timer_3);
                }
            });
            new DD.Event({
                eventName: 'mouseleave',
                view: view,
                handler: function() {
                    me.updata();
                }
            });
        }
    };
    DD.Plugin.create('my_plugin_3', my_plugin_3);
    DD.createModule({
        name: 'm_plugin_download_Carousel_3',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/carouse_3/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/carouse_3/index.html",
        data: {
            width_data: '',
            name: '',
            ca_photo: {
                width: '',
                translate: false,
                imgs: [{ url: HTMLURL + "/plugin_download/carouse_3/img/1.jpg" }, { url: HTMLURL + "/plugin_download/carouse_3/img/2.jpg" }, { url: HTMLURL + "/plugin_download/carouse_3/img/3.jpg" }, { url: HTMLURL + "/plugin_download/carouse_3/img/4.jpg" }],
            },
            small_div: {
                check: '#ff6800',
                no_check: '#ffffff',
                width: '8',
                height: '8',
                time:3
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.name = "垂直轮播图";
        },
        onRender: function() {
            var me = this;
            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
            me.data.width_data = window.innerWidth * 0.9;
            if (tem > (window.innerHeight - 80)) {
                me.module.send('m_plugin_download', {
                    upload: false,
                    height: tem,
                });
            }
        },
        methods: {
            preload: function() {
                var me = this;
                me.data.ca_photo.span.forEach(function(i) {
                    i.width = me.data.small_div.width;
                    i.height = me.data.small_div.height;
                });
            },
            ensure: function() {
                var me = this;
                if(me.data.small_div.time<3){
                    me.daya.small_div.time=3;
                }
                var obj = {
                    plugin_id:103,
                    class0: JSON.stringify({
                        names: '.item-span',
                        width: {
                            names: 'width',
                            values: me.data.small_div.width + 'px'
                        },
                        height: {
                            names: 'height',
                            values: me.data.small_div.height + 'px'
                        },
                        background: {
                            names: 'background-color',
                            values: me.data.small_div.no_check.replace("#", "")
                        },
                        total: 3
                    }),
                    class1: JSON.stringify({
                        names: '.is_check',
                        background: {
                            names: 'background-color',
                            values: me.data.small_div.check.replace("#", "")
                        },
                        total: 1
                    }),
                     class2:JSON.stringify({
                        names:'.img-photo',
                        transition:{
                            names:'transition',
                            values:'all '+(me.data.small_div.time-1)+"s"
                        },
                        total:1
                     }),
                    js:JSON.stringify({time:me.data.small_div.time*1000}),
                    total: 3,
                    flag: 1
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    })
})()