//普通轮播图
;
(function() {
    var photo = function() {};
    photo.prototype = {
        init: function(view) {
            var template = `<div class='content' x-model='ca_photo' style="width:{{width}}px;height:{{width/2}}px">
        <div class='show' x-class="{'translate':'translate'}">
            <img class='imgs' x-repeat='imgs' src="{{url}}">
        </div>
        <div class='span'>
        <span x-repeat='span'  x-class="{'blight':'blight'}" class='photo-span' x-show="$index!==0" style="width:{{width}}px;height:{{height}}px"></span>
        </div>
    </div>`;
            view.innerHTML = template;
        },
        render: function(view) {
            var me = this;
            me.data = view.$getData().data.ca_photo.imgs;
            me.drawimage = function(flag) {
                var me = this;
                DD.css(me.show, 'transform', 'translateX(' + me.translate + 'px)');
            };
            me.removespan = function() {
                var me = this;
                me.span.forEach(function(item) {
                    DD.removeClass(item, 'is_check');
                });
            }
            me.addspan = function() {
                if (me.span[me.index]) {
                    if (me.index === 0)
                        DD.addClass(me.span[me.data.length - 1], 'is_check');
                    else {
                        DD.addClass(me.span[me.index], 'is_check');
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
                clearInterval(window.timer_1);
                var my_time = 3000;
                if (window.data && window.data.time) {
                    my_time = window.data.time;
                }
                window.timer_1 = setInterval(function() {
                    me.doself();
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
                me.span = document.querySelectorAll('.photo-span');
                me.imgs = document.querySelectorAll('.imgs');
                me.imgwidth = parseInt(DD.css(document.querySelector('.content'), 'width'));
                me.show = document.querySelector('.show');
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
                eventName: 'swipeleft',
                view: view,
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer_1);
                        me.doself();
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
                        clearInterval(window.timer_1);
                        me.doself(1);
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('photo', photo);
    DD.createModule({
        name: 'm_plugin_download_Carousel_1',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/carouse_1/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/carouse_1/index.html",
        onBeforeFirstRender: function() {
            var me = this;
            me.data.ca_photo.width = window.innerWidth * 0.9;
            me.data.name = "常见轮播图";
        },
        onRender: function() {
            var me = this;
            var tem = parseInt(DD.css(document.querySelector('.router-content'), 'height'));
            if (tem > (window.innerHeight - 80)) {
                me.module.send('m_plugin_download', {
                    upload: false,
                    height: tem
                });
            }
        },
        data: {
            name: '',
            ca_photo: {
                width: '',
                translate: false,
                imgs: [{ url: HTMLURL + "/plugin_download/carouse_1/img/1.jpg" }, { url: HTMLURL + "/plugin_download/carouse_1/img/2.jpg" }, { url: HTMLURL + "/plugin_download/carouse_1/img/3.jpg" }, { url: HTMLURL + "/plugin_download/carouse_1/img/4.jpg" }, { url: HTMLURL + "/plugin_download/carouse_1/img/5.jpg" }, { url: HTMLURL + "/plugin_download/carouse_1/img/1.jpg" }],
                span: [{ blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }, { blight: false, width: '', height: '' }],
            },
            small_div: {
                check: '#ff6800',
                no_check: '#ffffff',
                width: '8',
                height: '8',
                time: 3
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
                if (me.data.small_div.time < 2) {
                    me.data.small_div.time = 3;
                }
                var obj = {
                    plugin_id: 101,
                    class0: JSON.stringify({
                        names: '.photo-span',
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
                    class2: JSON.stringify({
                        names: '.show',
                        transition: {
                            names: "transition",
                            values: 'transform ' + (me.data.small_div.time - 1) + 's'
                        },
                        total: 1
                    }),
                    js: JSON.stringify({
                        time: me.data.small_div.time*1000
                    }),
                    //total是css的数量
                    total: 3,
                    flag: 1
                };
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
})();