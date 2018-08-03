;
(function() {
    my_plugin_4 = function() {};
    my_plugin_4.prototype = {
        init: function(view) {
            var tem = ` <div class='content' x-model='ca_photo'>
  <div class="img-photo" x-repeat="imgs">
    <div src="{{url}}" alt='图片库' x-repeat='img_item' style="background-image: url('{{url}}');background-size:100% 100%" class='img'></div>
  </div>
  <div style="clear:both"></div>
  <div class='span'>
     <div class='span-cont'>
        <span x-repeat='span' class='item-span' style="width:{{width}}px;height:{{height}}px"></span>
     </div>
  </div>
  <div class="left"><div class="img-content"></div></div>
  <div class="right"><div class="img-content"></div></div>
    </div>`;
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
                clearInterval(window.timer_4);
                me.is_can = false;
                window.timer_4 = setInterval(function() {
                    me.is_can = false;
                    me.count++;
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
                        clearInterval(window.timer_4);
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
                        clearInterval(window.timer_4);
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
                        clearInterval(window.timer_4);
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
                        clearInterval(window.timer_4);
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
    DD.Plugin.create('my_plugin_4', my_plugin_4);
    DD.createModule({
        name: 'm_plugin_download_Carousel_4',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/carouse_4/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/carouse_4/index.html",
        data: {
            base_url: '/plugin_set/public/view/plugin_download/carouse_4/img/',
            width_data: '',
            name: '',
            ca_photo: {
                width: '',
                translate: false,
                imgs: [{
                    img_item: [{ url: 'img/4.jpg' }, { url: 'img/8.jpg' }, { url: 'img/12.jpg' }, { url: 'img/16.jpg' }]
                }, {
                    img_item: [{ url: 'img/3.jpg' }, { url: 'img/7.jpg' }, { url: 'img/11.jpg' }, { url: 'img/15.jpg' }]
                }, {
                    img_item: [{ url: 'img/2.jpg' }, { url: 'img/6.jpg' }, { url: 'img/10.jpg' }, { url: 'img/14.jpg' }]
                }, {
                    img_item: [{ url: 'img/1.jpg' }, { url: 'img/5.jpg' }, { url: 'img/9.jpg' }, { url: 'img/13.jpg' }]
                }],
                span: [{}, {}, {}, {}]
            },
            small_div: {
                check: '#ff6800',
                no_check: '#ffffff',
                width: '8',
                height: '8',
                time: 3
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.name = "3d轮播图";
            me.data.ca_photo.imgs.forEach(function(i, inde) {
                i.img_item.forEach(function(item, index) {
                    //图片url地址赋值
                    item.url = me.data.base_url + ((index + 1) * 4 - inde) + '.jpg';
                });
            });
            me.data.ca_photo.span.forEach(function(i) {
                i.width = 8;
                i.height = 8;
            });
            me.data.small_div={
                check: '#ff6800',
                no_check: '#ffffff',
                width: '8',
                height: '8',
                time: 3
            };
             if(window.timer_1){
                clearInterval(window.timer_1);
            }
             if(window.timer_2){
                clearInterval(window.timer_2);
            }
             if(window.timer_3){
                clearInterval(window.timer_3);
            }
             if(window.timer_4){
                clearInterval(window.timer_4);
            }
        },
        onRender: function() {
            var me = this;
            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
            me.data.width_data = window.innerWidth * 0.5;
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
                me.data.ca_photo.$set("span", me.data.ca_photo.span);
            },
            ensure: function() {
                var me = this;
                if (me.data.small_div.time < 3) {
                    me.data.small_div.time = 3;
                }
                var obj = {
                    plugin_id: 104,
                    class0: JSON.stringify({
                        names: '.el-plugin .plugin .content .span .span-cont .photo-span',
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
                        names: '.el-plugin .plugin .content .span .span-cont .is_check',
                        background: {
                            names: 'background-color',
                            values: me.data.small_div.check.replace("#", "")
                        },
                        total: 1
                    }),
                    js: JSON.stringify({ time: me.data.small_div.time * 1000 }),
                    total: 2,
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