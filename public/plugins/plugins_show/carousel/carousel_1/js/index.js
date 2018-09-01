
//普通轮播图
;
(function() {
    var plugin_03001 = function() {};
    plugin_03001.prototype = {
        init: function(view) {
            var template = `<div class='content' x-model='ca_photo'>
        <div class='show' x-class="{'translate':'translate'}">
            <img class='imgs' x-repeat='imgs' src="{{url}}">
        </div>
        <div class='span'>
        <span x-repeat='span'  x-class="{'blight':'blight'}" class='photo-span' x-show="$index!==0"></span>
        </div>
         <div class="left"><div class="img-content"></div></div>
         <div class="right"><div class="img-content"></div></div>
    </div>`;
            view.innerHTML = template;
        },
        render: function(view) {
            var me = this;
            me.data = view.$getData().data.ca_photo;
            if(!me.data){
                return ;
            }
            me.data=me.data.imgs;
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
            me.moveright=function(){
                var me=this;
                me.translate+=me.imgwidth;
                if(me.index===0){
                     me.index = me.data.length-2;
                     DD.css(me.show,'left',-1*me.translate-me.imgwidth*(me.data.length-2)+'px');
                }
                else{
                    me.index--;
                }
            }
            me.updata = function() {
                clearInterval(window.timer);
                window.timer = setInterval(function() {
                    me.doself(me.flag);
                }, 3000);
            };
            me.doself = function(flag) {
                var me = this;
                me.is_can=false;
                me.removespan();
                if(flag){
                   me.moveright();
                }else{
                       me.moveLeft();
                }
                me.drawimage();
                me.addspan();
            };
            setTimeout(function() {
                view.addEventListener('transitionend', function() {
                    me.is_can = true;
                });
                me.is_can=false;
                me.span = document.querySelectorAll('.photo-span');
                me.imgs = document.querySelectorAll('.imgs');
                me.imgwidth = parseInt(DD.css(view.querySelector('.content'), 'width'));
                me.show = document.querySelector('.show');
                DD.css(me.show, 'width', '' + me.imgwidth * me.data.length + 'px');
                me.index = 1;
                me.flag=view.$getData().data.ca_photo.right||view.$getData().data.ca_photo.right;
                DD.css(me.show,'left',-1*me.index*me.imgwidth+'px');
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
                        clearInterval(window.timer);
                        me.doself();
                        me.updata();
                    }
                }
            });
            new DD.Event({
                eventName: 'click',
                view: view.querySelector('.right'),
                handler: function(e, data, view) {
                    if (me.is_can) {
                        me.is_can = false;
                        clearInterval(window.timer);
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
                        clearInterval(window.timer);
                        me.doself(1);
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
                        clearInterval(window.timer);
                        me.doself(1);
                        me.updata();
                    }
                }
            });
        }
    };
    DD.Plugin.create('plugin_03001', plugin_03001);
})();