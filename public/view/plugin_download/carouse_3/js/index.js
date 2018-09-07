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
 <div class="left"><div class="img-content"></div></div>
  <div class="right"><div class="img-content"></div></div>
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
            me.direct=1;
            if(view.$getData().data.small_div.left){
                me.direct=-1;
            }
            me.updata = function() {
                clearInterval(window.timer_3);
                me.is_can = false;
                window.timer_3 = setInterval(function() {
                    me.is_can = false;
                    me.count+=me.direct;
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
                    me.time_count+=me.direct;
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
                eventName: 'click',
                view: view.querySelector(".left"),
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
                eventName: 'click',
                view: view.querySelector(".right"),
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
            // new DD.Event({
            //     eventName: 'mouseenter',
            //     view: view,
            //     handler: function() {
            //         clearInterval(window.timer_3);
            //     }
            // });
            // new DD.Event({
            //     eventName: 'mouseleave',
            //     view: view,
            //     handler: function() {
            //         me.updata();
            //     }
            // });
        }
    };
    DD.Plugin.create('my_plugin_3', my_plugin_3);
    DD.createModule({
        name: 'm_plugin_download_Carousel_3',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/carouse_3/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/carouse_3/index.html",
        data: {
            name: '',
            width_data: '',
            carousel_data:{
            width_data: '',
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
                time:3,
                left:false,
                right:true
            }}
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.name = "垂直轮播图";
            if(window.timer_1){
                clearInterval(window.timer_1);
            }
             if(window.timer_2){
                clearInterval(window.timer_2);
            }
             if(window.timer_4){
                clearInterval(window.timer_4);
            }
             if(window.timer_3){
                clearInterval(window.timer_3);
            }
            me.data.carousel_data={
            width_data: '',
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
                time:3,
                left:false,
                right:true
            }}
        },
        onRender: function() {
            var me = this;
            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
            me.data.width_data = window.innerWidth * 0.5;
            me.data.carousel_data.width_data=me.data.width_data;
            if (tem > (window.innerHeight - 80)) {
                me.module.send('m_plugin_download', {
                    upload: false,
                    height: tem,
                });
            }
        },
        methods: {
            ensure: function() {
                var me = this;
                var data=me.data.carousel_data;
                if(data.small_div.time<3){
                    data.small_div.time=3;
                }
                var obj = {
                    plugin_id:103,
                    class0: JSON.stringify({
                        names: '.el-plugin .plugin .content .span .span-cont span .item-span',
                        width: {
                            names: 'width',
                            values: data.small_div.width + 'px'
                        },
                        height: {
                            names: 'height',
                            values: data.small_div.height + 'px'
                        },
                        background: {
                            names: 'background-color',
                            values: data.small_div.no_check.replace("#", "")
                        },
                        total: 3
                    }),
                    class1: JSON.stringify({
                        names: '.el-plugin .plugin .content .span .span-cont .is_check',
                        background: {
                            names: 'background-color',
                            values: data.small_div.check.replace("#", "")
                        },
                        total: 1
                    }),
                     class2:JSON.stringify({
                        names:'.el-plugin .plugin .content .img-photo',
                        transition:{
                            names:'transition',
                            values:'all '+(data.small_div.time-1)+"s"
                        },
                        total:1
                     }),
                    js:JSON.stringify({
                        time:data.small_div.time*1000,
                        left:data.small_div.left,
                        right:data.small_div.right
                    }),
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