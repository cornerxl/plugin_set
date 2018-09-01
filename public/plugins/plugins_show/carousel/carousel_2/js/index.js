;
(function() {
    var plugin_03002 = function() {};
    plugin_03002.prototype = {
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
    DD.Plugin.create('plugin_03002', plugin_03002);
})()