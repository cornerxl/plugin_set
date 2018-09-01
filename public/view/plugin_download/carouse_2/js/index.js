;
(function() {
    var carous = function() {};
    carous.prototype = {
        init: function(view) {
            var tem = `<figure class='carous' x-model='img_ct'>
        <img src="{{url}}" alt="图片" x-repeat='imgs' class='img-trans'>
    </figure>
    <div class="spancont">
    <div class="span" x-model='img_ct'>
            <span class='inline-span' x-repeat='spans'></span>
        </div>
    </div><div class="left"><div class="img-content"></div></div>
  <div class="right"><div class="img-content"></div></div>`;
            view.innerHTML = tem;
        },
        render: function(view) {
            var me = this;
            me.removespan = function() {
                me.span.forEach(function(i) {
                    DD.removeClass(i, 'active');
                });
            };
            me.addspan = function() {
                var index = (me.imgs.length-me.count)% me.imgs.length;
                if (index < 0)
                    index += me.imgs.length
                DD.addClass(me.span[index], 'active');
            };
            me.updata = function() {
                clearInterval(window.timer_2);
                me.is_can = false;
                window.timer_2 = setInterval(function() {
                    me.is_can = false;
                    me.count+=me.direct;
                    me.removespan();
                    me.addspan();
                    me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)'
                }, 5000);
            };
            //获取旋转的y轴距离
            me.getheight = function() {
                var r = Math.PI * 2;
                //rad求出一条边所占的角度
                var rad = r / me.imgs.length;
                me.rotateZ = me.imgw / (2 * Math.tan(rad / 2));
            }
            setTimeout(function() {
                window.addEventListener('transitionend', function() {
                    me.is_can = true;
                });
                me.is_can = false;
                me.count = 0;
                me.spans = view.querySelector('.span');
                me.content = view.querySelector('.carous');
                me.imgs = view.querySelectorAll('.img-trans');
                me.imgw = parseInt(DD.css(me.imgs[0], 'width'));
                me.span = view.querySelectorAll('.inline-span');
                //1为left -1为right
                if(view.$getData().data.small_div.right){
                    me.direct=1;
                }
                me.direct=-1;
                var temp = (me.imgs.length) * 25;
                DD.css(me.spans, 'width', temp + 'px');
                //求出旋转中心点的z坐标
                me.getheight();
                me.content.style.transformOrigin = '50% 50% ' + -1 * me.rotateZ + 'px';
                //transform-origin属性规定了旋转的点
                me.imgs.forEach(function(item, index) {
                    //第一张是0不需要设置
                    if (index) {
                        item.style.transformOrigin = '50% 50% ' + -1 * me.rotateZ + 'px';
                    }
                    item.style.transform = 'rotateY(' + index * Math.PI * 2 / me.imgs.length + 'rad)'
                });
                me.removespan();
                me.addspan();
                me.updata();
            }, 0);
            new DD.Event({
                eventName: 'swipeleft',
                view: view,
                handler: function() {
                    if (me.is_can) {
                        clearInterval(window.timer_2);
                        me.is_can = false;
                        me.count--;
                        me.removespan();
                        me.addspan();
                        me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)';
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector(".right"),
                handler: function() {
                    if (me.is_can) {
                        clearInterval(window.timer_2);
                        me.is_can = false;
                        me.count--;
                        me.removespan();
                        me.addspan();
                        me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)';
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'swiperight',
                view: view,
                handler: function() {
                    if (me.is_can) {
                        clearInterval(window.timer_2);
                        me.is_can = false;
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)';
                        me.updata();
                    }
                }
            });
             new DD.Event({
                eventName: 'click',
                view: view.querySelector(".left"),
                handler: function() {
                    if (me.is_can) {
                        clearInterval(window.timer_2);
                        me.is_can = false;
                        me.count++;
                        me.removespan();
                        me.addspan();
                        me.content.style.transform = 'rotateY(' + 2 * me.count * Math.PI / me.imgs.length + 'rad)';
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('carous', carous);
    DD.createModule({
        name: 'm_plugin_download_Carousel_2',
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/carouse_2/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/carouse_2/index.html",
        data: {
            width_data: '',
            name: '',
            img_ct: {
                width: '',
                translate: false,
                spans: [{}, {}, {}, {}, {}, {}],
                imgs: [{ url: HTMLURL + "/plugin_download/carouse_2/img/1.jpg" }, { url: HTMLURL + "/plugin_download/carouse_2/img/2.jpg" }, { url: HTMLURL + "/plugin_download/carouse_2/img/3.jpg" }, { url: HTMLURL + "/plugin_download/carouse_2/img/4.jpg" }, { url: HTMLURL + "/plugin_download/carouse_2/img/2.jpg" }, { url: HTMLURL + "/plugin_download/carouse_1/img/1.jpg" }]
            },
            small_div: {
                check: '#ff6800',
                no_check: '#ffffff',
                width: '8',
                height: '8',
                time: 5,
                left:true,
                right:false
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.name = "水平旋转";
            me.data.img_ct.spans.forEach(function(i) {
                i.width = me.data.small_div.width;
                i.height = me.data.small_div.height;
            });
            me.data.img_ct.$set("spans", me.data.img_ct.spans);
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
            me.data.small_div.left=true;
            me.data.small_div.right=false;
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
            },
            ensure: function() {
                var me = this;
                if (me.data.small_div.time < 3)
                    me.data.small_div.time = 3;
                var obj = {
                    plugin_id: 102,
                    class0: JSON.stringify({
                        names: '.carous_ct .spancont .span .inline-span',
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
                        names: '.carous_ct .spancont .span .active',
                        background: {
                            names: 'background-color',
                            values: me.data.small_div.check.replace("#", "")
                        },
                        total: 1
                    }),
                    class2: JSON.stringify({
                        names: ".carous",
                        transition: {
                            names: 'transition',
                            values: 'all ' + (me.data.small_div.time - 2) + 's'
                        },
                        total: 1
                    }),
                    js: JSON.stringify({
                        time: me.data.small_div.time * 1000,
                        left:me.data.small_div.left,
                        right:me.data.small_div.right
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
    });
})()